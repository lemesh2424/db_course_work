import { useEffect } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../store/reducers";
import { ActionState } from "../store/reducers/action";
import * as actions from "../store/actions";
import {
  GetActionsTrendResponse,
  GetActionsTrendRequest,
  GetAllActionTypesResponse,
  GetAllBrowsersResponse,
  GetAllPlatformsResponse,
  GetMostUsedActionForBrowserRequest,
  GetMostUsedActionForBrowserResponse,
  GetMostUsedActionForPlatformResponse,
  GetMostUsedActionForPlatformRequest
} from "../api/interfaces";
import useAsyncDispatch from "./useAsyncDispatch";
import api from "../api";

export type ActionHook = Partial<ActionState> & {
  getAllActions: () => Promise<GetAllActionTypesResponse[]>;
  getAllBrowsers: () => Promise<GetAllBrowsersResponse[]>;
  getAllPlatforms: () => Promise<GetAllPlatformsResponse[]>;
  getMostUsedActionForBrowser: (
    data: GetMostUsedActionForBrowserRequest
  ) => Promise<GetMostUsedActionForBrowserResponse[]>;
  getMostUsedActionForPlatform: (
    data: GetMostUsedActionForPlatformRequest
  ) => Promise<GetMostUsedActionForPlatformResponse[]>;
  getActionsTrend: (data: GetActionsTrendRequest) => Promise<GetActionsTrendResponse>;
  backup: () => void;
};

export default function useAction(): ActionHook {
  const action = useSelector<StoreState, Partial<ActionState>>(
    (state) => state.action
  );
  const dispatch = useAsyncDispatch();

  const getAllActions = () => dispatch(actions.getAllActions());
  const getAllBrowsers = () => dispatch(actions.getAllBrowsers());
  const getAllPlatforms = () => dispatch(actions.getAllPlatforms());
  const getMostUsedActionForBrowser = (
    data: GetMostUsedActionForBrowserRequest
  ) => dispatch(actions.getMostUsedActionForBrowser(data));
  const getMostUsedActionForPlatform = (
    data: GetMostUsedActionForPlatformRequest
  ) => dispatch(actions.getMostUsedActionForPlatform(data));
  const getActionsTrend = (data: GetActionsTrendRequest) =>
    dispatch(actions.getActionsTrend(data));
  const backup = () => api.backup();

  useEffect(() => {
    Promise.all([
      getAllActions()
        .then(({ value }) => {
          const { types } = value;
          if (types && types.length) {
            return getActionsTrend({
              type: "Click",
            });
          }
        })
        .catch(console.warn),
      getAllBrowsers()
        .then(({ value }) => {
          const { browsers } = value;
          if (browsers && browsers.length) {
            return getMostUsedActionForBrowser({
              browser: "Google Chrome",
            });
          }
        })
        .catch(console.warn),
      getAllPlatforms()
        .then(({ value }) => {
          const { platforms } = value;
          if (platforms && platforms.length) {
            return getMostUsedActionForPlatform({
              platform: "PC",
            });
          }
        })
        .catch(console.warn),
    ]).catch(console.warn);
  }, []);

  return {
    ...action,
    getActionsTrend,
    getAllActions,
    getAllBrowsers,
    getAllPlatforms,
    getMostUsedActionForBrowser,
    getMostUsedActionForPlatform,
    backup
  };
}
