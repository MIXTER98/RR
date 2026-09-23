import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';


@Component({
  imports: [RouterOutlet, RouterLink, MatIconModule],
  standalone: true,
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('RYR');
}
