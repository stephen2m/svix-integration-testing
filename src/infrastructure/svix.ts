import {Svix} from 'svix';

import { getSettings } from '../settings';

const settings = getSettings();

const svixSDK = new Svix(settings.svixApiKey ?? '');

export async function getLoginUrl(clientId: string) {
  await svixSDK.application.getOrCreate({ uid: clientId, name: clientId });

  return await svixSDK.authentication.appPortalAccess(clientId, {
    featureFlags: [],
  });
}