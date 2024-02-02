import { DataSource } from "typeorm";
import { Customer } from "../entities/Customer.entity";
import { Order } from "../entities/Order.entity";
import { OrderItem } from "../entities/OrderItem.entity";
import { Supplier } from "../entities/Supplier.entity";
import { Product } from "../entities/Product.entity";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgre",
    database: "MiniProject",
    logging:true,
    synchronize:false,
    // entities:[Customer,Order,OrderItem,Supplier,Product],
    entities:["dist/entities/*.entity.js"],
    migrations:["dist/migrations/*.js"]
})
export default dataSource;