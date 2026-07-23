import { Component, computed, inject, signal } from '@angular/core';
import { TodoService } from '../../../core/services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

type Filter = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  private readonly todoService = inject(TodoService);

  readonly filter = signal<Filter>('all');

  readonly todos = computed(() => {
    const todos = this.todoService.todos();
    switch (this.filter()) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  });

  setFilter(filter: Filter): void {
    this.filter.set(filter);
  }
}
