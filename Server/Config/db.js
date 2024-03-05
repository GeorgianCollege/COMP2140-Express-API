"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const localURI = 'mongodb://127.0.0.1:27017/movies';
const remoteURI = process.env.MONGODB_URI;
const sessionSecret = "SomeSessionSecret";
exports.default = {
    localURI: localURI,
    remoteURI: remoteURI,
    sessionSecret: sessionSecret
};
//# sourceMappingURL=db.js.map