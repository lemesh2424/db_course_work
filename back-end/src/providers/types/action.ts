export type GetAllPlatformsResponse = string[];
export type GetAllBrowsersResponse = string[];
export type GetAllActionTypesResponse = string[];

export interface GetMostUsedActionForBrowserResponse {
  type: string;
  count: number;
}

export interface GetMostUsedActionForPlatformResponse {
  type: string;
  count: number;
}

export interface GetActionsTrendResponse {
  regression: {
    m: number;
    b: number;
  };
  points: Array<{
    date: Date;
    numberOfActions: number;
  }>;
}

export interface GetMostUsedBrowserOnPlatformResponse {
  browser: string;
  platform: string;
}
