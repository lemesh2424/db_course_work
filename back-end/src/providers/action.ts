import { exec } from "child_process";
import path from "path";
import { ActionModel } from "../database";
import {
  GetAllActionTypesResponse,
  GetAllBrowsersResponse,
  GetAllPlatformsResponse,
  GetActionsTrendResponse,
  GetMostUsedActionForBrowserResponse,
  GetMostUsedActionForPlatformResponse,
  GetMostUsedBrowserOnPlatformResponse
} from "./types";
import { linearRegression, sampleCorrelation } from "simple-statistics";
import _ from "lodash";

const backupDirPath = path.join(process.cwd(), "database-backup");

export class ActionProvider {
  private models: {
    action: typeof ActionModel;
  };

  constructor() {
    this.models = {
      action: ActionModel,
    };
  }

  public async getAllActionTypes(): Promise<GetAllActionTypesResponse> {
    return this.models.action.distinct("type");
  }

  public async getAllBrowsers(): Promise<GetAllBrowsersResponse> {
    return this.models.action.distinct("browser");
  }

  public async getAllPlatforms(): Promise<GetAllPlatformsResponse> {
    return this.models.action.distinct("platform");
  }

  public async GetMostUsedActionForBrowser(
    browser: string
  ): Promise<GetMostUsedActionForBrowserResponse[]> {
    return this.models.action.aggregate<GetMostUsedActionForBrowserResponse>([
      {
        $match: { browser },
      },
      {
        $group: {
          _id: { type: "$type" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 },
      },
      { $limit: 5 },
      {
        $project: {
          type: "$_id.type",
          count: 1
        },
      },
    ]);
  }

  public async GetActionsTrend(type: string): Promise<GetActionsTrendResponse> {
    const result = await this.models.action.aggregate<any>([
      {
        $match: { type },
      },
      {
        $group: {
          _id: { date: "$date" },
          count: { $sum: 1 }
        },
      },
      {
        $project: {
          date: "$_id.date",
          numberOfActions: "$count",
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
    ]);
    const { m, b } = linearRegression(
        result.map((point: any) => [new Date(point.date).getHours(), point.numberOfActions])
    );
    return {
      regression: { m, b },
      points: result,
    };
  }

  public async GetMostUsedActionForPlatform(
    platform: string
  ): Promise<GetMostUsedActionForPlatformResponse[]> {
    return this.models.action.aggregate<GetMostUsedActionForPlatformResponse>([
      {
        $match: { platform },
      },
      {
        $group: {
          _id: { type: "$type" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 },
      },
      { $limit: 5 },
      {
        $project: {
          type: "$_id.type",
          count: 1
        },
      }
    ]);
  }

  public async GetMostUsedBrowserOnPlatform(
    platform: string
  ): Promise<GetMostUsedBrowserOnPlatformResponse[]> {
    return this.models.action.aggregate<GetMostUsedBrowserOnPlatformResponse>([
      {
        $match: { platform },
      },
      {
        $group: {
          _id: { browser: "$browser" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 },
      },
      { $limit: 5 },
      {
        $project: {
          browser: 1,
          platform: 1
        },
      }
    ]);
  }

  public backup() {
    let cmd =
      "mongodump --host " +
      "lemesh:Ol917364@ds125341.mlab.com" +
      " --port " +
      "25341" +
      " --db " +
      "site-analizer" +
      " --out " +
      backupDirPath +
      `/${Date.now()}`;
    exec(cmd);
  }
}
