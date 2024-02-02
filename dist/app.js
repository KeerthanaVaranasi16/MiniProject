"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("reflect-metadata");
var dataSource_1 = __importDefault(require("./DataSource/dataSource"));
var customerRoute_1 = __importDefault(require("./controller/customerRoute"));
var routing_controllers_1 = require("routing-controllers");
var supplierRoute_1 = require("./controller/supplierRoute");
var orderRoute_1 = require("./controller/orderRoute");
var productRoute_1 = require("./controller/productRoute");
var orderItemRoute_1 = require("./controller/orderItemRoute");
var additionalFeaturesRoute_1 = __importDefault(require("./controller/additionalFeaturesRoute"));
var app = (0, express_1.default)();
var port = 3000;
dataSource_1.default.initialize()
    .then(function () {
    console.log("Data Source has been initialized!");
})
    .catch(function (err) {
    console.error("Error during Data Source initialization", err);
});
(0, routing_controllers_1.useExpressServer)(app, {
    controllers: [customerRoute_1.default, supplierRoute_1.supplierRoute, orderRoute_1.orderRoute, productRoute_1.productRoute, orderItemRoute_1.orderItemRoute, additionalFeaturesRoute_1.default]
});
app.listen(port, function () {
    console.log("Connected");
});
