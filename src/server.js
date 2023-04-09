"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app/app"));
// Process.env will always be comprised of strings, so we typecast the port to a number.
var PORT = Number(process.env.PORT) || 3000;
app_1.default.listen(PORT);
