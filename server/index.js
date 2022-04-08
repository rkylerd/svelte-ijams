"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./api"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const http = require('http').Server(app);
const logger = (req, res, next) => {
    console.log(req.method.toUpperCase() + ' ' + req.path);
    next();
};
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
// Parse request body
app.use(express_1.default.json());
const corsOptions = {
    origin: ["http://localhost:8080"],
};
app.use(cors_1.default(corsOptions));
app.use('/api', logger, api_1.default());
app.use((_, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "public", "index.html"));
});
const port = process.env.PORT || 3001;
http.listen(port, function () {
    console.log(`listening on port ${port}`);
});
