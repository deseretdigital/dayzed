import {
  ReactNode,
  ReactElement,
  PropsWithChildren,
  HTMLProps,
  SyntheticEvent
} from 'react';

export interface DateObj {
  date: Date;
  nextMonth: boolean;
  prevMonth: boolean;
  selectable: boolean;
  selected: boolean;
  today: boolean;
}

export interface Calendar {
  firstDayOfMonth: Date;
  lastDayOfMonth: Date;
  month: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  weeks: Array<Array<DateObj | ''>>;
  year: number;
}

export interface GetBackForwardPropsOptions
  extends HTMLProps<HTMLButtonElement> {
  calendars: Calendar[];
  offset?: number;
}

export interface GetDatePropsOptions extends HTMLProps<HTMLButtonElement> {
  dateObj: DateObj;
}

export interface RenderProps {
  calendars: Calendar[];
  getBackProps: (data: GetBackForwardPropsOptions) => Record<string, any>;
  getForwardProps: (data: GetBackForwardPropsOptions) => Record<string, any>;
  getDateProps: (data: GetDatePropsOptions) => Record<string, any>;
}

export type RenderFn = (renderProps: RenderProps) => ReactNode;

export interface Props {
  date?: Date;
  maxDate?: Date;
  minDate?: Date;
  monthsToDisplay?: number;
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showOutsideDays?: boolean;
  selected?: Date | Date[];
  children?: RenderFn;
  render?: RenderFn;
  offset?: number;
  onOffsetChanged?(offset: number): void;
  onDateSelected(selectedDate: DateObj, event: SyntheticEvent): void;
}

export function useDayzed(
  props: Omit<Props, 'children' | 'render'>
): RenderProps;

export default function Dayzed(props: PropsWithChildren<Props>): ReactElement;
