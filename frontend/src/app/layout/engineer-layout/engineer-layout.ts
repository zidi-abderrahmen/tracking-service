import { Component } from '@angular/core';
import { Sidebar } from "../../features/sidebar/sidebar";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-engineer-layout',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './engineer-layout.html',
  styleUrl: './engineer-layout.scss',
})
export class EngineerLayout {

}
