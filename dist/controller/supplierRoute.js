"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.supplierRoute = void 0;
var routing_controllers_1 = require("routing-controllers");
var supplierService_1 = __importDefault(require("../services/supplierService"));
var supplierRoute = /** @class */ (function () {
    function supplierRoute() {
    }
    supplierRoute.prototype.createSupplier = function (body, res) {
        return __awaiter(this, void 0, void 0, function () {
            var companyName, contactName, city, country, phone, products, savedSupplier, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        companyName = body.companyName, contactName = body.contactName, city = body.city, country = body.country, phone = body.phone, products = body.products;
                        return [4 /*yield*/, supplierService_1.default.createSupplier(companyName, contactName, city, country, phone, products)];
                    case 1:
                        savedSupplier = _a.sent();
                        return [2 /*return*/, savedSupplier];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1 instanceof Error) {
                            return [2 /*return*/, res.status(500).json({ error: error_1.message })];
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    supplierRoute.prototype.getAllSuppliers = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var customers, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, supplierService_1.default.getAllSuppliers()];
                    case 1:
                        customers = _a.sent();
                        return [2 /*return*/, res.json(customers)];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_2.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    supplierRoute.prototype.getOneSupplier = function (supplier_id, companyName, contactName, city, country, phone, res) {
        return __awaiter(this, void 0, void 0, function () {
            var options, customer, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        options = {
                            supplier_id: supplier_id,
                            companyName: companyName,
                            contactName: contactName,
                            city: city,
                            country: country,
                            phone: phone,
                        };
                        return [4 /*yield*/, supplierService_1.default.getOneSupplier(options)];
                    case 1:
                        customer = _a.sent();
                        return [2 /*return*/, res.json(customer)];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_3.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    supplierRoute.prototype.updateSupplier = function (supplier_id, updateData, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, supplierService_1.default.updateSupplier(supplier_id, updateData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({ message: "Updated successfully" })];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_4.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    supplierRoute.prototype.deleteSupplier = function (supplier_id, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, supplierService_1.default.deleteSupplier(supplier_id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({ message: "Deleted successfully" })];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_5.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, routing_controllers_1.Post)("/create"),
        __param(0, (0, routing_controllers_1.Body)()),
        __param(1, (0, routing_controllers_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], supplierRoute.prototype, "createSupplier", null);
    __decorate([
        (0, routing_controllers_1.Get)("/getAll"),
        __param(0, (0, routing_controllers_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], supplierRoute.prototype, "getAllSuppliers", null);
    __decorate([
        (0, routing_controllers_1.Get)("/getOne"),
        __param(0, (0, routing_controllers_1.QueryParam)("supplier_id")),
        __param(1, (0, routing_controllers_1.QueryParam)("companyName")),
        __param(2, (0, routing_controllers_1.QueryParam)("contactName")),
        __param(3, (0, routing_controllers_1.QueryParam)("city")),
        __param(4, (0, routing_controllers_1.QueryParam)("country")),
        __param(5, (0, routing_controllers_1.QueryParam)("phone")),
        __param(6, (0, routing_controllers_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, String, String, String, String, Number, Object]),
        __metadata("design:returntype", Promise)
    ], supplierRoute.prototype, "getOneSupplier", null);
    __decorate([
        (0, routing_controllers_1.Put)("/update/:supplier_id"),
        __param(0, (0, routing_controllers_1.Param)("supplier_id")),
        __param(1, (0, routing_controllers_1.Body)()),
        __param(2, (0, routing_controllers_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, Object]),
        __metadata("design:returntype", Promise)
    ], supplierRoute.prototype, "updateSupplier", null);
    __decorate([
        (0, routing_controllers_1.Delete)("/delete/:supplier_id"),
        __param(0, (0, routing_controllers_1.Param)("supplier_id")),
        __param(1, (0, routing_controllers_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], supplierRoute.prototype, "deleteSupplier", null);
    supplierRoute = __decorate([
        (0, routing_controllers_1.JsonController)("/supplier")
    ], supplierRoute);
    return supplierRoute;
}());
exports.supplierRoute = supplierRoute;
