"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../Config/db"));
function GenerateToken(user) {
    const payload = {
        id: user._id,
        DisplayName: user.displayName,
        username: user.username,
        EmailAddress: user.emailAddress
    };
    const jwtOptions = {
        expiresIn: 604800
    };
    return jsonwebtoken_1.default.sign(payload, db_1.default.sessionSecret, jwtOptions);
}
exports.GenerateToken = GenerateToken;
//# sourceMappingURL=index.js.map