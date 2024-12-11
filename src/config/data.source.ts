import {DataSource} from "typeorm";
import {config} from "./config";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: config.pg_uri,
    synchronize: true,
    logging: false,
    entities: [],
});
