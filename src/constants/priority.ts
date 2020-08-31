export enum PRIORITYS_LABELS {
  LABEL_1 = '우선순위 1',
  LABEL_2 = '우선순위 2',
  LABEL_3 = '우선순위 3',
  LABEL_4 = '우선순위 4'
}

export enum PRIORITYS_VALUES {
  VALUE_1 = 1,
  VALUE_2 = 2,
  VALUE_3 = 3,
  VALUE_4 = 4
}

export interface PriorityItem {
  label: PRIORITYS_LABELS | string;
  value: PRIORITYS_VALUES | number;
}

export const PRIORITYS: ReadonlyArray<PriorityItem> = [
  {
    label: PRIORITYS_LABELS.LABEL_1,
    value: PRIORITYS_VALUES.VALUE_1
  },
  {
    label: PRIORITYS_LABELS.LABEL_2,
    value: PRIORITYS_VALUES.VALUE_2
  },
  {
    label: PRIORITYS_LABELS.LABEL_3,
    value: PRIORITYS_VALUES.VALUE_3
  },
  {
    label: PRIORITYS_LABELS.LABEL_4,
    value: PRIORITYS_VALUES.VALUE_4
  }
]
