import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chatbot } from './chatbot/chatbot';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Chatbot],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class AppComponent {
  title = signal('finance-chatbot');
}
