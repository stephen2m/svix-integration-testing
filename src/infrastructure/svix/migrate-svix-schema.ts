import  { logger } from '../../infrastructure/logging';
import { eventTypes } from '../../infrastructure/svix/eventTypes';
import { updateOrCreateEventType } from './index';

const updates = [];
for (const eventType of eventTypes) {
    updates.push(updateOrCreateEventType(eventType));
}

Promise.all(updates)
    .then(() => logger.info('SVIX schema updates complete'))
    .catch((err) => {
        logger.error(`Could not update SVIX schema: ${err}`);
    });