import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import "./db/mongoose";

const port = process.env.PORT_NUMBER || 8080;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
