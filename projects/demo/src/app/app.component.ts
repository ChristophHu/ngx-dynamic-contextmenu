import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxDynamicContextmenuComponent } from '../../../ngx-dynamic-contextmenu/src/public-api';
import { ContextItem } from '../../../ngx-dynamic-contextmenu/src/lib/models/context-item.model';

interface ContextActionReturn {
  id: string
  action: string
}
enum ContextActionEnum {
  DELETE = '1',
  EDIT = '2',
  SHOW = '3',
  REFRESH = '4'
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgxDynamicContextmenuComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  items: ContextItem[] = [
    { id: '1', label: 'Back', icon: 'dot', shortcut: 'Strg + R', action: ContextActionEnum.DELETE },
    { id: '2', label: 'Forward', icon: 'dots', shortcut: 'Strg + F', action: ContextActionEnum.EDIT },
    { id: '3', label: 'Teilen', devider: true, items: [
      { id: '31', label: 'Facebook', icon: 'brand-facebook', shortcut: 'Strg + R', action: '3' },
      { id: '32', label: 'Instagram', icon: 'brand-instagram', shortcut: 'Strg + I', action: '4' }
    ]},
    { id: '4', label: 'Forward', class:"danger", icon: 'dots', shortcut: 'Strg + F', action: '5' },

  ]

  returnContextAction(event: ContextActionReturn) {
    switch (event.action) {
      case ContextActionEnum.DELETE:
        console.log('delete row')
        break
      case ContextActionEnum.EDIT:
        console.log('edit row')
        break
      default:
        console.log('default contextaction')
    }
  }
}
