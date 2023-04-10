interface EndpointEventData {
    appId: string
    appUid: string
    endpointId: string
    endpointUid: string
}

export interface EndpointEvent {
    data: EndpointEventData
    type: string
}