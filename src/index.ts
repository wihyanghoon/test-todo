import '../index.css';

import './index.css';
import {
  addItem,
  deleteItem,
  clearCompletedItems,
  reorderItems,
  TodoItem,
} from './ts/main';

(() => {
  const containerEl = document.querySelector(
    '.main_container'
  ) as HTMLDivElement | null;
  const inputEl = document.querySelector(
    '.search_input'
  ) as HTMLInputElement | null;
  const todoListEl = document.querySelector(
    '.todo_list'
  ) as HTMLUListElement | null;
  const statusEl = document.querySelector(
    '.status_wrap'
  ) as HTMLDivElement | null;

  let dragStartIndex: number | null = null;
  let itemList: TodoItem[] = [];
  let filterMode: 'all' | 'active' | 'completed' = 'all';

  const setEvent = () => {
    containerEl?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains('delete_btn')) {
        const itemEl = target.closest('.todo_item') as HTMLElement | null;
        const index = itemEl?.dataset.itemIndex;
        if (index) {
          itemList = deleteItem(itemList, Number(index));
          renderItem();
        }
        return;
      }

      const itemEl = target.closest('.todo_item') as HTMLElement | null;
      if (itemEl && target.tagName !== 'BUTTON') {
        const index = itemEl.dataset.itemIndex;
        if (index !== undefined) {
          const idx = Number(index);
          itemList[idx].completed = !itemList[idx].completed;
          renderItem();
        }
      }
    });

    inputEl?.addEventListener('keydown', (e) => {
      const target = e.target as HTMLInputElement;
      if (e.key === 'Enter' && target.value.trim()) {
        itemList = addItem(itemList, target.value.trim());
        target.value = '';
        renderItem();
      }
    });

    statusEl?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('show_all_btn')) {
        filterMode = 'all';
        statusEl.dataset.mode = 'all';
      } else if (target.classList.contains('show_active_btn')) {
        filterMode = 'active';
        statusEl.dataset.mode = 'active';
      } else if (target.classList.contains('show_completed_btn')) {
        filterMode = 'completed';
        statusEl.dataset.mode = 'completed';
      } else if (target.textContent === 'Clear Completed') {
        itemList = clearCompletedItems(itemList);
      }
      renderItem();
    });

    todoListEl?.addEventListener('dragstart', (e) => {
      const li = (e.target as HTMLElement).closest('.todo_item') as HTMLElement;
      if (li) dragStartIndex = Number(li.dataset.itemIndex);
    });

    todoListEl?.addEventListener('dragover', (e) => e.preventDefault());

    todoListEl?.addEventListener('drop', (e) => {
      e.preventDefault();
      const dropLi = (e.target as HTMLElement).closest(
        '.todo_item'
      ) as HTMLElement;
      if (dropLi && dragStartIndex !== null) {
        const dropIndex = Number(dropLi.dataset.itemIndex);
        itemList = reorderItems(itemList, dragStartIndex, dropIndex);
        dragStartIndex = null;
        renderItem();
      }
    });
  };

  const renderItem = () => {
    if (!todoListEl) return;

    todoListEl.innerHTML = '';

    const filtered = itemList.filter((item) => {
      if (filterMode === 'active') return !item.completed;
      if (filterMode === 'completed') return item.completed;
      return true;
    });

    filtered.forEach((item) => {
      const realIndex = itemList.indexOf(item);
      todoListEl.insertAdjacentHTML(
        'beforeend',
        `<li class="todo_item ${item.completed ? 'completed' : ''}" data-item-index="${realIndex}" draggable="true">
          <div class="todo_item_wrap">
            <span>${item.text}</span>
            <button class="delete_btn">삭제</button>
          </div>
        </li>`
      );
    });

    const leftCount = itemList.filter((item) => !item.completed).length;
    const span = statusEl?.querySelector('span');
    if (span) span.textContent = `${leftCount}`;
  };

  const init = () => {
    setEvent();
  };

  init();
})();
