import * as React from 'react';
import { render } from 'react-dom';
import Dayzed, { DateObj, useDayzed } from './dayzed';

interface State {
  selectedDate: Date;
  monthOffset: number;
}

class App extends React.Component<{}, State> {
  state = {
    selectedDate: new Date(),
    monthOffset: 0
  };

  handleSetDate = (dateObj: DateObj, _: React.SyntheticEvent) => {
    this.setState({ selectedDate: dateObj.date });
  };

  render() {
    return (
      <Dayzed
        selected={this.state.selectedDate}
        offset={this.state.monthOffset}
        onDateSelected={this.handleSetDate}
      >
        {({ calendars, getDateProps, getBackProps, getForwardProps }) => (
          <>
            <button
              {...getBackProps({
                calendars,
                offset: 6,
                style: { backgroundColor: 'blue' }
              })}
            ></button>
            <button
              {...getForwardProps({
                calendars,
                offset: 6,
                style: { backgroundColor: 'blue' }
              })}
            ></button>
            {calendars.map(cal => (
              <div>
                Calendar:
                {cal.weeks.map(week => (
                  <div>
                    Week:
                    {week.map(
                      day =>
                        day && (
                          <span
                            {...getDateProps({
                              dateObj: day,
                              style: { backgroundColor: 'blue' }
                            })}
                          >
                            Day({day.date.getDate()}):
                          </span>
                        )
                    )}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </Dayzed>
    );
  }
}

const HookApp = () => {
  const selectedDate = new Date();
  const { calendars, getDateProps, getBackProps, getForwardProps } = useDayzed({
    date: selectedDate,
    onDateSelected: () => {}
  });
  return (
    <>
      <button
        {...getBackProps({
          calendars,
          offset: 6,
          style: { backgroundColor: 'blue' }
        })}
      ></button>
      <button
        {...getForwardProps({
          calendars,
          offset: 6,
          style: { backgroundColor: 'blue' }
        })}
      ></button>
      {calendars.map(calendar => (
        <div>
          {calendar.weeks.map((week, windex) =>
            week.map((dateObj, index) => {
              const key = `${calendar.month}${calendar.year}${windex}${index}`;
              if (!dateObj) return null;

              const { date } = dateObj;
              return (
                <button
                  key={key}
                  {...getDateProps({
                    dateObj,
                    style: { backgroundColor: 'blue' }
                  })}
                >
                  {date.getDate()}
                </button>
              );
            })
          )}
        </div>
      ))}
    </>
  );
};

render(
  <>
    <App />
    <HookApp />
  </>,
  document.body
);
