import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ContextItem } from './models/context-item.model';
import { NgxIconsComponent } from '@christophhu/ngx-icons';

@Component({
  selector: 'ngx-dynamic-contextmenu',
  standalone: true,
  imports: [
    CommonModule,
    NgxIconsComponent
  ],
  templateUrl: './ngx-dynamic-contextmenu.component.html',
  styleUrls: ['./ngx-dynamic-contextmenu.component.sass']
})
export class NgxDynamicContextmenuComponent implements AfterViewInit {
  @ViewChild('ctxMenu') ctxMenu: any
  @Input() items: ContextItem[] = []
  @Output() action: EventEmitter<any> = new EventEmitter<any>()

  isOpen = false

  innerHeight: number = window.innerHeight
  innerWidth: number = window.innerWidth

  constructor() {

  }

  ngAfterViewInit(): void {
    this.items.forEach(item => {
      if (item.class) {
        let el = document.getElementById(item.id)
        if (el) {
          // el.classList.replace('item', item.class + ' item', )
          // el.classList.remove('item')
          // el.classList.add(item.class)
        }
      }
    })
  }

  ngOnInit(): void {

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
    } else {
      this.ctxMenuClose()
    }
    event.preventDefault()
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('Key pressed:', event.key);
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
