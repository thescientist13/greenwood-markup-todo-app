import { html, repeat, when} from '@beforesemicolon/markup';
import { 
  todoList, 
  createTodo, 
  todoListLoading, 
  deleteTodo, 
  updateTodo, 
  TodoStatus 
} from './state-stores/todos.js';
import { TodoItem } from './components/todo-item/todo-item.js';
import { Button } from './components/button/button.js';
import style from './app.css' with { type: 'css' };

document.adoptedStyleSheets = [...document.adoptedStyleSheets, style];

const App = () => {
  const createTodoBtn = Button({
    content: 'Create Todo',
    cta: true,
    onClick: () => {
      const name = window.prompt('Enter todo name:');

      if (name && name.trim()) {
        createTodo(name);
      }
    },
  });

  const handleDeleteTodo = async (item) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}"?`
    );

    if (confirmed) {
      deleteTodo(item.id);
    }
  };

  const handleEditTodo = async (item) => {
    const name = window.prompt('Update todo name:', item.name);
    const description = window.prompt(
      'Update todo description:',
      item.description
    );

    updateTodo(item.id, {
      name,
      description,
    });
  };

  return html`
    <header>
      <h1>Todo App</h1>
      ${createTodoBtn}
    </header>
    <div class="todo-items-container">
      ${repeat(
        todoList,
        // render each item
        (item) =>
          TodoItem({
            item,
            onDelete: handleDeleteTodo,
            onEdit: handleEditTodo,
            onComplete: () => updateTodo(item.id, {
              status: TodoStatus.Completed,
            }),
            onMoveToProgress: () => updateTodo(item.id, {
              status: TodoStatus.InProgress,
            })
          }),
        // handle empty list
        () => html`${when(
          todoListLoading,
          html`<p>Loading...</p>`,
          html`<p>No Items</p>`
        )}`
      )}
    </div>
  `;
};

App().render(document.getElementById('app'));