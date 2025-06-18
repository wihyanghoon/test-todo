import {
  addItem,
  deleteItem,
  clearCompletedItems,
  reorderItems,
  TodoItem,
} from '../src/ts/main';

describe('Todo Logic', () => {
  let base: TodoItem[];

  beforeEach(() => {
    base = [
      { text: 'A', completed: false },
      { text: 'B', completed: true },
      { text: 'C', completed: false },
    ];
  });

  it('adds a new item', () => {
    const result = addItem(base, 'D');
    expect(result).toHaveLength(4);
    expect(result[3]).toEqual({ text: 'D', completed: false });
  });

  it('deletes an item', () => {
    const result = deleteItem(base, 1);
    expect(result).toHaveLength(2);
    expect(result[1].text).toBe('C');
  });

  it('clears completed items', () => {
    const result = clearCompletedItems(base);
    expect(result).toHaveLength(2);
    expect(result.some((i) => i.completed)).toBe(false);
  });

  it('reorders items', () => {
    const result = reorderItems(base, 0, 2);
    expect(result[2].text).toBe('A');
  });
});
