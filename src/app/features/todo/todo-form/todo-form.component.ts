import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../../core/services/todo.service';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  private readonly todoService = inject(TodoService);

  readonly title = signal('');

  submit(): void {
    this.todoService.add(this.title());
    this.title.set('');
  }
}
