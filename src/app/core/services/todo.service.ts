import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly todosSignal = signal<Todo[]>([]);
  private nextId = 1;

  readonly todos = this.todosSignal.asReadonly();

  add(title: string): void {
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }
    this.todosSignal.update(todos => [
      ...todos,
      { id: this.nextId++, title: trimmed, completed: false }
    ]);
  }

  toggle(id: number): void {
    this.todosSignal.update(todos =>
      todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  }

  remove(id: number): void {
    this.todosSignal.update(todos => todos.filter(todo => todo.id !== id));
  }

  edit(id: number, title: string): void {
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }
    this.todosSignal.update(todos =>
      todos.map(todo => (todo.id === id ? { ...todo, title: trimmed } : todo))
    );
  }
}
