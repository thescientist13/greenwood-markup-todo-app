import { state } from '@beforesemicolon/markup';

export const TodoStatus = {
  Pending: 'pending',
  InProgress: 'in-progress',
  Completed: 'completed',
};

const [todos, updateTodos] = state([]);
const [loading, updateLoading] = state(true); // wait for loading from local storage

// load initial todos
updateTodos(
  Object.keys({ ...localStorage }).reduce((acc, key) => {
    if (/--todo-[a-z0-9-]{36}--/.test(key)) {
      const parsedTodo = JSON.parse(localStorage.getItem(key) ?? '{}');

      acc.push({
        ...parsedTodo,
        dateCreated: new Date(parsedTodo.dateCreated),
        dateLastUpdated: new Date(parsedTodo.dateLastUpdated),
      });
    }

    return acc;
  }, [])
);

updateLoading(false);

const todoLocalstorageKey = (id) => `--todo-${id}--`;

export const todoList = todos;
export const todoListLoading = loading;

export const createTodo = (name) => {
  if (typeof name === 'string' && name.trim().length) {
    const dateCreated = new Date();
    const todo = {
      id: crypto.randomUUID(),
      name,
      description: 'No Description',
      status: TodoStatus.Pending,
      dateCreated,
      dateLastUpdated: dateCreated,
    };

    localStorage.setItem(todoLocalstorageKey(todo.id), JSON.stringify(todo));

    updateTodos((prev) => [...prev, todo]);
  } else {
    throw new Error(`Invalid todo name. Name must be a non-empty string`);
  }
};

export const updateTodo = (id, data) => {
  updateTodos((prev) =>
    prev.map((todo) => {
      if (todo.id === id) {
        const updatedTodo = {
          ...todo,
          name: data.name ?? todo.name,
          description: data.description ?? todo.description,
          status: data.status ?? todo.status,
          dateLastUpdated: new Date(),
        };

        localStorage.setItem(
          todoLocalstorageKey(todo.id),
          JSON.stringify(updatedTodo)
        );

        return updatedTodo;
      }

      return todo;
    })
  );
};

export const deleteTodo = (id) => {
  updateTodos((prev) =>
    prev.filter((todo) => {
      return todo.id !== id;
    })
  );
  localStorage.removeItem(todoLocalstorageKey(id));
};

export const clearTodos = () => {
  updateTodos([]);
  Object.keys({ ...localStorage }).forEach((key) => {
    if (/--todo-[a-z0-9-]{36}--/.test(key)) {
      localStorage.removeItem(key);
    }
  });
};
