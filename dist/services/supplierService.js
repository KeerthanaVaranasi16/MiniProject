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
var Supplier_entity_1 = require("../entities/Supplier.entity");
var Product_entity_1 = require("../entities/Product.entity");
var productService_1 = __importDefault(require("./productService"));
var supplierService = /** @class */ (function () {
    function supplierService() {
        this.supplierRepo = dataSource_1.default.getRepository(Supplier_entity_1.Supplier);
    }
    supplierService.prototype.getAllSuppliers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allSuppliers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Getting all the users");
                        return [4 /*yield*/, this.supplierRepo
                                .createQueryBuilder("supplier").leftJoinAndSelect("supplier.products", "products")
                                .orderBy("supplier.supplier_id", "ASC")
                                .getMany()];
                    case 1:
                        allSuppliers = _a.sent();
                        console.log(allSuppliers);
                        return [2 /*return*/, allSuppliers];
                }
            });
        });
    };
    supplierService.prototype.createSupplier = function (companyName, contactName, city, country, phone, product) {
        return __awaiter(this, void 0, void 0, function () {
            var phoneRegex, existingSupplier, newSupplier, createdSupplier;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!companyName || !contactName || !city || !country || !phone) {
                            throw new Error("Incomplete Data");
                        }
                        phoneRegex = /^\d{10}$/;
                        if (!phoneRegex.test(phone)) {
                            throw new Error("Invalid phone number format. Phone number must contain 10 digits.");
                        }
                        return [4 /*yield*/, this.supplierRepo.findOne({ where: { phone: phone } })];
                    case 1:
                        existingSupplier = _a.sent();
                        if (existingSupplier) {
                            throw new Error("Phone number already exists");
                        }
                        console.log("Creating new Supplier");
                        newSupplier = new Supplier_entity_1.Supplier();
                        newSupplier.companyName = companyName;
                        newSupplier.contactName = contactName;
                        newSupplier.city = city;
                        newSupplier.country = country;
                        newSupplier.phone = phone;
                        if (product) {
                            newSupplier.products = product.map(function (productData) {
                                var newProduct = new Product_entity_1.Product();
                                newProduct.productName = productData.productName;
                                newProduct.unitPrice = productData.unitPrice;
                                newProduct.packages = productData.packages;
                                newProduct.isDiscontinued = productData.isDiscontinued;
                                return newProduct;
                            });
                        }
                        return [4 /*yield*/, this.supplierRepo.save(newSupplier)];
                    case 2:
                        createdSupplier = _a.sent();
                        console.log(createdSupplier);
                        return [2 /*return*/, createdSupplier];
                }
            });
        });
    };
    supplierService.prototype.getOneSupplier = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var specific_supplier;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Getting particular customer details");
                        return [4 /*yield*/, this.supplierRepo.findOne({ where: options, relations: ['products'] })];
                    case 1:
                        specific_supplier = _a.sent();
                        if (!specific_supplier) {
                            throw new Error("Supplier not found");
                        }
                        console.log(specific_supplier);
                        return [2 /*return*/, specific_supplier];
                }
            });
        });
    };
    supplierService.prototype.updateSupplier = function (supplier_id, updateData) {
        return __awaiter(this, void 0, void 0, function () {
            var existingSupplier, products, supplierDetails, updatedSupplier, _i, products_1, product, product_id, productDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!supplier_id) {
                            throw new Error("Supplier ID is required");
                        }
                        return [4 /*yield*/, this.supplierRepo.findOne({ where: { supplier_id: supplier_id } })];
                    case 1:
                        existingSupplier = _a.sent();
                        if (!existingSupplier) {
                            throw new Error("Supplier not found");
                        }
                        products = updateData.products, supplierDetails = __rest(updateData, ["products"]);
                        console.log("Updating the supplier");
                        return [4 /*yield*/, this.supplierRepo.update(supplier_id, supplierDetails)];
                    case 2:
                        updatedSupplier = _a.sent();
                        console.log(updatedSupplier);
                        if (!products) return [3 /*break*/, 6];
                        _i = 0, products_1 = products;
                        _a.label = 3;
                    case 3:
                        if (!(_i < products_1.length)) return [3 /*break*/, 6];
                        product = products_1[_i];
                        product_id = product.product_id, productDetails = __rest(product, ["product_id"]);
                        return [4 /*yield*/, productService_1.default.updateProduct(product_id, productDetails)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, updatedSupplier];
                }
            });
        });
    };
    supplierService.prototype.deleteSupplier = function (supplier_id) {
        return __awaiter(this, void 0, void 0, function () {
            var existingSupplier, deletedSupplier;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!supplier_id) {
                            throw new Error("Supplier ID is required");
                        }
                        return [4 /*yield*/, this.supplierRepo.findOne({ where: { supplier_id: supplier_id } })];
                    case 1:
                        existingSupplier = _a.sent();
                        if (!existingSupplier) {
                            throw new Error("Supplier not found");
                        }
                        return [4 /*yield*/, this.supplierRepo.delete(supplier_id)];
                    case 2:
                        deletedSupplier = _a.sent();
                        console.log(deletedSupplier);
                        return [2 /*return*/, deletedSupplier];
                }
            });
        });
    };
    return supplierService;
}());
exports.default = new supplierService;
