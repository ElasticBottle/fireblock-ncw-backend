import dotenv from "dotenv";
dotenv.config();

import { DataSourceOptions } from "typeorm";
import { Device } from "./model/device";
import { Message } from "./model/message";
import { Transaction } from "./model/transaction";
import { User } from "./model/user";
import { Wallet } from "./model/wallet";
import { MessageSubscriber } from "./subscribers/message.subscriber";
import { TransactionSubscriber } from "./subscribers/transaction.subscriber";

const opts: DataSourceOptions = {
  type: "mysql",
  url: process.env.DATABASE_URL,
  // host: process.env.DB_HOST,
  // port: Number(process.env.DB_PORT),
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
  },
  synchronize: false,
  logging: false,
  entities: [User, Wallet, Device, Message, Transaction],
  subscribers: [MessageSubscriber, TransactionSubscriber],
  migrations: ["./dist/migrations/*.js"],
};

export default opts;
