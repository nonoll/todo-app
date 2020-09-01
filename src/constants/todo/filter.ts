export enum FILTER_LABELS {
  ALL = '전체',
  PRIORITY = '우선순위',
  DUE_DATE = '마감기한',
  DONE = '완료'
}

export enum FILTER_VALUES {
  ALL = 'ALL',
  PRIORITY = 'PRIORITY',
  DUE_DATE = 'DUE_DATE',
  DONE = 'DONE'
}

export interface FilterItem {
  label: FILTER_LABELS | string;
  value: FILTER_VALUES | number;
}

export const FILTERS: ReadonlyArray<FilterItem> = [
  {
    label: FILTER_LABELS.ALL,
    value: FILTER_VALUES.ALL
  },
  {
    label: FILTER_LABELS.PRIORITY,
    value: FILTER_VALUES.PRIORITY
  },
  {
    label: FILTER_LABELS.DUE_DATE,
    value: FILTER_VALUES.DUE_DATE
  },
  {
    label: FILTER_LABELS.DONE,
    value: FILTER_VALUES.DONE
  }
]

export const DefaultFilter: FilterItem = {
  value: FILTER_VALUES.ALL,
  label: FILTER_LABELS.ALL
} as const
