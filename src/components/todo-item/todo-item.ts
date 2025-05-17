import { html, when, is, isNot } from '@beforesemicolon/markup';
import style from './todo-item.css' with { type: 'css' };
import { Button } from '../button/button.ts';
import {TodoStatus} from '../../state-stores/todos.ts'

document.adoptedStyleSheets = [...document.adoptedStyleSheets, style];

export const TodoItem = ({
  item,
  onEdit = () => {},
  onDelete = () => {},
  onMoveToProgress = () => {},
  onComplete = () => {},
}) => {
  const editBtn = Button({
    content: 'Edit',
    onClick: () => onEdit(item),
    disabled: is(item.status, TodoStatus.Completed),
  });

  const deleteBtn = Button({
    content: 'Delete',
    onClick: () => onDelete(item),
  });

  const moveToProgressBtn = Button({
    content: 'Move to In-Progress',
    onClick: () => onMoveToProgress(item),
  });

  const markCompleteBtn = Button({
    content: 'Mark as Completed',
    cta: true,
    onClick: () => onComplete(item),
  });

  return html`
    <div class="todo-item">
      <h3>${item.name}</h3>
      <p class="description">${item.description}</p>
      <div class="action-items">
        ${when(
          is(item.status, TodoStatus.Completed), 
          moveToProgressBtn, 
          markCompleteBtn)}
        ${editBtn}
        ${deleteBtn}
      </div>
      <p class="date">
        Created at: ${item.dateCreated.toLocaleString()}
        ${when(
          isNot(item.dateCreated, item.dateLastUpdated),
          html`<div>Last updated at: ${item.dateLastUpdated.toLocaleString()}</div>`
        )}
      </p>
    </div>
  `;
};
