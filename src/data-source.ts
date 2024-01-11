import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { UserProfile } from "./entity/UserProfile"
import { SendEmail } from "./entity/SendEmail"
import { CreateUserTable1704858190114 } from "./migration/1704858190114-CreateUserTable"
import { CreateUserProfileTable1704858212129 } from "./migration/1704858212129-CreateUserProfileTable"
import { CreateSendEmailTable1704858221725 } from "./migration/1704858221725-CreateSendEmailTable"
import * as dotenv from "dotenv"

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } =
  process.env;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        User,
        UserProfile,
        SendEmail
    ],
    migrations: [
        CreateUserTable1704858190114,
        CreateUserProfileTable1704858212129,
        CreateSendEmailTable1704858221725
    ],
    subscribers: [],
})
