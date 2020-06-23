import { Router } from "express";
import { ActionProvider } from "../providers/";

const router = Router();

router.get("/platforms", async (req, res) => {
  const provider = new ActionProvider();
  const platforms = await provider.getAllPlatforms();
  res.send({
    status: "Success",
    data: platforms,
  });
});

router.get("/browsers", async (req, res) => {
  const provider = new ActionProvider();
  const browsers = await provider.getAllBrowsers();
  res.send({
    status: "Success",
    data: browsers,
  });
});

router.get("/actions", async (req, res) => {
  const provider = new ActionProvider();
  const actions = await provider.getAllActionTypes();
  res.send({
    status: "Success",
    data: actions,
  });
});

router.get("/browsers/most-used-actions", async (req, res) => {
  const provider = new ActionProvider();
  const browser = req.query.browser;
  const result = await provider.GetMostUsedActionForBrowser(browser?.toString() || "");
  res.send({
    status: "Success",
    data: result,
  });
});

router.get("/actions/action-trend", async (req, res) => {
  const provider = new ActionProvider();
  const type = req.query.type;
  const result = await provider.GetActionsTrend(type?.toString() || "");
  res.send({
    status: "Success",
    data: result,
  });
});

router.get("/platforms/most-used-actions", async (req, res) => {
  const provider = new ActionProvider();
  const platform = req.query.platform;
  const result = await provider.GetMostUsedActionForPlatform(platform?.toString() || "");
  res.send({
    status: "Success",
    data: result,
  });
});

router.post("/backup", (req, res) => {
  const provider = new ActionProvider();
  provider.backup();
  res.send({
    status: "Success",
  });
});

export default router;
