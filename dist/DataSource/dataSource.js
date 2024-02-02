"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgre",
    database: "MiniProject",
    logging: true,
    synchronize: false,
    // entities:[Customer,Order,OrderItem,Supplier,Product],
    entities: ["dist/entities/*.entity.js"],
    migrations: ["dist/migrations/*.js"]
});
exports.default = dataSource;
