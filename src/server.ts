import app from "./app";
import { config } from "./config/index";
import databaseConnect from "./config/database";
import DatabaseConnectError from "./errors/databaseConnectException.error";

app.listen(config.port, () => {
  databaseConnect().then(() => {
    console.log(`Server is running on http://localhost:${config.port}`);
  }).catch((error) => {
    console.error("Failed to connect to the database:", (error as Error).message);
    throw new DatabaseConnectError();
  })
});