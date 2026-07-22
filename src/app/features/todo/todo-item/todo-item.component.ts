import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../../core/models/todo.model';
import { TodoService } from '../../../core/services/todo.service';

@Component({
  selector: 'app-todo-item',
  imports: [FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  private readonly todoService = inject(TodoService);

  readonly todo = input.required<Todo>();

  readonly isEditing = signal(false);
  readonly editedTitle = signal('');

  toggle(): void {
    this.todoService.toggle(this.todo().id);
  }

  remove(): void {
    this.todoService.remove(this.todo().id);
  }

  startEdit(): void {
    this.editedTitle.set(this.todo().title);
    this.isEditing.set(true);
  }

  saveEdit(): void {
    this.todoService.edit(this.todo().id, this.editedTitle());
    this.isEditing.set(false);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
  }
}
