import express, { Router } from "express";
import { fetchChalmrestCache } from "../services/cache";

const fetchRouter = Router();
fetchRouter.get("/", async (req: express.Request, res: express.Response) => {
  const data = await fetchChalmrestCache();
  if (data === null) {
    res.send("No data");
    return;
  }
  res.send(data);
});

export default fetchRouter;
