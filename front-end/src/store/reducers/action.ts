import { handleActions } from "redux-actions";
import { ActionType } from "redux-promise-middleware";
import {
  getActionsTrend,
  getAllActions,
  getAllBrowsers,
  getAllPlatforms,
  getMostUsedActionForBrowser,
  getMostUsedActionForPlatform
} from "../actions";
import { AnyAction } from "redux";
import {
  GetActionsTrendResponse,
  GetAllActionTypesResponse,
  GetAllBrowsersResponse,
  GetAllPlatformsResponse,
  GetMostUsedActionForBrowserResponse,
  GetMostUsedActionForPlatformResponse,
  GetMostUsedBrowserOnPlatformResponse
} from "../../api/interfaces";

export type ActionState = {
  type: string;
  browser: string;
  platform: string;
  browsers: GetAllBrowsersResponse;
  types: GetAllActionTypesResponse;
  platforms: GetAllPlatformsResponse;
  mostUsedActionsBrowser: GetMostUsedActionForBrowserResponse[];
  mostUsedActionsPlatform: GetMostUsedActionForPlatformResponse[];
  actionsTrend: GetActionsTrendResponse;
  mostUsedBrowser: GetMostUsedBrowserOnPlatformResponse[];
};

const reducer = handleActions<Partial<ActionState>, AnyAction>(
  {
    [getAllActions.toString()]: {
      [ActionType.Fulfilled]: (state, action) => {
        return { ...state, ...action.payload };
      },
    },
    [getAllBrowsers.toString()]: {
      [ActionType.Fulfilled]: (state, action) => {
        return { ...state, ...action.payload };
      },
    },
    [getAllPlatforms.toString()]: {
      [ActionType.Fulfilled]: (state, action) => {
        console.log(action);
        return { ...state, ...action.payload };
      },
    },
    [getMostUsedActionForBrowser.toString()]: {
      [ActionType.Fulfilled]: (state, action) => {
        return { ...state, ...action.payload };
      },
    },
    [getMostUsedActionForPlatform.toString()]: {
      [ActionType.Fulfilled]: (state, action) => {
        return { ...state, ...action.payload };
      },
    },
    [getActionsTrend.toString()]: {
      [ActionType.Fulfilled]: (state, action) => {
        return { ...state, ...action.payload };
      },
    },
  },
  {
    type: "",
    browser: "",
    platform: "",
    types: [],
    browsers: [],
    platforms: [],
    mostUsedActionsBrowser: [],
    mostUsedActionsPlatform: [],
    actionsTrend: {
      regression: {
        m: 0,
        b: 0,
      },
      points: [],
    },
  }
);

export default reducer;
