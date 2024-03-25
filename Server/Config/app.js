"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("./db"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const cors_1 = __importDefault(require("cors"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
let JWTStrategy = passport_jwt_1.default.Strategy;
let ExtractJWT = passport_jwt_1.default.ExtractJwt;
let localStrategy = passport_local_1.default.Strategy;
const user_1 = __importDefault(require("../Models/user"));
mongoose_1.default.connect(db_1.default.remoteURI);
mongoose_1.default.connection.on('connected', () => {
    console.log(`Connected to MongoDB`);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});
const index_1 = __importDefault(require("../Routes/index"));
const auth_1 = __importDefault(require("../Routes/auth"));
let app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use((0, express_session_1.default)({
    secret: db_1.default.sessionSecret,
    saveUninitialized: false,
    resave: false
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(user_1.default.createStrategy());
user_1.default.serializeUser();
passport_1.default.serializeUser(user_1.default.serializeUser());
passport_1.default.deserializeUser(user_1.default.deserializeUser());
let jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: db_1.default.sessionSecret
};
let strategy = new JWTStrategy(jwtOptions, function (jwt_payload, done) {
    try {
        const user = user_1.default.findById(jwt_payload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }
    catch (error) {
        return done(error, false);
    }
});
passport_1.default.use(strategy);
app.use('/api/', auth_1.default);
app.use('/api/', index_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map