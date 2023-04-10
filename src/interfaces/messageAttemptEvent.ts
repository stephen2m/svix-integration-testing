interface LastAttempt {
    id: string
    responseStatusCode: number
    timestamp: string
}

 interface MessageAttemptEventData {
     appId: string
     appUid: string
     endpointId: string
     lastAttempt: LastAttempt
     msgEventId: string
     msgId: string
 }

export interface MessageAttemptEvent {
    data: MessageAttemptEventData
    type: string
}
