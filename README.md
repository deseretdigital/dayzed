# dayzed

Primitives to build simple, flexible, WAI-ARIA compliant React date-picker
components.

[![version][version-badge]][package] [![MIT License][license-badge]][license]
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors)

[![Supports React and Preact][react-badge]][react]
[![size][size-badge]][unpkg-dist] [![gzip size][gzip-badge]][unpkg-dist]
[![module formats: umd, cjs, and es][module-formats-badge]][unpkg-dist]

## The problem

You need a date-picker in your application that is accessible, can fit a number
of use cases (single date, multi date, range), and has styling and layout that
can be easily extended.

## This solution

This is a component that focuses on controlling user interactions so you can
focus on creating beautiful, accessible, and useful date-pickers. It uses a
custom [Hook][react-hooks] or a [render function as
children][render-function-as-children]. This means you are responsible for
rendering everything, but props are provided by the Hook or render function,
through a pattern called [prop getters][prop-getters], which can be used to help
enhance what you are rendering.

This differs from other solutions which render things for their use case and
then expose many options to allow for extensibility resulting in a bigger API
that is less flexible as well as making the implementation more complicated and
harder to contribute to.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
  - [date](#date)
  - [maxDate](#maxdate)
  - [minDate](#mindate)
  - [monthsToDisplay](#monthstodisplay)
  - [firstDayOfWeek](#firstdayofweek)
  - [showOutsideDays](#showoutsidedays)
  - [selected](#selected)
  - [onDateSelected](#ondateselected)
  - [render](#render)
  - [offset](#offset)
  - [onOffsetChanged](#onoffsetchanged)
- [Control Props](#control-props)
- [Custom Hook](#custom-hook)
- [Render Prop Function](#render-prop-function)
  - [prop getters](#prop-getters)
  - [state](#state)
- [Inspiration and Thanks!](#inspiration-and-thanks)
- [Other Solutions](#other-solutions)
- [Contributors](#contributors)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save dayzed
```

Or, you can install this module through the [yarn][yarn] package manager.

```
yarn add dayzed
```

> This package also depends on `react@>=16.8.0` and `prop-types`. Please make
> sure you have those installed as well.

> Note also this library supports `preact@>=10` out of the box. If you are using
> `preact` then use the corresponding module in the `preact/dist` folder. You
> can even `import Dayzed from 'dayzed/preact'` or
> `import { useDayzed } from 'dayzed/preact'`

## Usage

```jsx
import React from 'react';
import Dayzed, { useDayzed } from 'dayzed';

const monthNamesShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];
const weekdayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Calendar({ calendars, getBackProps, getForwardProps, getDateProps }) {
  if (calendars.length) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div>
          <button {...getBackProps({ calendars })}>Back</button>
          <button {...getForwardProps({ calendars })}>Next</button>
        </div>
        {calendars.map(calendar => (
          <div
            key={`${calendar.month}${calendar.year}`}
            style={{
              display: 'inline-block',
              width: '50%',
              padding: '0 10px 30px',
              boxSizing: 'border-box'
            }}
          >
            <div>
              {monthNamesShort[calendar.month]} {calendar.year}
            </div>
            {weekdayNamesShort.map(weekday => (
              <div
                key={`${calendar.month}${calendar.year}${weekday}`}
                style={{
                  display: 'inline-block',
                  width: 'calc(100% / 7)',
                  border: 'none',
                  background: 'transparent'
                }}
              >
                {weekday}
              </div>
            ))}
            {calendar.weeks.map((week, weekIndex) =>
              week.map((dateObj, index) => {
                let key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                if (!dateObj) {
                  return (
                    <div
                      key={key}
                      style={{
                        display: 'inline-block',
                        width: 'calc(100% / 7)',
                        border: 'none',
                        background: 'transparent'
                      }}
                    />
                  );
                }
                let { date, selected, selectable, today } = dateObj;
                let background = today ? 'cornflowerblue' : '';
                background = selected ? 'purple' : background;
                background = !selectable ? 'teal' : background;
                return (
                  <button
                    style={{
                      display: 'inline-block',
                      width: 'calc(100% / 7)',
                      border: 'none',
                      background
                    }}
                    key={key}
                    {...getDateProps({ dateObj })}
                  >
                    {selectable ? date.getDate() : 'X'}
                  </button>
                );
              })
            )}
          </div>
        ))}
      </div>
    );
  }
  return null;
}

/*----------- Render Prop -----------*/

class Datepicker extends React.Component {
  render() {
    return (
      <Dayzed
        onDateSelected={this.props.onDateSelected}
        selected={this.props.selected}
        render={dayzedData => <Calendar {...dayzedData} />}
      />
    );
  }
}

///////////////////////////////////////
// OR
///////////////////////////////////////

/*----------- Custom Hook -----------*/

function Datepicker(props) {
  let dayzedData = useDayzed(props);
  return <Calendar {...dayzedData} />;
}

class Single extends React.Component {
  state = { selectedDate: null };

  _handleOnDateSelected = ({ selected, selectable, date }) => {
    this.setState(state => ({ selectedDate: date }));
  };

  render() {
    let { selectedDate } = this.state;
    return (
      <div>
        <Datepicker
          selected={this.state.selectedDate}
          onDateSelected={this._handleOnDateSelected}
        />
        {this.state.selectedDate && (
          <div style={{ paddingTop: 20, textAlign: 'center' }}>
            <p>Selected:</p>
            <p>{`${selectedDate.toLocaleDateString()}`}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Single;
```

## Props

### date

> `date` | defaults to `new Date()`

Used to calculate what month to display on initial render.

### maxDate

> `date` | optional

Used to calculate the maximum month to render.

### minDate

> `date` | optional

Used to calculate the minimum month to render.

### monthsToDisplay

> `number` | defaults to `1`

Number of months returned, based off the `date` and `offset` props.

### firstDayOfWeek

> `number` | defaults to `0`

First day of the week with possible values 0-6 (Sunday to Saturday). Defaults to
Sunday.

### showOutsideDays

> `boolean` | defaults to false

Flag to fill front and back weeks with dates from adjacent months.

### selected

> `any` | optional

An array of `Date`s or a single `Date` that has been selected.

### onDateSelected

> `function(selectedDate: Date, event: Event)` | _required_

Called when the user selects a date.

- `selectedDate`: The date that was just selected.
- `event`: The event fired when the date was selected.

### render

> `function({})` | _required_

This is called with an object. Read more about the properties of this object in
the section "[Render Prop Function](#render-prop-function)".

### offset

> `number` | **control prop** (read more about this in the "Control Props"
> section below) - defaults to `0` if not controlled.

Number off months to offset from the `date` prop.

### onOffsetChanged

> `function(offset: number)` | **control prop** (read more about this in the
> "Control Props" section below)

Called when the user selects to go forward or back. This function is
**required** if `offset` is being provided as a prop.

- `offset`: The number of months offset.

## Control Props

dayzed manages its own `offset` state internally and calls your
`onOffsetChanged` handler when the offset changes. Your render prop function
(read more below) can be used to manipulate this state from within the render
function and can likely support many of your use cases.

However, if more control is needed, you can pass `offset` as a prop (as
indicated above) and that state becomes controlled. As soon as
`this.props.offset !== undefined`, internally, `dayzed` will determine its state
based on your prop's value rather than its own internal state. You will be
required to keep the state up to date (this is where the `onOffsetChanged`
handler comes in really handy), but you can also control the state from
anywhere, be that state from other components, `redux`, `react-router`, or
anywhere else.

> Note: This is very similar to how normal controlled components work elsewhere
> in react (like `<input />`). If you want to learn more about this concept, you
> can learn about that from this the ["Controlled Components"
> lecture][controlled-components-lecture]

## Custom Hook

You can either use the custom `useDayzed` hook or the render prop function
(described in the section below) to return the things needed to render your
calendars. The custom Hook has a benefit over the render prop function as it
does not unnecessarily add an additional child into the render tree. Example:

```jsx
function Datepicker(props) {
  let { calendars, getBackProps, getForwardProps, getDateProp } = useDayzed(
    props
  );
  return <div>{/* calendar elements */}</div>;
}
```

## Render Prop Function

This is where you render whatever you want to based on the state of `dayzed`.
It's a regular prop called `render`: `<Dayzed render={/* right here*/} />`.

> You can also pass it as the children prop if you prefer to do things that way
> `<Dayzed>{/* right here*/}</Dayzed>`

Fun fact, the `Dazyed` render prop component actually uses the `useDayzed`
custom Hook under the hood.

The properties of this object can be split into two categories as indicated
below:

### prop getters

> See [the blog post about prop getters][prop-getters]

These functions are used to apply props to the elements that you render. This
gives you maximum flexibility to render what, when, and wherever you like. You
call these on the element in question (for example:
`<button {...getDateProps()}`)). It's advisable to pass all your props to that
function rather than applying them on the element yourself to avoid your props
being overridden (or overriding the props returned). For example:
`getDateProps({onClick(event) {console.log(event)}})`.

| property          | type           | description                                                                    |
| ----------------- | -------------- | ------------------------------------------------------------------------------ |
| `getDateProps`    | `function({})` | Returns the props you should apply to the date button elements you render.     |
| `getBackProps`    | `function({})` | Returns the props you should apply to any `back` button element you render.    |
| `getForwardProps` | `function({})` | Returns the props you should apply to any `forward` button element you render. |

### state

These are values that represent the current state of the dayzed component.

| property                               | type      | description                                                                                                                                                  |
| -------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `calendars`                            | `any`     | An array containing objects of each month's data.                                                                                                            |
| `calendars[{}].month`                  | `number`  | Zero-based number of the month. (0 - 11)                                                                                                                     |
| `calendars[{}].year`                   | `number`  | The year of the month.                                                                                                                                       |
| `calendars[{}].firstDayOfMonth`        | `date`    | First day of the month.                                                                                                                                      |
| `calendars[{}].lastDayOfMonth`         | `date`    | Last day of the month.                                                                                                                                       |
| `calendars[{}].weeks`                  | `any`     | An array containing an array of date objects for each week of the month. Starting from Sunday to Saturday. `[ ["", "", "", "", dateObj, dateObj, dateObj] ]` |
| `calendars[{}].weeks[[{}]].date`       | `date`    | A `Date` object for that day of the week.                                                                                                                    |
| `calendars[{}].weeks[[{}]].selected`   | `boolean` | Whether the `Date` was given as part of the provided `selected` prop.                                                                                        |
| `calendars[{}].weeks[[{}]].selectable` | `boolean` | Whether the `Date` is selectable given the provided `maxDate` and `minDate` props.                                                                           |
| `calendars[{}].weeks[[{}]].today`      | `boolean` | Whether the `Date` is today's date.                                                                                                                          |
| `calendars[{}].weeks[[{}]].prevMonth`  | `boolean` | Whether the `Date` is in the previous month. Useful when the `showOutsideDays` flag is used.                                                                 |
| `calendars[{}].weeks[[{}]].nextMonth`  | `boolean` | Whether the `Date` is in the next month. Useful when the `showOutsideDays` flag is used.                                                                     |

## Inspiration and Thanks!

- [Jen Luker][jenluker]
  - For help with naming and reviewing this library.
- [Kent C. Dodds][kentcdodds]
  - This library borrows **heavily** from his awesome [downshift][downshift]
    library!
- [Michael Jackson][michaeljackson] & [Ryan Florence][ryanflorence]
  - For teaching the use of the [render prop pattern][render-prop-pattern].

## Other Solutions

Here are some other great daypicker solutions:

- [react-dates][react-dates]
- [react-calendar][react-calendar]
- [react-day-picker][react-day-picker]

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/3399907?v=4" width="100px;"/><br /><sub><b>Morgan Kartchner</b></sub>](https://github.com/mkartchner994)<br />[💻](https://github.com/mkartchner994/dayzed/commits?author=mkartchner994 "Code") [📖](https://github.com/mkartchner994/dayzed/commits?author=mkartchner994 "Documentation") [💡](#example-mkartchner994 "Examples") [🤔](#ideas-mkartchner994 "Ideas, Planning, & Feedback") [👀](#review-mkartchner994 "Reviewed Pull Requests") [⚠️](https://github.com/mkartchner994/dayzed/commits?author=mkartchner994 "Tests") | [<img src="https://avatars2.githubusercontent.com/u/1584489?v=4" width="100px;"/><br /><sub><b>Jen Luker</b></sub>](http://jenluker.com)<br />[💻](https://github.com/mkartchner994/dayzed/commits?author=knitcodemonkey "Code") [💡](#example-knitcodemonkey "Examples") [🤔](#ideas-knitcodemonkey "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/10711493?v=4" width="100px;"/><br /><sub><b>Sam Gale</b></sub>](https://github.com/sjgale)<br />[💻](https://github.com/mkartchner994/dayzed/commits?author=sjgale "Code") [🤔](#ideas-sjgale "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/13774309?v=4" width="100px;"/><br /><sub><b>Arthur Denner</b></sub>](https://github.com/arthurdenner)<br />[💻](https://github.com/mkartchner994/dayzed/commits?author=arthurdenner "Code") [🤔](#ideas-arthurdenner "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/410792?v=4" width="100px;"/><br /><sub><b>Dony Sukardi</b></sub>](http://dsds.io)<br />[💻](https://github.com/mkartchner994/dayzed/commits?author=donysukardi "Code") [💡](#example-donysukardi "Examples") [⚠️](https://github.com/mkartchner994/dayzed/commits?author=donysukardi "Tests") | [<img src="https://avatars3.githubusercontent.com/u/3483526?v=4" width="100px;"/><br /><sub><b>Amit Solanki</b></sub>](http://solankiamit.com)<br />[📖](https://github.com/mkartchner994/dayzed/commits?author=iamsolankiamit "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/3090112?v=4" width="100px;"/><br /><sub><b>Nathanael CHERRIER</b></sub>](https://nathanaelcherrier.com)<br />[💻](https://github.com/mkartchner994/dayzed/commits?author=mindsers "Code") [🤔](#ideas-mindsers "Ideas, Planning, & Feedback") [⚠️](https://github.com/mkartchner994/dayzed/commits?author=mindsers "Tests") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

[render-function-as-children]:
  https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9
[prop-getters]:
  https://blog.kentcdodds.com/how-to-give-rendering-control-to-users-with-prop-getters-549eaef76acf
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[yarn]: https://yarnpkg.com
[controlled-components-lecture]:
  https://courses.reacttraining.com/courses/advanced-react/lectures/3172720
[downshift]: https://github.com/paypal/downshift
[jenluker]: https://github.com/knitcodemonkey
[kentcdodds]: https://github.com/kentcdodds
[michaeljackson]: https://github.com/mjackson
[ryanflorence]: https://github.com/ryanflorence
[render-prop-pattern]:
  https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce
[react-dates]: https://github.com/airbnb/react-dates
[react-calendar]: https://github.com/wojtekmaj/react-calendar
[react-day-picker]: https://github.com/gpbl/react-day-picker
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
[license-badge]: https://img.shields.io/npm/l/dayzed.svg?style=flat-square
[license]: https://github.com/deseretdigital/dayzed/blob/master/LICENSE
[version-badge]: https://img.shields.io/npm/v/dayzed.svg?style=flat-square
[package]: https://www.npmjs.com/package/dayzed
[react-badge]:
  https://img.shields.io/badge/%E2%9A%9B%EF%B8%8F-(p)react-00d8ff.svg?style=flat-square
[react]: https://facebook.github.io/react/
[gzip-badge]:
  http://img.badgesize.io/https://unpkg.com/dayzed/dist/dayzed.umd.min.js?compression=gzip&label=gzip%20size&style=flat-square
[size-badge]:
  http://img.badgesize.io/https://unpkg.com/dayzed/dist/dayzed.umd.min.js?label=size&style=flat-square
[unpkg-dist]: https://unpkg.com/dayzed/dist/
[module-formats-badge]:
  https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20es-green.svg?style=flat-square
[react-hooks]: https://reactjs.org/docs/hooks-intro.html
