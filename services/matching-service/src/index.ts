import server from "./app";

const port = process.env.PORT_NUMBER;

server.listen(port, () => {
  console.log(`server running at port ${port}`);
});
