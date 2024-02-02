import express from "express";
import "reflect-metadata";
import dataSource from "./DataSource/dataSource";
import customerRoute from "./controller/customerRoute";
import { useExpressServer } from "routing-controllers";
import { supplierRoute } from "./controller/supplierRoute";
import { orderRoute } from "./controller/orderRoute";
import { productRoute } from "./controller/productRoute";
import { orderItemRoute } from "./controller/orderItemRoute";
import additionalFeaturesRoute from "./controller/additionalFeaturesRoute";

const app = express();
const port = 3000;

dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

useExpressServer(app, {
  controllers:[customerRoute, supplierRoute, orderRoute, productRoute, orderItemRoute, additionalFeaturesRoute]
})

app.listen(port, function () {
  console.log("Connected");
});
