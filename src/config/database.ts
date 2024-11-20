import mongoose from "mongoose";
import { config } from "./index";
import NotFoundError from "../errors/notFound.error";

const databaseConnect = async (): Promise<void> => {
    const DATABASE_URL = config.database_url;

    if (!DATABASE_URL) {
        throw new NotFoundError("Database URL not found.");
    }

    await mongoose.connect(DATABASE_URL);
};

export default databaseConnect;
