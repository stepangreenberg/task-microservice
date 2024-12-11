import "reflect-metadata";
import {config as configDotenv} from "dotenv";
configDotenv();
import express from 'express';
import routes from './api/routes';
import {config} from './config';
import {AppDataSource} from "./config/data.source";

const startService = async () => {
    console.log("Starting service...");
    console.log("Database URI:", config.pg_uri); // Add this to check URI

    const app = express();

    try {
        console.log("Attempting database connection...");
        await AppDataSource.initialize();
        console.log("✅ Database connection successful!");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }

    app.use(express.json());
    app.use(routes);

    app.listen(config.port, () => {
        console.log(`Service name: ${config.name}`);
        console.log(`🚀 Server is running on port ${config.port}`);
    });
}

console.log("About to start service..."); // Add this before startService
startService().catch(error => {
    console.error("Fatal error during service start:", error);
    process.exit(1);
});