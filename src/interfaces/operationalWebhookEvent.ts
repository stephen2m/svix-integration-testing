interface LastAttempt {
  id: string
  responseStatusCode: number
  timestamp: string
}

interface OperationalWebhookEventData {
  appId: string
  appUid: string
  endpointId: string
  endpointUid?: string
  lastAttempt?: LastAttempt
  msgEventId?: string
  msgId?: string
}

export interface OperationalWebhookEvent {
  data: OperationalWebhookEventData
  type: string
}