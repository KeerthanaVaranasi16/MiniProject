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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dataSource_1 = __importDefault(require("../DataSource/dataSource"));
var OrderItem_entity_1 = require("../entities/OrderItem.entity");
var Product_entity_1 = require("../entities/Product.entity");
var Order_entity_1 = require("../entities/Order.entity");
var orderService_1 = __importDefault(require("./orderService"));
var orderItemService = /** @class */ (function () {
    function orderItemService() {
        this.orderItemRepo = dataSource_1.default.getRepository(OrderItem_entity_1.OrderItem);
        this.productRepo = dataSource_1.default.getRepository(Product_entity_1.Product);
        this.orderRepo = dataSource_1.default.getRepository(Order_entity_1.Order);
    }
    orderItemService.prototype.createOrderItem = function (product_id, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            var existingProduct, unitPrice, newOrderItem, savedOrderItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.productRepo.findOne({ where: { product_id: product_id } })];
                    case 1:
                        existingProduct = _a.sent();
                        if (!existingProduct) {
                            throw new Error("Product with ID ".concat(product_id, " not found"));
                        }
                        console.log("Creating new OrderItem");
                        unitPrice = existingProduct.unitPrice;
                        newOrderItem = new OrderItem_entity_1.OrderItem();
                        newOrderItem.quantity = quantity;
                        newOrderItem.unitPrice = unitPrice;
                        newOrderItem.product = existingProduct;
                        return [4 /*yield*/, this.orderItemRepo.save(newOrderItem)];
                    case 2:
                        savedOrderItem = _a.sent();
                        console.log(savedOrderItem);
                        return [2 /*return*/, newOrderItem];
                }
            });
        });
    };
    orderItemService.prototype.addOrderItemToOrder = function (order_id, customer_id, orderItem_ids) {
        return __awaiter(this, void 0, void 0, function () {
            var existingOrder, _i, orderItem_ids_1, orderItem_id, existingOrderItem, addedOrderItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderRepo.findOne({ where: { order_id: order_id } })];
                    case 1:
                        existingOrder = _a.sent();
                        if (!!existingOrder) return [3 /*break*/, 3];
                        return [4 /*yield*/, orderService_1.default.createOrder(customer_id)];
                    case 2:
                        existingOrder = _a.sent();
                        _a.label = 3;
                    case 3:
                        _i = 0, orderItem_ids_1 = orderItem_ids;
                        _a.label = 4;
                    case 4:
                        if (!(_i < orderItem_ids_1.length)) return [3 /*break*/, 7];
                        orderItem_id = orderItem_ids_1[_i];
                        return [4 /*yield*/, this.orderItemRepo.findOne({ where: { orderItem_id: orderItem_id } })];
                    case 5:
                        existingOrderItem = _a.sent();
                        console.log("Existing orderItem ".concat(existingOrderItem));
                        if (!existingOrderItem) {
                            throw new Error("OrderItem with ID ".concat(orderItem_id, " not found"));
                        }
                        if (!existingOrder.orderItems) {
                            existingOrder.orderItems = [];
                        }
                        console.log("Adding the orderItem to order");
                        existingOrder.orderItems.push(existingOrderItem);
                        existingOrder.totalAmount += existingOrderItem.unitPrice * existingOrderItem.quantity;
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [4 /*yield*/, this.orderRepo.save(existingOrder)];
                    case 8:
                        addedOrderItem = _a.sent();
                        console.log(addedOrderItem);
                        return [2 /*return*/];
                }
            });
        });
    };
    orderItemService.prototype.getAllOrderItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var orderItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Getting all OrderItems");
                        return [4 /*yield*/, this.orderItemRepo
                                .createQueryBuilder("orderItem").leftJoinAndSelect("orderItem.product", "product")
                                .orderBy("orderItem.orderItem_id", "ASC")
                                .getMany()];
                    case 1:
                        orderItems = _a.sent();
                        console.log(orderItems);
                        return [2 /*return*/, orderItems];
                }
            });
        });
    };
    orderItemService.prototype.getOneOrderItem = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var specific_order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Getting particular OrderItem details");
                        return [4 /*yield*/, this.orderItemRepo.findOne({ where: options, relations: ['product'] })];
                    case 1:
                        specific_order = _a.sent();
                        if (!specific_order) {
                            throw new Error("Order not found");
                        }
                        console.log(specific_order);
                        return [2 /*return*/, specific_order];
                }
            });
        });
    };
    orderItemService.prototype.updateOrderItem = function (orderItem_id, updateOrderItem) {
        return __awaiter(this, void 0, void 0, function () {
            var orderItem, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderItemRepo.findOne({ where: { orderItem_id: orderItem_id } })];
                    case 1:
                        orderItem = _a.sent();
                        if (!orderItem) {
                            throw new Error("OrderItem with ID ".concat(orderItem_id, " is not found"));
                        }
                        console.log("Updating the order with ".concat(JSON.stringify(updateOrderItem), " "));
                        return [4 /*yield*/, this.orderItemRepo.update(orderItem_id, updateOrderItem)];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    orderItemService.prototype.deleteOrderItem = function (orderItem_id) {
        return __awaiter(this, void 0, void 0, function () {
            var existingOrderItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!orderItem_id) {
                            throw new Error("OrderItem ID is required");
                        }
                        return [4 /*yield*/, this.orderItemRepo.findOne({ where: { orderItem_id: orderItem_id } })];
                    case 1:
                        existingOrderItem = _a.sent();
                        if (!existingOrderItem) {
                            throw new Error("OrderItem with ID ".concat(orderItem_id, " is not found"));
                        }
                        console.log("Deleting the customer");
                        console.log(existingOrderItem);
                        return [4 /*yield*/, this.orderItemRepo.delete(orderItem_id)];
                    case 2:
                        _a.sent();
                        console.log("Deleted");
                        return [2 /*return*/];
                }
            });
        });
    };
    return orderItemService;
}());
exports.default = new orderItemService;
