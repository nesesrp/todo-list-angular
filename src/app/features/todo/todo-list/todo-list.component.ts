import { Component, inject } from '@angular/core';
import { TodoService } from '../../../core/services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  private readonly todoService = inject(TodoService);

  readonly todos = this.todoService.todos;
}
