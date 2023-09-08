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
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const typeorm_1 = require("typeorm");
const Profile_1 = require("./Profile");
const Role_1 = require("./Role");
let user = class user extends typeorm_1.BaseEntity {
};
exports.user = user;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], user.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, nullable: false }),
    __metadata("design:type", String)
], user.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], user.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], user.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Profile_1.profile),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Profile_1.profile)
], user.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Role_1.role),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], user.prototype, "Roles", void 0);
exports.user = user = __decorate([
    (0, typeorm_1.Entity)("users")
], user);
