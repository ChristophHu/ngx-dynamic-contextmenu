import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxDynamicContextmenuComponent } from '../../../ngx-dynamic-contextmenu/src/public-api';
import { ContextItem } from '../../../ngx-dynamic-contextmenu/src/lib/models/context-item.model';
import { ContextItemClassEnum } from '../../../ngx-dynamic-contextmenu/src/lib/models/item-class.model';
import { ContextDefaultActions } from '../../../ngx-dynamic-contextmenu/src/lib/models/context-default-actions.model';
import { KeyCode } from '../../../ngx-dynamic-contextmenu/src/lib/helpers/keycodes';
import { sequence, shortcut } from '../../../ngx-dynamic-contextmenu/src/lib/helpers/shortcut';
import { Observable, map, merge, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

interface ContextActionReturn {
  id: string
  action: string
}
enum ContextActionEnum {
  DELETE = 'delete',
  EDIT = 'edit',
  SHOW = 'show',
  REFRESH = 'refresh'
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgxDynamicContextmenuComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent { 
  items: ContextItem[] = [
    { id: '1', label: 'Back', icon: 'dot', shortcut: [KeyCode.ShiftLeft, KeyCode.KeyL], disabled: true, action: ContextActionEnum.DELETE },
    { id: '2', label: 'Forward', icon: 'dots', shortcut: [KeyCode.ShiftLeft, KeyCode.KeyO], action: ContextActionEnum.EDIT },
    { id: '3', label: 'Teilen', devider: true, items: [
      { id: '31', label: 'Facebook', icon: 'brand-facebook', shortcut: [KeyCode.ShiftLeft, KeyCode.KeyD], action: ContextActionEnum.EDIT },
      { id: '32', label: 'Instagram', icon: 'brand-instagram', shortcut: [KeyCode.ShiftLeft, KeyCode.KeyI], action: ContextActionEnum.EDIT }
    ]},
    { id: '4', label: 'Forward', class: ContextItemClassEnum.INFO, icon: 'dots', shortcut: [KeyCode.ShiftLeft, KeyCode.KeyA], action: '5' }
  ]

  returnContextAction(event: ContextActionReturn) {
    switch (event.action) {
      case ContextDefaultActions.OPEN.toString():
        console.log('is open', event.id)
        break
      case ContextActionEnum.DELETE:
        console.log('delete row', event.id)
        break
      case ContextActionEnum.EDIT:
        console.log('edit row', event.id)
        break
      default:
        console.log('default contextaction', event.id)
    }
  }

  
}
