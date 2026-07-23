import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a todo', () => {
    service.add('Buy milk');

    expect(service.todos()).toEqual([{ id: 1, title: 'Buy milk', completed: false }]);
  });

  it('should not add a blank todo', () => {
    service.add('   ');

    expect(service.todos()).toEqual([]);
  });

  it('should toggle a todo', () => {
    service.add('Buy milk');
    const id = service.todos()[0].id;

    service.toggle(id);

    expect(service.todos()[0].completed).toBe(true);
  });

  it('should remove a todo', () => {
    service.add('Buy milk');
    const id = service.todos()[0].id;

    service.remove(id);

    expect(service.todos()).toEqual([]);
  });

  it('should edit a todo title', () => {
    service.add('Buy milk');
    const id = service.todos()[0].id;

    service.edit(id, 'Buy oat milk');

    expect(service.todos()[0].title).toBe('Buy oat milk');
  });

  it('should clear completed todos', () => {
    service.add('Buy milk');
    service.add('Walk the dog');
    const [first, second] = service.todos();
    service.toggle(first.id);

    service.clearCompleted();

    expect(service.todos()).toEqual([second]);
  });

  it('should persist todos to localStorage', () => {
    service.add('Buy milk');
    TestBed.flushEffects();

    const stored = JSON.parse(localStorage.getItem('todos') ?? '[]');
    expect(stored).toEqual([{ id: 1, title: 'Buy milk', completed: false }]);
  });

  it('should load todos from localStorage on init', () => {
    localStorage.setItem(
      'todos',
      JSON.stringify([{ id: 5, title: 'Existing todo', completed: false }])
    );

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const freshService = TestBed.inject(TodoService);

    expect(freshService.todos()).toEqual([{ id: 5, title: 'Existing todo', completed: false }]);
  });
});
