import app from "./app";
const port = 3000;

async function serverStart(){
  await app.listen(port);
  console.log("Server running at port: " + port);
  console.log(`Server running link: http://localhost:${port}`);
};

serverStart();
