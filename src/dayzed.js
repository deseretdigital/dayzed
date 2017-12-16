import React from "react";
import PropTypes from "prop-types";

import {
  composeEventHandlers,
  requiredProp,
  unwrapChildrenForPreact,
  subtractMonth,
  addMonth,
  isBackDisabled,
  isForwardDisabled,
  getCalendars
} from "./utils";

class Dayzed extends React.Component {
  /*------------------------- React Component Lifecycle Methods ---*/

  render() {
    let calendars = getCalendars(this.props);
    let children = unwrapChildrenForPreact(this.props.children);
    return children({
      calendars,
      getDateProps: this.getDateProps,
      getBackProps: this.getBackProps,
      getForwardProps: this.getForwardProps
    });
  }

  /*------------------------- Prop Getters ---*/

  getBackProps = (
    {
      onClick,
      offset = 1,
      calendars = requiredProp("getBackProps", "calendars"),
      ...rest
    } = {}
  ) => {
    let { minDate, offset: offsetMonth, onOffsetChanged } = this.props;
    return {
      onClick: composeEventHandlers(onClick, () => {
        onOffsetChanged(
          offsetMonth - subtractMonth({ calendars, offset, minDate })
        );
      }),
      disabled: isBackDisabled({ calendars, offset, minDate }),
      "aria-label": `Go back ${offset} month${offset === 1 ? "" : "s"}`,
      ...rest
    };
  };

  getForwardProps = (
    {
      onClick,
      offset = 1,
      calendars = requiredProp("getForwardProps", "calendars"),
      ...rest
    } = {}
  ) => {
    let { maxDate, offset: offsetMonth, onOffsetChanged } = this.props;
    return {
      onClick: composeEventHandlers(onClick, () => {
        onOffsetChanged(offsetMonth + addMonth({ calendars, offset, maxDate }));
      }),
      disabled: isForwardDisabled({ calendars, offset, maxDate }),
      "aria-label": `Go forward ${offset} month${offset === 1 ? "" : "s"}`,
      ...rest
    };
  };

  getDateProps = (
    {
      onClick,
      dateObj = requiredProp("getDateProps", "dateObj"),
      ...rest
      // onMouseEnter
    } = {}
  ) => {
    return {
      onClick: composeEventHandlers(onClick, () => {
        this.props.onDateSelected(dateObj);
      }),
      disabled: !dateObj.selectable,
      "aria-label": dateObj.date.toDateString(),
      "aria-pressed": dateObj.selected,
      role: "button",
      // Looking to do something for range selection in the futre.
      // Range selection can still work, this would just make
      // styling dates in between those ranges easier.
      // onMouseEnter: composeEventHandlers(onMouseEnter, () => {
      //   // For date range selection
      // }),
      ...rest
    };
  };
}

Dayzed.defaultProps = {
  date: new Date(),
  monthsToDisplay: 1,
  selected: null
};

Dayzed.propTypes = {
  date: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  monthsToDisplay: PropTypes.number,
  offset: PropTypes.number.isRequired,
  onDateSelected: PropTypes.func.isRequired,
  onOffsetChanged: PropTypes.func,
  selected: PropTypes.oneOfType([
    PropTypes.arrayOf(Date),
    PropTypes.instanceOf(Date),
    PropTypes.oneOf([null, undefined, ""])
  ])
};

export default Dayzed;
