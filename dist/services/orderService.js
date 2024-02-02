"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dataSource_1 = __importDefault(require("../DataSource/dataSource"));
var Customer_entity_1 = require("../entities/Customer.entity");
var Order_entity_1 = require("../entities/Order.entity");
var OrderItem_entity_1 = require("../entities/OrderItem.entity");
var orderItemService_1 = __importDefault(require("./orderItemService"));
var orderService = /** @class */ (function () {
    function orderService() {
        this.orderRepo = dataSource_1.default.getRepository(Order_entity_1.Order);
        this.customerRepo = dataSource_1.default.getRepository(Customer_entity_1.Customer);
    }
    orderService.prototype.createOrder = function (customer_id, orderItem) {
        return __awaiter(this, void 0, void 0, function () {
            var customer, order, createdOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.customerRepo.findOne({ where: { customer_id: customer_id } })];
                    case 1:
                        customer = _a.sent();
                        if (!customer) {
                            throw new Error("Customer not found");
                        }
                        // if(!orderDate || !totalAmout){
                        //     throw new Error(`Incomplete Details`)
                        // }
                        console.log("Creating new order");
                        order = new Order_entity_1.Order();
                        order.orderDate = new Date();
                        order.totalAmount = 0;
                        order.customer = customer;
                        if (orderItem) {
                            order.orderItems = orderItem.map(function (orderItemData) {
                                var newOrderItem = new OrderItem_entity_1.OrderItem();
                                newOrderItem.quantity = orderItemData.quantity;
                                newOrderItem.unitPrice = orderItemData.unitPrice;
                                return newOrderItem;
                            });
                        }
                        return [4 /*yield*/, this.orderRepo.save(order)];
                    case 2:
                        createdOrder = _a.sent();
                        console.log(createdOrder);
                        return [2 /*return*/, createdOrder];
                }
            });
        });
    };
    orderService.prototype.getAllOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Getting all orders");
                        return [4 /*yield*/, this.orderRepo
                                .createQueryBuilder("order").leftJoinAndSelect("order.customer", "customer").leftJoinAndSelect("order.orderItems", "orderItems")
                                .orderBy("order.order_id", "ASC")
                                .getMany()];
                    case 1:
                        orders = _a.sent();
                        console.log(orders);
                        return [2 /*return*/, orders];
                }
            });
        });
    };
    orderService.prototype.getOneOrder = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var specific_order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Getting particular order details");
                        return [4 /*yield*/, this.orderRepo.findOne({ where: options, relations: ['customer', 'orderItems'] })];
                    case 1:
                        specific_order = _a.sent();
                        if (!specific_order) {
                            throw new Error("Order not found");
                        }
                        else {
                            console.log(specific_order);
                        }
                        return [2 /*return*/, specific_order];
                }
            });
        });
    };
    orderService.prototype.updateOrder = function (order_id, updateOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var order, orderItems, orderDetails, updatedOrderItem, _i, orderItems_1, orderItem, orderItem_id, orderItemDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderRepo.findOne({ where: { order_id: order_id } })];
                    case 1:
                        order = _a.sent();
                        if (!order) {
                            throw new Error("Order not found");
                        }
                        orderItems = updateOrder.orderItems, orderDetails = __rest(updateOrder, ["orderItems"]);
                        console.log("Updating the order with ".concat(JSON.stringify(updateOrder), " "));
                        return [4 /*yield*/, this.orderRepo.update(order_id, orderDetails)];
                    case 2:
                        updatedOrderItem = _a.sent();
                        console.log(updatedOrderItem);
                        if (!(orderItems && orderItems.length > 0)) return [3 /*break*/, 6];
                        _i = 0, orderItems_1 = orderItems;
                        _a.label = 3;
                    case 3:
                        if (!(_i < orderItems_1.length)) return [3 /*break*/, 6];
                        orderItem = orderItems_1[_i];
                        orderItem_id = orderItem.orderItem_id, orderItemDetails = __rest(orderItem, ["orderItem_id"]);
                        return [4 /*yield*/, orderItemService_1.default.updateOrderItem(orderItem_id, orderItemDetails)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, updatedOrderItem];
                }
            });
        });
    };
    orderService.prototype.deleteOrder = function (order_id) {
        return __awaiter(this, void 0, void 0, function () {
            var existingOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!order_id) {
                            throw new Error("Order ID is required");
                        }
                        return [4 /*yield*/, this.orderRepo.findOne({ where: { order_id: order_id } })];
                    case 1:
                        existingOrder = _a.sent();
                        if (!existingOrder) {
                            throw new Error("Order not found");
                        }
                        console.log("Deleting the customer");
                        console.log(existingOrder);
                        return [4 /*yield*/, this.orderRepo.delete(order_id)];
                    case 2:
                        _a.sent();
                        console.log("Deleted");
                        return [2 /*return*/];
                }
            });
        });
    };
    return orderService;
}());
exports.default = new orderService;
