export interface ResType<T> {
    code: number
    data?: T
    msg: string
    err?: string
}

export interface Http {
    get<T>(url: string, params?: unknown): Promise<ResType<T>>
    post<T>(url: string, params?: unknown): Promise<ResType<T>>
    upload<T>(url: string, params: unknown): Promise<ResType<T>>
    download(url: string): void
}