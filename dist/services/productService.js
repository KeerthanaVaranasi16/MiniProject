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
var Product_entity_1 = require("../entities/Product.entity");
var Supplier_entity_1 = require("../entities/Supplier.entity");
var orderItemService_1 = __importDefault(require("./orderItemService"));
var productService = /** @class */ (function () {
    function productService() {
        this.productRepo = dataSource_1.default.getRepository(Product_entity_1.Product);
        this.supplierRepo = dataSource_1.default.getRepository(Supplier_entity_1.Supplier);
    }
    productService.prototype.createProduct = function (supplier_id, productName, unitPrice, packages, isDiscontinued) {
        return __awaiter(this, void 0, void 0, function () {
            var supplier, newProduct, createdProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.supplierRepo.findOne({ where: { supplier_id: supplier_id } })];
                    case 1:
                        supplier = _a.sent();
                        if (!supplier) {
                            throw new Error("Supplier with ID ".concat(supplier_id, " is not found"));
                        }
                        if (!productName || !unitPrice || !packages) {
                            throw new Error("Incomplete data");
                        }
                        console.log("Creating new product");
                        newProduct = new Product_entity_1.Product();
                        newProduct.productName = productName;
                        newProduct.unitPrice = unitPrice;
                        newProduct.packages = packages;
                        newProduct.isDiscontinued = isDiscontinued;
                        newProduct.supplier = supplier;
                        return [4 /*yield*/, this.productRepo.save(newProduct)];
                    case 2:
                        createdProduct = _a.sent();
                        console.log(createdProduct);
                        return [2 /*return*/, createdProduct];
                }
            });
        });
    };
    productService.prototype.getAllProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Getting all products");
                        return [4 /*yield*/, this.productRepo
                                .createQueryBuilder("product")
                                // .leftJoinAndSelect("product.orderItems", "orderItems")
                                .orderBy("product.product_id", 'ASC').getMany()];
                    case 1:
                        products = _a.sent();
                        console.log(products);
                        return [2 /*return*/, products];
                }
            });
        });
    };
    productService.prototype.getOneProduct = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var specificProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Getting product details");
                        return [4 /*yield*/, this.productRepo.findOne({ where: options })];
                    case 1:
                        specificProduct = _a.sent();
                        if (!specificProduct) {
                            throw new Error("Product not found");
                        }
                        console.log(specificProduct);
                        return [2 /*return*/, specificProduct];
                }
            });
        });
    };
    productService.prototype.updateProduct = function (product_id, updateData) {
        return __awaiter(this, void 0, void 0, function () {
            var existingProduct, orderItems, productDetails, updatedProduct, _i, orderItems_1, orderItem, orderItem_id, orderItemDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!product_id) {
                            throw new Error("Product ID is required");
                        }
                        return [4 /*yield*/, this.productRepo.findOne({ where: { product_id: product_id } })];
                    case 1:
                        existingProduct = _a.sent();
                        if (!existingProduct) {
                            throw new Error("Product with ID ".concat(product_id, " is not found"));
                        }
                        console.log("Updating the details of product ".concat(product_id));
                        orderItems = updateData.orderItems, productDetails = __rest(updateData, ["orderItems"]);
                        return [4 /*yield*/, this.productRepo.update(product_id, productDetails)];
                    case 2:
                        updatedProduct = _a.sent();
                        console.log(updatedProduct);
                        if (!(orderItems && orderItems.length > 0)) return [3 /*break*/, 6];
                        _i = 0, orderItems_1 = orderItems;
                        _a.label = 3;
                    case 3:
                        if (!(_i < orderItems_1.length)) return [3 /*break*/, 6];
                        orderItem = orderItems_1[_i];
                        orderItem_id = orderItem.orderItem_id, orderItemDetails = __rest(orderItem, ["orderItem_id"]);
                        console.log("".concat(JSON.stringify(orderItemDetails['0']), " in customers"));
                        return [4 /*yield*/, orderItemService_1.default.updateOrderItem(orderItem_id, orderItemDetails)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, updatedProduct];
                }
            });
        });
    };
    productService.prototype.deleteProduct = function (product_id) {
        return __awaiter(this, void 0, void 0, function () {
            var existingProduct, deletedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!product_id) {
                            throw new Error("Product ID is required");
                        }
                        return [4 /*yield*/, this.productRepo.findOne({ where: { product_id: product_id } })];
                    case 1:
                        existingProduct = _a.sent();
                        if (!existingProduct) {
                            throw new Error("Product with ID ".concat(product_id, " is not found"));
                        }
                        console.log("Deleting the product");
                        return [4 /*yield*/, this.productRepo.delete(product_id)];
                    case 2:
                        deletedProduct = _a.sent();
                        console.log(deletedProduct);
                        return [2 /*return*/];
                }
            });
        });
    };
    return productService;
}());
exports.default = new productService;
