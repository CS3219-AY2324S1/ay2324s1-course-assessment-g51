import cors from "cors";
import express from "express";

import questionRouter from "./routers/questions";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Set up CORS with specific allowed methods
app.use(cors({
  origin: "*", // Allow requests from any origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify the allowed HTTP methods
}));

app.use("/api", questionRouter);

// Health check endpoint 
app.get('/healthz', (_, res) => { 
  res.status(200).send('Server is healthy'); 
});

// catch-all route handling
app.all("*", (_, res) => {
  res.status(404).send();
});

export default app;
