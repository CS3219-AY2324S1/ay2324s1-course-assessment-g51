import app from "./app";
import "./db/mongoose";

const port = process.env.PORT_NUMBER;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
