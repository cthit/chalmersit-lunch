import express, { Router } from "express";
import { fetchChalmrest } from "../services/chalmrest";

const fetchRouter = Router();
fetchRouter.get("/", async (req: express.Request, res: express.Response) => {
  const data = await fetchChalmrest();
  if (data === null) {
    res.send("No data");
    return;
  }
  res.send(data);
});

export default fetchRouter;
