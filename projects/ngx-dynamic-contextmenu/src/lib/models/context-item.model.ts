import { KeyCode } from "../helpers/keycodes"
import { ContextDefaultActions } from "./context-default-actions.model"
import { ContextItemClassEnum } from "./item-class.model"

/**
 * This is the description of the interface
 *
 * @interface ContextItem
 * @param {string} id is used for whatever reason
 * @param {string} label is used for whatever reason
 * @param {any} action is used for whatever reason
 * @param {ContextItemClassEnum} [class] is used for whatever reason
 * @param {boolean} [devider] is used for whatever reason
 * @param {boolean} [disabled] is used for whatever reason
 * @param {boolean} [hidden] is used for whatever reason
 * @param {string} [icon] is used for whatever reason
 * @param {ContextItem[]} [items] The optional items adding a new submenu.
 * @param {string} [shortcut] is used for whatever reason
 */
export interface ContextItem {
    /** The id is used to identify the item. */
    id: string
    /** The label is the shown label of the item in the context-menu. */
    label: string
    /** The action is an optional output of the item by clicking the context-menu-item. */
    action?: ContextDefaultActions | any
    /** The optional class is used to style the context-menu-item. */
    class?: ContextItemClassEnum
    /** The optional devider devides the context-menu-item to the item above. */
    devider?: boolean
    /** Disabled items can't be clicked. */
    disabled?: boolean
    /** Hidden items are invisible. */
    hidden?: boolean
    /** The optional icons are placed on the left side of the items. */
    icon?: string
    /** The optional items are generation an new submenu. */
    items?: ContextItem[]
    /** The optional shortcuts show the keys to be pressed. */
    shortcut?: KeyCode[]
}