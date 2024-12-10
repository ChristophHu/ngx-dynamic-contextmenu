import { Pipe, PipeTransform } from '@angular/core'
import { Key, KeyCode } from '../helpers/keycodes'

@Pipe({
  name: 'shortcutToString',
  standalone: true
})
export class ShortcutToStringPipe implements PipeTransform {

  transform(shortcut: KeyCode[] | undefined): any {
    if (shortcut) return shortcut.map((s) => Key[s as keyof typeof Key]).join(' + ')
    return ''
  }
}
