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
var orderService_1 = __importDefault(require("./orderService"));
var customerService = /** @class */ (function () {
    function customerService() {
        this.customerRepo = dataSource_1.default.getRepository(Customer_entity_1.Customer);
    }
    customerService.prototype.getAllCustomers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var customers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Getting all the users");
                        return [4 /*yield*/, this.customerRepo
                                .createQueryBuilder("customer").leftJoinAndSelect("customer.orders", "orders", "orders.checkOut = :checkOut", { checkOut: true }).leftJoinAndSelect('orders.orderItems', 'orderItems')
                                .orderBy("customer.customer_id", "ASC")
                                .getMany()];
                    case 1:
                        customers = _a.sent();
                        console.log(customers);
                        return [2 /*return*/, customers];
                }
            });
        });
    };
    customerService.prototype.getOneCustomer = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var specific_customer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Getting particular customer details");
                        return [4 /*yield*/, this.customerRepo.findOne({ where: options, relations: ['orders', 'orders.orderItems'] })];
                    case 1:
                        specific_customer = _a.sent();
                        if (!specific_customer) {
                            throw new Error("Customer not found");
                        }
                        else {
                            console.log(specific_customer);
                        }
                        return [2 /*return*/, specific_customer];
                }
            });
        });
    };
    customerService.prototype.createCustomer = function (firstName, lastName, city, country, phone, order) {
        return __awaiter(this, void 0, void 0, function () {
            var phoneRegex, existingCustomer, newCustomer, savedCustomer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!firstName || !lastName || !city || !country || !phone) {
                            throw new Error("Incomplete data");
                        }
                        phoneRegex = /^\d{10}$/;
                        if (!phoneRegex.test(phone)) {
                            throw new Error("Invalid phone number format. Phone number must contain 10 digits.");
                        }
                        return [4 /*yield*/, this.customerRepo.findOne({ where: { phone: phone } })];
                    case 1:
                        existingCustomer = _a.sent();
                        if (existingCustomer) {
                            throw new Error("Phone number already exists");
                        }
                        console.log("Creating new customer");
                        newCustomer = new Customer_entity_1.Customer();
                        newCustomer.firstName = firstName;
                        newCustomer.lastName = lastName;
                        newCustomer.city = city;
                        newCustomer.country = country;
                        newCustomer.phone = phone;
                        if (order) {
                            newCustomer.orders = order.map(function (orderData) {
                                var order = new Order_entity_1.Order();
                                order.orderDate = orderData.orderDate;
                                order.totalAmount = orderData.totalAmount;
                                return order;
                            });
                        }
                        return [4 /*yield*/, this.customerRepo.save(newCustomer)];
                    case 2:
                        savedCustomer = _a.sent();
                        console.log(savedCustomer);
                        return [2 /*return*/, savedCustomer];
                }
            });
        });
    };
    customerService.prototype.updateCustomer = function (customer_id, updateData) {
        return __awaiter(this, void 0, void 0, function () {
            var orders, customerDetails, existingCustomer, updatedCustomer, _i, orders_1, order, order_id, orderDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orders = updateData.orders, customerDetails = __rest(updateData, ["orders"]);
                        if (!customer_id) {
                            throw new Error("Customer ID is required");
                        }
                        return [4 /*yield*/, this.customerRepo.findOne({ where: { customer_id: customer_id } })];
                    case 1:
                        existingCustomer = _a.sent();
                        if (!existingCustomer) {
                            throw new Error("Customer with ID ".concat(customer_id, " is not found"));
                        }
                        console.log("Updating the customer");
                        return [4 /*yield*/, this.customerRepo.update(customer_id, customerDetails)];
                    case 2:
                        updatedCustomer = _a.sent();
                        console.log(updatedCustomer);
                        if (!(orders && orders.length > 0)) return [3 /*break*/, 6];
                        _i = 0, orders_1 = orders;
                        _a.label = 3;
                    case 3:
                        if (!(_i < orders_1.length)) return [3 /*break*/, 6];
                        order = orders_1[_i];
                        order_id = order.order_id, orderDetails = __rest(order, ["order_id"]);
                        return [4 /*yield*/, orderService_1.default.updateOrder(order_id, orderDetails)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    customerService.prototype.deleteCustomer = function (customer_id) {
        return __awaiter(this, void 0, void 0, function () {
            var existingCustomer, deletedCustomer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!customer_id) {
                            throw new Error("CustomerID is required");
                        }
                        return [4 /*yield*/, this.customerRepo.findOne({ where: { customer_id: customer_id } })];
                    case 1:
                        existingCustomer = _a.sent();
                        if (!existingCustomer) {
                            throw new Error("Customer with ID ".concat(customer_id, " is not found"));
                        }
                        console.log("Deleting the customer");
                        return [4 /*yield*/, this.customerRepo.delete(customer_id)];
                    case 2:
                        deletedCustomer = _a.sent();
                        console.log(deletedCustomer);
                        return [2 /*return*/];
                }
            });
        });
    };
    return customerService;
}());
exports.default = new customerService();
