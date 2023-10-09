import express from "express";

import questionRouter from "./routers/questions";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", questionRouter);

// catch-all route handling
app.all("*", (_, res) => {
  res.status(404).send();
});

export default app;
