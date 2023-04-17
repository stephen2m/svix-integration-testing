import { stringType } from './jsonSchemaTypes';

export const accountCreated = {
    description: 'Event emitted when an account is created',
    name: 'account.created',
    schemas: {
        '1': {
            $schema: 'http://json-schema.org/draft-07/schema#',
            $id: 'http://json-schema.org/draft-07/schema#',
            title: 'Account Created',
            description: 'Event emitted when an account is created',
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        client: {
                            type: 'object',
                            properties: {
                                __typename: stringType,
                                created: stringType,
                            },
                        },
                    },
                },
            },
        },
    },
} as const;
