import { HttpInterface } from "./httpAdapter";
import {
  BackEndResponse,
  GetActionsTrendResponse,
  GetAllActionTypesResponse,
  GetAllBrowsersResponse,
  GetAllPlatformsResponse,
  GetMostUsedActionForBrowserResponse,
  GetMostUsedActionForPlatformResponse,
  GetMostUsedBrowserOnPlatformResponse,
  GetMostUsedActionForBrowserRequest,
  GetActionsTrendRequest,
  GetMostUsedActionForPlatformRequest
} from "./interfaces";
import * as querystring from "querystring";

export default class ApiClient {
  constructor(protected http: HttpInterface) {}

  public getAllActions(): Promise<
    BackEndResponse<GetAllActionTypesResponse>
  > {
    return this.http.get<BackEndResponse<GetAllActionTypesResponse>>(
      "/actions/actions"
    );
  }

  public getAllBrowsers(): Promise<BackEndResponse<GetAllBrowsersResponse>> {
    return this.http.get<BackEndResponse<GetAllBrowsersResponse>>(
      "/actions/browsers"
    );
  }

  public getAllPlatforms(): Promise<BackEndResponse<GetAllPlatformsResponse>> {
    return this.http.get<BackEndResponse<GetAllPlatformsResponse>>(
      "/actions/platforms"
    );
  }

  public getMostUsedActionForBrowser(
    data: GetMostUsedActionForBrowserRequest
  ): Promise<BackEndResponse<GetMostUsedActionForBrowserResponse[]>> {
    const query = querystring.stringify(data as any);
    return this.http.get<
      BackEndResponse<GetMostUsedActionForBrowserResponse[]>
    >(`actions/browsers/most-used-actions?${query}`);
  }

  public getMostUsedActionForPlatform(
    data: GetMostUsedActionForPlatformRequest
  ): Promise<BackEndResponse<GetMostUsedActionForPlatformResponse[]>> {
    const query = querystring.stringify(data as any);
    return this.http.get<
      BackEndResponse<GetMostUsedActionForPlatformResponse[]>
    >(`actions/platforms/most-used-actions?${query}`);
  }

  public getActionsTrend(
    data: GetActionsTrendRequest
  ): Promise<BackEndResponse<GetActionsTrendResponse>> {
    const query = querystring.stringify(data as any);
    return this.http.get<BackEndResponse<GetActionsTrendResponse>>(
      `actions/actions/action-trend?${query}`
    );
  }

  public backup(): void {
    this.http.post("/actions/backup").catch(console.warn);
  }
}
