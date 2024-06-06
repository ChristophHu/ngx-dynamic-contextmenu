import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxDynamicContextmenuComponent } from '../../../ngx-dynamic-contextmenu/src/public-api';

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
  
}
