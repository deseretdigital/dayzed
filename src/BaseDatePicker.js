import React from 'react';
import Dayzed from './Dayzed';
import { getArrowKeyHandlers } from './utils';
import { baseDatePickerPropTypes } from './propTypes';

class BaseDatePicker extends React.Component {
  handleArrowKeys = getArrowKeyHandlers({
    left: () => {
      this.getKeyOffset(-1);
    },
    right: () => {
      this.getKeyOffset(1);
    },
    up: () => {
      this.getKeyOffset(-7);
    },
    down: () => {
      this.getKeyOffset(7);
    }
  });

  getKeyOffset(number) {
    const e = document.activeElement;
    const buttons = this.rootNode.querySelectorAll('button');
    buttons.forEach((el, i) => {
      const newNodeKey = i + number;
      if (el === e) {
        if (newNodeKey <= buttons.length - 1 && newNodeKey >= 0) {
          buttons[newNodeKey].focus();
        } else {
          buttons[0].focus();
        }
      }
    });
  }

  setRootNode = ref => {
    this.rootNode = ref;
  };

  getRootProps = ({ refKey = 'ref', ...rest } = {}) => {
    return {
      [refKey]: this.setRootNode,
      onKeyDown: this.handleArrowKeys,
      ...rest
    };
  };

  render() {
    const { children: childrenFn, render, ...rest } = this.props;
    const children = render || childrenFn;

    return (
      <Dayzed
        {...rest}
        render={renderProps =>
          children({
            ...renderProps,
            getRootProps: this.getRootProps
          })
        }
      />
    );
  }
}

BaseDatePicker.propTypes = baseDatePickerPropTypes;

export default BaseDatePicker;
