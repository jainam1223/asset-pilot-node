export const openApiDocument = {
    openapi: '3.0.3',
    info: {
        title: 'Asset Pilot Mobile API',
        version: '1.0.0',
        description:
            'Employee mobile API covering device list/detail, requests, extensions, returns, support, and handover workflows.',
    },
    servers: [
        {
            url: '/api/v1/mobile',
            description: 'Versioned mobile API',
        },
    ],
    components: {
        securitySchemes: {
            headerUser: {
                type: 'apiKey',
                in: 'header',
                name: 'x-user-id',
            },
        },
        schemas: {
            ApiMeta: {
                type: 'object',
                required: ['timestamp', 'request_id'],
                properties: {
                    timestamp: { type: 'string', format: 'date-time' },
                    request_id: { type: 'string', format: 'uuid' },
                },
            },
            ApiError: {
                type: 'object',
                required: [
                    'status_code',
                    'message',
                    'error',
                    'meta',
                    'success',
                ],
                properties: {
                    status_code: { type: 'integer' },
                    message: { type: 'string' },
                    error: {
                        type: 'object',
                        required: ['code', 'message', 'details'],
                        properties: {
                            code: { type: 'string' },
                            message: { type: 'string' },
                            details: { type: 'array', items: {} },
                        },
                    },
                    meta: { $ref: '#/components/schemas/ApiMeta' },
                    success: { type: 'boolean', enum: [false] },
                },
            },
            CreateRequestInput: {
                type: 'object',
                required: ['categoryId', 'requestedFrom', 'requestedTo'],
                properties: {
                    categoryId: { type: 'string', format: 'uuid' },
                    requestedFrom: { type: 'string', format: 'date-time' },
                    requestedTo: { type: 'string', format: 'date-time' },
                    priority: {
                        type: 'string',
                        enum: ['low', 'medium', 'high'],
                    },
                    note: { type: 'string' },
                    isWfh: { type: 'boolean' },
                },
            },
            CreateExtensionRequestInput: {
                type: 'object',
                required: ['extended_to'],
                properties: {
                    extended_to: { type: 'string', format: 'date-time' },
                },
            },
            ReturnDeviceInput: {
                type: 'object',
                required: ['return_tracking_url'],
                properties: {
                    return_tracking_url: {
                        type: 'string',
                        format: 'uri',
                    },
                },
            },
            CreateSupportRequestInput: {
                type: 'object',
                required: ['type', 'description'],
                properties: {
                    type: {
                        type: 'string',
                        enum: ['update', 'damage', 'lost'],
                    },
                    description: { type: 'string' },
                },
            },
            CreateHandoverRequestInput: {
                type: 'object',
                required: ['item_id'],
                properties: {
                    item_id: { type: 'string', format: 'uuid' },
                    requested_duration_hours: {
                        type: 'integer',
                        minimum: 1,
                    },
                },
            },
            ManagerApproveInput: {
                type: 'object',
                properties: {
                    managerDecisionNote: { type: 'string' },
                },
            },
            ManagerRejectInput: {
                type: 'object',
                properties: {
                    managerDecisionNote: { type: 'string' },
                    rejectedReason: { type: 'string' },
                },
            },
        },
        responses: {
            BadRequest: {
                description: 'Bad request',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/ApiError' },
                    },
                },
            },
            NotFound: {
                description: 'Resource not found',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/ApiError' },
                    },
                },
            },
        },
    },
    security: [{ headerUser: [] }],
    paths: {
        '/health': {
            get: {
                summary: 'Health check',
                tags: ['Health'],
                responses: { '200': { description: 'Server is healthy' } },
            },
        },
        '/me/devices': {
            get: {
                summary: 'Screen 1 - My Devices',
                tags: ['Devices'],
                responses: { '200': { description: 'Assigned requests' } },
            },
        },
        '/me/devices/{itemId}': {
            get: {
                summary:
                    'Screen 2 and Screen 8 - Device Detail / Handover lookup',
                tags: ['Devices', 'Handover'],
                parameters: [
                    { $ref: '#/paths/~1me~1devices~1{itemId}/parameters/0' },
                ],
                responses: {
                    '200': { description: 'Device detail' },
                    '404': { $ref: '#/components/responses/NotFound' },
                },
            },
            parameters: [
                {
                    name: 'itemId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' },
                },
            ],
        },
        '/me/requests': {
            post: {
                summary: 'Screen 3 - Create Request',
                tags: ['Requests'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/CreateRequestInput',
                            },
                        },
                    },
                },
                responses: {
                    '201': { description: 'Request created' },
                    '400': { $ref: '#/components/responses/BadRequest' },
                },
            },
        },
        '/manager/approvals': {
            get: {
                summary: 'Screen 4 - List Manager Pending Approvals',
                tags: ['Manager'],
                responses: { '200': { description: 'Pending approvals' } },
            },
        },
        '/manager/requests/{requestId}/approve': {
            patch: {
                summary: 'Screen 4 - Approve Request',
                tags: ['Manager'],
                parameters: [
                    {
                        $ref: '#/paths/~1manager~1requests~1{requestId}~1approve/parameters/0',
                    },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ManagerApproveInput',
                            },
                        },
                    },
                },
                responses: { '200': { description: 'Request approved' } },
            },
            parameters: [
                {
                    name: 'requestId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' },
                },
            ],
        },
        '/manager/requests/{requestId}/reject': {
            patch: {
                summary: 'Screen 4 - Reject Request',
                tags: ['Manager'],
                parameters: [
                    {
                        $ref: '#/paths/~1manager~1requests~1{requestId}~1reject/parameters/0',
                    },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ManagerRejectInput',
                            },
                        },
                    },
                },
                responses: { '200': { description: 'Request rejected' } },
            },
            parameters: [
                {
                    name: 'requestId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' },
                },
            ],
        },
        '/me/devices/{itemId}/extension-requests': {
            get: {
                summary: 'Screen 5 - List Device Extension Requests',
                tags: ['Extensions'],
                responses: { '200': { description: 'Extension history' } },
            },
            post: {
                summary: 'Screen 5 - Create Extension Request',
                tags: ['Extensions'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/CreateExtensionRequestInput',
                            },
                        },
                    },
                },
                responses: { '201': { description: 'Extension created' } },
            },
            parameters: [
                {
                    name: 'itemId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' },
                },
            ],
        },
        '/me/extension-requests/{id}': {
            get: {
                summary: 'Screen 5 - Extension Request Detail',
                tags: ['Extensions'],
                responses: { '200': { description: 'Extension detail' } },
            },
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' },
                },
            ],
        },
        '/me/devices/{itemId}/return': {
            post: {
                summary: 'Screen 6 - Initiate WFH Return',
                tags: ['Returns'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ReturnDeviceInput',
                            },
                        },
                    },
                },
                responses: { '200': { description: 'Return initiated' } },
            },
            parameters: [
                {
                    name: 'itemId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' },
                },
            ],
        },
        '/me/devices/{itemId}/support-requests': {
            post: {
                summary: 'Screen 7 - File Support Request',
                tags: ['Support'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/CreateSupportRequestInput',
                            },
                        },
                    },
                },
                responses: {
                    '201': { description: 'Support request created' },
                },
            },
            parameters: [
                {
                    name: 'itemId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' },
                },
            ],
        },
        '/me/support-requests': {
            get: {
                summary: 'Screen 7 - List My Support Requests',
                tags: ['Support'],
                parameters: [
                    {
                        name: 'status',
                        in: 'query',
                        schema: {
                            type: 'string',
                            enum: ['open', 'in_progress', 'resolved'],
                        },
                    },
                ],
                responses: { '200': { description: 'Support requests' } },
            },
        },
        '/me/support-requests/{id}': {
            get: {
                summary: 'Screen 7 - Support Request Detail',
                tags: ['Support'],
                responses: { '200': { description: 'Support request detail' } },
            },
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' },
                },
            ],
        },
        '/me/handover-requests': {
            get: {
                summary: 'Screen 8 - List My Handover Requests',
                tags: ['Handover'],
                parameters: [
                    {
                        name: 'as',
                        in: 'query',
                        required: true,
                        schema: { type: 'string', enum: ['borrower', 'owner'] },
                    },
                ],
                responses: { '200': { description: 'Handover requests' } },
            },
            post: {
                summary: 'Screen 8 - Create Handover Request',
                tags: ['Handover'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/CreateHandoverRequestInput',
                            },
                        },
                    },
                },
                responses: {
                    '201': { description: 'Handover request created' },
                },
            },
        },
        '/me/handover-requests/{id}/accept': {
            patch: {
                summary: 'Screen 8 - Accept Handover Request',
                tags: ['Handover'],
                responses: { '200': { description: 'Handover accepted' } },
            },
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' },
                },
            ],
        },
        '/me/handover-requests/{id}/reject': {
            patch: {
                summary: 'Screen 8 - Reject Handover Request',
                tags: ['Handover'],
                responses: { '200': { description: 'Handover rejected' } },
            },
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' },
                },
            ],
        },
        '/me/handover-requests/{id}/cancel': {
            patch: {
                summary: 'Screen 8 - Cancel Handover Request',
                tags: ['Handover'],
                responses: { '200': { description: 'Handover cancelled' } },
            },
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' },
                },
            ],
        },
        '/me/handover-requests/{id}/complete': {
            patch: {
                summary: 'Screen 8 - Complete Handover Request',
                tags: ['Handover'],
                responses: { '200': { description: 'Handover completed' } },
            },
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' },
                },
            ],
        },
    },
} as const;
