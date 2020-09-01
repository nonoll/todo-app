import { PRIORITYS_LABELS, PRIORITYS_VALUES } from '@/constants/todo'

export interface ITodoItem {
  uuid: string;
  createdAt: Date | null;
  title: string;
  description: string;
  priorityLabel: PRIORITYS_LABELS | string;
  priority: PRIORITYS_VALUES | number;
  dueDate: Date | string;
  isDone: boolean;
  isVisible: boolean;
}
