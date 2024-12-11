import { DataSource } from "typeorm";
import { Task } from "../db/models/task.entity";
import { User } from "../db/models/user.entity";
import { config } from "./config";

console.log("Creating DataSource with config:", {
    host: "localhost",
    port: 5432,
    username: "postgres",
    database: "postgres"
    // not logging password for security
});

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [Task, User],
    migrations: [],
    subscribers: [],
});