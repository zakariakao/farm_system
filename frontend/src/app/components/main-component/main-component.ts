import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../topbar-component/topbar-component';
import { SidebarComponent } from '../sidebar-component/sidebar-component';

@Component({
  selector: 'app-main-component',
  imports: [RouterOutlet, TopbarComponent, SidebarComponent],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css',
})
export class MainComponent {

}
