import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { ContextItem } from './models/context-item.model';
import { NgxIconsComponent } from '@christophhu/ngx-icons';
import { sequence, shortcut } from './helpers/shortcut';
import { Observable, map, merge, tap } from 'rxjs';
import { ContextDefaultActions } from './models/context-default-actions.model';
import { ShortcutToStringPipe } from "./pipes/shortcut-to-string.pipe";

// interface ShortcutAction {
//   [key: any]: any
// }

@Component({
  selector: 'ngx-dynamic-contextmenu',
  standalone: true,
  imports: [
    CommonModule,
    NgxIconsComponent,
    ShortcutToStringPipe
],
  templateUrl: './ngx-dynamic-contextmenu.component.html',
  styleUrls: ['./ngx-dynamic-contextmenu.component.sass']
})
export class NgxDynamicContextmenuComponent implements AfterViewInit {
  @ViewChild('ctxMenu') ctxMenu: any
  @Input() items: ContextItem[] = []
  @Input() element: any | undefined
  @Output() action: EventEmitter<any> = new EventEmitter<any>()

  isOpen = false
  isShortcutActivated = false

  shortcuts$: Observable<string> | undefined

  innerHeight: number = window.innerHeight
  innerWidth: number = window.innerWidth

  constructor() {

  }

  ngAfterViewInit(): void {
    // let sc: any[] = []
    let sc: { shortcut: any, action: any }[] = []
    this.items.forEach(item => {
      // add class to element
      if (item.class) {
        let el = document.getElementById(item.id)
        if (el) {
          el.classList.add(item.class)
        }
      }
      // add shortcuts
      if (item.shortcut) {
        sc.push({ shortcut: shortcut(item.shortcut).pipe(
          sequence()
        ), action: item.action })
      }
      // add subitem shortcuts
      if (item.items) {
        item.items.forEach(subitem => {
          if (subitem.shortcut) {
            sc.push({ shortcut: shortcut(subitem.shortcut).pipe(
              sequence()
            ), action: subitem.action })
          }
        })
      }
    })
    console.log('test', sc)
    this.shortcuts$ = merge(
      ...sc.map((s) => s.shortcut)
    )
    .pipe(
      tap((x: any) => console.log('test1', x)),
      map((arr: any) => arr.map((a: any) => a.code))
    )
    .pipe(
      tap((x: any) => console.log('test2', x))
    )
  }

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.ctxMenuClose()
    this.innerHeight = window.innerHeight
    this.innerWidth = window.innerWidth
  }
  @HostListener('document:click', ['$event']) click(event: MouseEvent) {
    this.ctxMenuClose()
  }
  @HostListener('document:blur', ['$event']) blur(event: MouseEvent) {
    this.ctxMenuClose()
  }
  @HostListener('document: contextmenu', ['$event']) rightclick(event: MouseEvent) {
    if (!this.isOpen) {
      this.ctxMenuOpen()
      var sijX = event.clientX
      var sijY = event.clientY
      if (event.clientY + this.ctxMenu.nativeElement.offsetHeight > this.innerHeight) sijY -= this.ctxMenu.nativeElement.offsetHeight;
      if (sijX + this.ctxMenu.nativeElement.offsetWidth > this.innerWidth) sijX -= this.ctxMenu.nativeElement.offsetWidth;
      this.ctxMenu.nativeElement.style.left = Math.max(sijX, 0) + 'px'
      this.ctxMenu.nativeElement.style.top = Math.max(sijY, 0) + 'px'
      this.action.emit({ id: this.element?.id, action: ContextDefaultActions.OPEN })
    } else {
      this.ctxMenuClose()
    }
    event.preventDefault()
  }

  ctxMenuClose() {
    this.isOpen = false
    this.ctxMenu.nativeElement.hidden = true
  }
  ctxMenuOpen() {
    this.isOpen = true
    this.ctxMenu.nativeElement.hidden = false
  }

  runaction(item: ContextItem) {
    if (!item.disabled) this.action.emit({ id: item.id, action: item.action })
  }
}
