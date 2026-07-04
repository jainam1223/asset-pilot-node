export const apiExamples = {
    headerUserId: 'd9c8a9aa-6dbc-4dac-8963-96e18c55117e',
    managerUserId: '7651cc46-814b-43e3-b1b9-40d6cf06f5ca',
    categoryId: '5997f8c2-23a7-48c7-9c6c-8c509897db73',
    itemId: '1f9e1b03-a1e9-46e9-9ff9-69d789309480',
    requestId: '6995cd90-bce7-42cf-84a6-e95a4d382598',
    extensionRequestId: '63fe0e91-6bd2-4b0a-8a5d-912391ed5d25',
    supportRequestId: '19a739c7-c34c-4157-8059-941b565ec499',
    handoverRequestId: '39085fb7-1e30-489e-afdd-7e744a771fcd',
    createRequest: {
        categoryId: '5997f8c2-23a7-48c7-9c6c-8c509897db73',
        requestedFrom: '2026-07-10T08:00:00.000Z',
        requestedTo: '2026-07-14T18:00:00.000Z',
        priority: 'high',
        note: 'Need for upcoming client presentation',
        isWfh: true,
    },
    createExtensionRequest: {
        extended_to: '2026-08-15T18:00:00.000Z',
    },
    returnDevice: {
        return_tracking_url: 'https://tracking.techcorp.internal/returns/req-1001',
    },
    createSupportRequest: {
        type: 'damage',
        description: 'The keyboard intermittently fails after a spill.',
    },
    createHandoverRequest: {
        item_id: '1f9e1b03-a1e9-46e9-9ff9-69d789309480',
        requested_duration_hours: 3,
    },
    managerApprove: {
        managerDecisionNote: 'Approved based on the project staffing plan.',
    },
    managerReject: {
        managerDecisionNote: 'Request conflicts with planned maintenance window.',
        rejectedReason: 'Conflicting maintenance schedule',
    },
    myDevicesResponse: [
        {
            id: '6995cd90-bce7-42cf-84a6-e95a4d382598',
            status: 'assigned',
            priority: 'high',
            note: 'Need for upcoming client presentation',
            requestedFrom: '2026-07-10T08:00:00.000Z',
            requestedTo: '2026-07-14T18:00:00.000Z',
            assignedItem: {
                id: '1f9e1b03-a1e9-46e9-9ff9-69d789309480',
                name: 'Lenovo IdeaPad 5 Pro',
                serialNo: 'SN-591095',
                status: 'assigned',
                currentOwnerId: 'd9c8a9aa-6dbc-4dac-8963-96e18c55117e',
                category: {
                    id: '5997f8c2-23a7-48c7-9c6c-8c509897db73',
                    name: 'Laptop',
                },
            },
            category: {
                id: '5997f8c2-23a7-48c7-9c6c-8c509897db73',
                name: 'Laptop',
            },
        },
    ],
    deviceDetailResponse: {
        request: {
            id: '6995cd90-bce7-42cf-84a6-e95a4d382598',
            status: 'assigned',
            priority: 'high',
            assignedTo: '2026-08-03T07:47:53.031+00:00',
            assignedFrom: '2026-07-03T07:47:53.031+00:00',
        },
        item: {
            id: '1f9e1b03-a1e9-46e9-9ff9-69d789309480',
            name: 'Lenovo IdeaPad 5 Pro',
            serialNo: 'SN-591095',
            status: 'assigned',
            currentOwnerId: 'd9c8a9aa-6dbc-4dac-8963-96e18c55117e',
            category: {
                id: '5997f8c2-23a7-48c7-9c6c-8c509897db73',
                name: 'Laptop',
            },
        },
        handoverRequests: [],
    },
    requestCreatedResponse: {
        id: '6995cd90-bce7-42cf-84a6-e95a4d382598',
        status: 'pending_it_approval',
        priority: 'high',
        requiresMgrApproval: true,
        mgrApprovalStatus: 'pending',
        category: {
            id: '5997f8c2-23a7-48c7-9c6c-8c509897db73',
            name: 'Laptop',
        },
    },
    managerApprovalsResponse: [
        {
            id: '6995cd90-bce7-42cf-84a6-e95a4d382598',
            status: 'pending_mgr_approval',
            priority: 'high',
            requester: {
                id: 'd9c8a9aa-6dbc-4dac-8963-96e18c55117e',
                name: 'Alice Moore',
                email: 'alice.moore@techcorp.internal',
            },
            category: {
                id: '5997f8c2-23a7-48c7-9c6c-8c509897db73',
                name: 'Laptop',
            },
        },
    ],
    extensionRequestsResponse: [
        {
            id: '63fe0e91-6bd2-4b0a-8a5d-912391ed5d25',
            status: 'pending',
            currentAssignedTo: '2026-07-03T07:47:53.031+00:00',
            extendedTo: '2026-08-03T07:47:53.031+00:00',
            mgrApprovalStatus: 'pending',
            createdAt: '2026-07-03T07:47:57.587+00:00',
        },
    ],
    extensionRequestDetailResponse: {
        id: '63fe0e91-6bd2-4b0a-8a5d-912391ed5d25',
        status: 'pending',
        currentAssignedTo: '2026-07-03T07:47:53.031+00:00',
        extendedTo: '2026-08-03T07:47:53.031+00:00',
        mgrApprovalStatus: 'pending',
        createdAt: '2026-07-03T07:47:57.587+00:00',
    },
    returnInitiatedResponse: {
        item: {
            id: '1f9e1b03-a1e9-46e9-9ff9-69d789309480',
            status: 'return_shipping_pending',
        },
        request: {
            id: '6995cd90-bce7-42cf-84a6-e95a4d382598',
            returnTrackingUrl: 'https://tracking.techcorp.internal/returns/req-1001',
        },
    },
    supportRequestsResponse: [
        {
            id: '19a739c7-c34c-4157-8059-941b565ec499',
            type: 'damage',
            status: 'open',
            description: 'The keyboard intermittently fails after a spill.',
            item: {
                id: '1f9e1b03-a1e9-46e9-9ff9-69d789309480',
                name: 'Lenovo IdeaPad 5 Pro',
            },
        },
    ],
    supportRequestDetailResponse: {
        id: '19a739c7-c34c-4157-8059-941b565ec499',
        type: 'damage',
        status: 'open',
        description: 'The keyboard intermittently fails after a spill.',
        item: {
            id: '1f9e1b03-a1e9-46e9-9ff9-69d789309480',
            name: 'Lenovo IdeaPad 5 Pro',
            serialNo: 'SN-591095',
        },
    },
    handoverRequestsResponse: [
        {
            id: '39085fb7-1e30-489e-afdd-7e744a771fcd',
            status: 'requested',
            requestedDurationHours: 3,
            item: {
                id: '1f9e1b03-a1e9-46e9-9ff9-69d789309480',
                name: 'Lenovo IdeaPad 5 Pro',
            },
        },
    ],
};
