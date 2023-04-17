import { accountCreated } from './events/accounts';

export const eventTypes = [
    accountCreated,
] as const;
export type EventTypes = (typeof eventTypes)[number]['name'];

export default eventTypes;
