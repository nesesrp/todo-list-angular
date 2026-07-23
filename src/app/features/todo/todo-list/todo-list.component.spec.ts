import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoService } from '../../../core/services/todo.service';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [TodoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show only active todos when filtered by active', () => {
    todoService.add('Buy milk');
    todoService.add('Walk the dog');
    todoService.toggle(todoService.todos()[0].id);

    component.setFilter('active');

    expect(component.todos().map(todo => todo.title)).toEqual(['Walk the dog']);
  });

  it('should show only completed todos when filtered by completed', () => {
    todoService.add('Buy milk');
    todoService.add('Walk the dog');
    todoService.toggle(todoService.todos()[0].id);

    component.setFilter('completed');

    expect(component.todos().map(todo => todo.title)).toEqual(['Buy milk']);
  });

  it('should report whether any todo is completed', () => {
    todoService.add('Buy milk');
    expect(component.hasCompleted()).toBe(false);

    todoService.toggle(todoService.todos()[0].id);
    expect(component.hasCompleted()).toBe(true);
  });

  it('should clear completed todos', () => {
    todoService.add('Buy milk');
    todoService.add('Walk the dog');
    todoService.toggle(todoService.todos()[0].id);

    component.clearCompleted();

    expect(todoService.todos().map(todo => todo.title)).toEqual(['Walk the dog']);
  });
});
