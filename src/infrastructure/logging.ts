const winston = require('winston');
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

import { getSettings } from '../settings';

const settings = getSettings();
const { combine, timestamp, json } = winston.format;

const logtail = new Logtail(settings.logTailToken ?? '');

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(timestamp(), json()),
    defaultMeta: { service: 'svix-metrics' },
    transports: [
        new LogtailTransport(logtail)
    ],
});