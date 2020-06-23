import React, { FC } from "react";
import SelectField from "../common/SelectField";
import "../../styles/dashboard.sass";
import useAction from "../../hooks/useAction";
import { Bar, Line, Scatter } from "react-chartjs-2";
import { Button } from "@material-ui/core";
import { getMostUsedActionForBrowser, getActionsTrend } from "../../store/actions";

const Dashboard: FC = () => {
  const {
    types,
    type,
    browsers,
    browser,
    platforms,
    platform,
    mostUsedActionsBrowser,
    mostUsedActionsPlatform,
    actionsTrend,
    getMostUsedActionForBrowser,
    getMostUsedActionForPlatform,
    getActionsTrend,
    backup
  } = useAction();

  const handleBrowserChange = (e: any) => {
    getMostUsedActionForBrowser({ browser: e.target.value }).catch(
      console.warn
    );
  };

  const handleActionChange = (e: any) => {
    getActionsTrend({ type: e.target.value }).catch(console.warn);
  };

  const handlePlatformChange = (e: any) => {
    getMostUsedActionForPlatform({platform: e.target.value}).catch(console.warn)
  };

  const mostUsedActionsBrowserData = {
    labels: mostUsedActionsBrowser!.map((el) => el.type),
    datasets: [
      {
        label: `Used`,
        data: mostUsedActionsBrowser!.map((el) => el.count),
        backgroundColor: "#bfafee",
        borderColor: "#af8fee",
      },
    ],
  };

  const mostUsedActionsPlatformData = {
    labels: mostUsedActionsPlatform!.map((el) => el.type),
    datasets: [
      {
        label: `Used`,
        data: mostUsedActionsPlatform!.map((el) => el.count),
        backgroundColor: "#bfafee",
        borderColor: "#af8fee",
      },
    ],
  };

  const actionsTrendData = {
    labels: actionsTrend!.points.map((point) => new Date(point.date).getHours()),
    datasets: [
      {
        label: "Regression line",
        data: actionsTrend!.points.map(
          (point) =>
            actionsTrend!.regression.m * point.numberOfActions +
            actionsTrend!.regression.b
        ),
        backgroundColor: "#bfafee",
        borderColor: "#af8fee",
      },
    ],
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-content">
        <div className="paper paper-bottom">
          <div className="header">
            <div className="table-subtitle">Site Action Statistics</div>
            <Button variant="outlined" onClick={backup}>
              Backup
            </Button>
          </div>
        </div>
        <div className="paper paper-bottom">
          <div className="flexed-row">
            <div className="half-column">
              <h3>Most used actions depends on browser</h3>
              <SelectField
                onChange={handleBrowserChange}
                items={browsers!}
                value={browser}
                label="Choose a browser"
              />
              {mostUsedActionsBrowser && mostUsedActionsBrowser.length > 0 && (
                <Bar
                  height={400}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      xAxes: [
                        {
                          ticks: {
                            autoSkip: false,
                            maxRotation: 90,
                            minRotation: 90,
                          },
                        },
                      ],
                      yAxes: [
                        {
                          ticks: {
                            min: 0,
                          },
                        },
                      ],
                    },
                  }}
                  data={mostUsedActionsBrowserData}
                />
              )}
            </div>
            <div className="half-column">
              <h3>Regression of actions by date</h3>
              <SelectField
                onChange={handleActionChange}
                items={types!}
                value={type}
                label="Choose an action type"
              />
              <div className="paper-bottom">
                {actionsTrend &&
                  actionsTrend.points &&
                  actionsTrend.points.length > 0 && (
                    <Line
                      options={{
                        elements: {
                          point: {
                            radius: 0,
                          },
                        },
                      }}
                      data={actionsTrendData}
                    />
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="paper paper-bottom">
          <div className="flexed-row">
            <div className="half-column">
              <h3>Most used actions depends on platform</h3>
              <SelectField
                onChange={handlePlatformChange}
                items={platforms!}
                value={platform}
                label="Choose a platform"
              />
              {mostUsedActionsPlatform && mostUsedActionsPlatform.length > 0 && (
                <Bar
                  height={400}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      xAxes: [
                        {
                          ticks: {
                            autoSkip: false,
                            maxRotation: 90,
                            minRotation: 90,
                          },
                        },
                      ],
                      yAxes: [
                        {
                          ticks: {
                            min: 0,
                          },
                        },
                      ],
                    },
                  }}
                  data={mostUsedActionsPlatformData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
