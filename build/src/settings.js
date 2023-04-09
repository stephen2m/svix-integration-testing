"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettings = void 0;
let settings = null;
function getSettings() {
    if (settings !== null) {
        return settings;
    }
    const port = Number(process.env.PORT) ?? 3000;
    settings = {
        port,
        isDevelopment: !!process.env.DEVELOPMENT,
        svixApiKey: process.env.SVIX_API_KEY,
    };
    return settings;
}
exports.getSettings = getSettings;
