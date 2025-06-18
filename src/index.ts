import './index.css';

interface TodoItem {
  text: string;
  completed: boolean;
}

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

  const itemList: TodoItem[] = [];
  let filterMode: 'all' | 'active' | 'completed' = 'all';

  const setEvent = () => {
    containerEl?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      // 삭제
      if (target.classList.contains('delete_btn')) {
        const itemEl = target.closest('.todo_item') as HTMLElement | null;
        const index = itemEl?.dataset.itemIndex;
        if (index) {
          onDeleteItem(Number(index));
        }
        return;
      }

      // 완료 처리
      const itemEl = target.closest('.todo_item') as HTMLElement | null;
      if (itemEl && target.tagName !== 'BUTTON') {
        const index = itemEl.dataset.itemIndex;
        if (index !== undefined) {
          itemList[Number(index)].completed =
            !itemList[Number(index)].completed;
          renderItem();
        }
      }
    });

    inputEl?.addEventListener('keydown', (e) => {
      const target = e.target as HTMLInputElement;
      if (e.key === 'Enter' && target.value.trim()) {
        onAddItem(target.value.trim());
        target.value = '';
      }
    });

    statusEl?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('show_all_btn')) {
        filterMode = 'all';
        statusEl.dataset.mode = 'all';
        renderItem();
      } else if (target.classList.contains('show_active_btn')) {
        filterMode = 'active';
        statusEl.dataset.mode = 'active';
        renderItem();
      } else if (target.classList.contains('show_completed_btn')) {
        filterMode = 'completed';
        statusEl.dataset.mode = 'completed';
        renderItem();
      } else if (target.textContent === 'Clear Completed') {
        clearCompleted();
      }
    });

    todoListEl?.addEventListener('dragstart', (e) => {
      const li = (e.target as HTMLElement).closest('.todo_item') as HTMLElement;
      if (li) {
        dragStartIndex = Number(li.dataset.itemIndex);
      }
    });

    todoListEl?.addEventListener('dragover', (e) => {
      e.preventDefault(); // drop 허용
    });

    todoListEl?.addEventListener('drop', (e) => {
      e.preventDefault();
      const dropLi = (e.target as HTMLElement).closest(
        '.todo_item'
      ) as HTMLElement;
      if (dropLi && dragStartIndex !== null) {
        const dropIndex = Number(dropLi.dataset.itemIndex);
        reorderItems(dragStartIndex, dropIndex);
        dragStartIndex = null;
      }
    });
  };

  const onAddItem = (text: string) => {
    itemList.push({ text, completed: false });
    renderItem();
  };

  const onDeleteItem = (index: number) => {
    itemList.splice(index, 1);
    renderItem();
  };

  const clearCompleted = () => {
    for (let i = itemList.length - 1; i >= 0; i--) {
      if (itemList[i].completed) {
        itemList.splice(i, 1);
      }
    }
    renderItem();
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
      const realIndex = itemList.indexOf(item); // 원본 index
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

    updateStatus();
  };

  const updateStatus = () => {
    const leftCount = itemList.filter((item) => !item.completed).length;
    const span = statusEl?.querySelector('span');
    if (span) span.textContent = `${leftCount}`;
  };

  const reorderItems = (from: number, to: number) => {
    const [moved] = itemList.splice(from, 1);
    itemList.splice(to, 0, moved);
    renderItem();
  };

  const init = () => {
    setEvent();
  };

  init();
})();
