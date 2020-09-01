export interface IStorageTodoItem {
  uuid: string;
  title: string;
  description: string;
  priorityLabel: string;
  priority: string;
  dueDate: string;
  isDone: 'true' | 'false';
}
