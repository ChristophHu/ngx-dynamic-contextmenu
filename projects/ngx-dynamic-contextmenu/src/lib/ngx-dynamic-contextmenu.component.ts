import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MenuItem } from './models/menuitem.model';
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
export class NgxDynamicContextmenuComponent {
  @ViewChild('ctxMenu') ctxMenu: any
  isOpen = false

  innerHeight: number = window.innerHeight
  innerWidth: number = window.innerWidth

  items: MenuItem[] = [
    { id: '1', label: 'Back', icon: 'dot', shortcut: 'Strg + R', action: '1' },
    { id: '2', label: 'Forward', icon: 'dots', shortcut: 'Strg + F', action: '2' },
    { id: '3', label: 'Teilen', devider: true, items: [
      { id: '31', label: 'Facebook', icon: 'brand-facebook', shortcut: 'Strg + R', action: '3' },
      { id: '32', label: 'Instagram', icon: 'brand-instagram', shortcut: 'Strg + I', action: '4' }
    ]},
    { id: '4', label: 'Forward', icon: 'dots', shortcut: 'Strg + F', action: '5' },

  ]

  constructor(private elementRef: ElementRef) {}

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

  runaction(item: MenuItem) {
    console.log(item)
    // if (item.action) item.action()
  }
}
