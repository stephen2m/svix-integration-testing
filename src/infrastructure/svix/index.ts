import { ApiException, EventTypeIn, Svix } from 'svix';

import { getSettings } from '../../settings';
import { logger } from '../logging';

const settings = getSettings();

const svixSDK = new Svix(settings.svixApiKey ?? '');

export async function getLoginUrl(clientId: string) {
  await svixSDK.application.getOrCreate({ uid: clientId, name: clientId });

  return await svixSDK.authentication.appPortalAccess(clientId, {
    featureFlags: [],
  });
}

export async function updateOrCreateEventType(eventType: EventTypeIn) {
  try {
    await svixSDK.eventType.get(eventType.name);
    return await svixSDK.eventType.update(eventType.name, eventType);
  } catch (err: unknown) {
    if (err instanceof ApiException && err.code === 404) {
      return await svixSDK.eventType.create(eventType);
    }
    return await Promise.reject(err);
  }
}

export async function listEndpoints(
    clientId: string | string[] | undefined, filterType?: string | string[] | undefined,
) {
  let result;
  if (typeof clientId === 'string') {
    result = await svixSDK.endpoint.list(clientId);
  }

  if (filterType) {
    // @ts-ignore
    result.data = result.data.filter((endPoint) => endPoint.filterTypes?.includes(filterType));
  }

  // @ts-ignore
  return result.data;
}

export async function getEndpointDetails(appId: string, endpointId: string) {
  try {
    return await svixSDK.endpoint.get(appId, endpointId);
  } catch (err) {
    logger.error(err as Error);

    return null
  }
}

export async function getEndpointStats(appId: string, endpointId: string) {
  return await svixSDK.endpoint.getStats(appId, endpointId);
}