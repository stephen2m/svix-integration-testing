"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettings = void 0;
var settings = null;
function getSettings() {
    var _a;
    if (settings !== null) {
        return settings;
    }
    var port = (_a = Number(process.env.PORT)) !== null && _a !== void 0 ? _a : 3000;
    settings = {
        port: port,
        isDevelopment: !!process.env.DEVELOPMENT,
        svixApiKey: process.env.SVIX_API_KEY,
    };
    return settings;
}
exports.getSettings = getSettings;
