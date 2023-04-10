const winston = require('winston');
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

const logtail = new Logtail(process.env.LOGTAIL_TOKEN ?? '');

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'svix-metrics' },
    transports: [
        new LogtailTransport(logtail)
    ],
});