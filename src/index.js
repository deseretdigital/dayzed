import Dayzed from './Dayzed';
import BaseDatePicker from './BaseDatePicker';
import DatePicker from './DatePicker';
import MultiDatePicker from './MultiDatePicker';
import RangeDatePicker from './RangeDatePicker';
import {
  dayzedPropTypes,
  baseDatePickerPropTypes,
  datePickerPropTypes,
  multiDatePickerPropTypes,
  rangeDatePickerPropTypes
} from './propTypes';

/*
 * Fix importing in typescript after rollup compilation
 * https://github.com/rollup/rollup/issues/1156
 * https://github.com/Microsoft/TypeScript/issues/13017#issuecomment-268657860
 */
Dayzed.default = Dayzed;

export {
  BaseDatePicker,
  DatePicker,
  MultiDatePicker,
  RangeDatePicker,
  dayzedPropTypes,
  baseDatePickerPropTypes,
  datePickerPropTypes,
  multiDatePickerPropTypes,
  rangeDatePickerPropTypes
};
export default Dayzed;
