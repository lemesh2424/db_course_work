import { createAction } from "redux-actions";
import api from "../../api";
import {
  GetMostUsedActionForBrowserRequest,
  GetActionsTrendRequest,
  GetMostUsedActionForPlatformRequest,
} from "../../api/interfaces";

export const getAllActions = createAction("ACTIONS/ACTIONS", async () => {
  const { data } = await api.getAllActions();
  return { types: data };
});

export const getAllBrowsers = createAction("ACTIONS/BROWSERS", async () => {
  const { data } = await api.getAllBrowsers();
  return { browsers: data };
});

export const getAllPlatforms = createAction("ACTIONS/PLATFORMS", async () => {
  const { data } = await api.getAllPlatforms();
  return { platforms: data };
});

export const getMostUsedActionForBrowser = createAction(
  "ACTIONS/BROWSERS/MOST_USED_ACTION",
  async (d: GetMostUsedActionForBrowserRequest) => {
    const { data } = await api.getMostUsedActionForBrowser(d);
    return { mostUsedActionsBrowser: data, ...d };
  }
);

export const getMostUsedActionForPlatform = createAction(
  "ACTIONS/PLATFORMS/MOST_USED_ACTION",
  async (d: GetMostUsedActionForPlatformRequest) => {
    const { data } = await api.getMostUsedActionForPlatform(d);
    return { mostUsedActionsPlatform: data, ...d };
  }
);

export const getActionsTrend = createAction(
  "ACTIONS/ACTIONS_TREND",
  async (d: GetActionsTrendRequest) => {
    const { data } = await api.getActionsTrend(d);
    return { actionsTrend: data, ...d };
  }
);
