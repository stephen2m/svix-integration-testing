const winston = require('winston');
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

const { combine, timestamp, json } = winston.format;

const logtail = new Logtail(process.env.LOGTAIL_TOKEN ?? '');

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(timestamp(), json()),
    defaultMeta: { service: 'svix-metrics' },
    transports: [
        new LogtailTransport(logtail)
    ],
});