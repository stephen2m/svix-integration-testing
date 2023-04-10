export interface BackgroundTaskData {
    appStats: AppStat[]
}

interface AppStat {
    appId: string
    appUid: any
    messageDestinations: number
}

interface BackgroundTaskEventData {
    data:  BackgroundTaskData
    status: string
    task: string
    taskId: string
}

export interface BackgroundTaskEvent {
    data: BackgroundTaskEventData
    type: string
}
