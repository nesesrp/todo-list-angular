import { Injectable, effect, signal } from '@angular/core';
import { Todo } from '../models/todo.model';

const STORAGE_KEY = 'todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly todosSignal = signal<Todo[]>(this.loadTodos());
  private nextId = this.todosSignal().reduce((max, todo) => Math.max(max, todo.id), 0) + 1;

  readonly todos = this.todosSignal.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todosSignal()));
    });
  }

  private loadTodos(): Todo[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

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

  clearCompleted(): void {
    this.todosSignal.update(todos => todos.filter(todo => !todo.completed));
  }
}
