"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoginUrl = void 0;
const svix_1 = require("svix");
const settings_1 = require("../../settings");
const settings = settings_1.getSettings();
const svixSDK = new svix_1.Svix(settings.svixApiKey ?? '');
async function getLoginUrl(clientId) {
    await svixSDK.application.getOrCreate({ uid: clientId, name: clientId });
    const url = await svixSDK.authentication.appPortalAccess(clientId, {
        featureFlags: [],
    });
    // await svixSDK.authentication.expireAll(clientId, {
    //     expiry: 15
    // });
    return url;
}
exports.getLoginUrl = getLoginUrl;
