export interface TodoItem {
  text: string;
  completed: boolean;
}

export const addItem = (list: TodoItem[], text: string): TodoItem[] => {
  return [...list, { text, completed: false }];
};

export const deleteItem = (list: TodoItem[], index: number): TodoItem[] => {
  return list.filter((_, i) => i !== index);
};

export const clearCompletedItems = (list: TodoItem[]): TodoItem[] => {
  return list.filter((item) => !item.completed);
};

export const reorderItems = (
  list: TodoItem[],
  from: number,
  to: number
): TodoItem[] => {
  const clone = [...list];
  const [moved] = clone.splice(from, 1);
  clone.splice(to, 0, moved);
  return clone;
};
