export interface ContextItem {
    id: string
    label: string
    action?: any
    devider?: boolean
    shortcut?: string
    disabled?: boolean
    hidden?: boolean
    icon?: string
    items?: ContextItem[]
}