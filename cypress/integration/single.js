import { monthNamesFull } from '../../stories/examples/calendarUtils';

describe('Single', () => {
  before(() => {
    cy.visitStory('Single Date Selection');
  });

  beforeEach(() => {
    cy.getInStoryByTestId('goToAprilButton').click();
  });

  it('Forward and Back Year Buttons Work', () => {
    cy.getInStoryByTestId('monthYear').should('contain', 'April 2018');
    cy.getInStoryByTestId('backYear').click();
    cy.getInStoryByTestId('monthYear').should('contain', 'April 2017');
    cy.getInStoryByTestId('forwardYear').click();
    cy.getInStoryByTestId('monthYear').should('contain', 'April 2018');
  });

  it('Forward and Back Month Buttons Work', () => {
    cy.getInStoryByTestId('monthYear').should('contain', 'April 2018');
    cy.getInStoryByTestId('backMonth').click();
    cy.getInStoryByTestId('monthYear').should('contain', 'March 2018');
    cy.getInStoryByTestId('forwardMonth').click();
    cy.getInStoryByTestId('monthYear').should('contain', 'April 2018');
  });

  it('Toggling Date Selection Works', () => {
    let selectedDate = new Date('04/03/2018');
    cy.getInStory("[aria-label='Tue Apr 03 2018']").click();
    cy.getInStoryByTestId('dateSelected').should(
      'contain',
      selectedDate.toLocaleDateString()
    );
    cy.getInStory("[aria-label='Tue Apr 03 2018']").click();
    cy.getInStoryByTestId('dateSelected').should('not.exist');
  });

  it('Toggling First Day of Week Works', () => {
    // Sun (default)
    cy.getInStoryByTestId('firstDayOfWeek').should('contain', 'Sun');
    cy.getInStoryByTestId('calendarDates')
      .children()
      .first()
      .should('contain', '1');
    // Mon
    cy.getInStoryByTestId('firstDayOfWeekButtonM').click();
    cy.getInStoryByTestId('firstDayOfWeek').should('contain', 'Mon');
    cy.getInStoryByTestId('calendarDates')
      .children()
      .first()
      .should('be.empty');
    // Tue
    cy.getInStoryByTestId('firstDayOfWeekButtonT').click();
    cy.getInStoryByTestId('firstDayOfWeek').should('contain', 'Tue');
    cy.getInStoryByTestId('calendarDates')
      .children()
      .first()
      .should('be.empty');
    // Wed
    cy.getInStoryByTestId('firstDayOfWeekButtonW').click();
    cy.getInStoryByTestId('firstDayOfWeek').should('contain', 'Wed');
    cy.getInStoryByTestId('calendarDates')
      .children()
      .first()
      .should('be.empty');
    // Thu
    cy.getInStoryByTestId('firstDayOfWeekButtonTh').click();
    cy.getInStoryByTestId('firstDayOfWeek').should('contain', 'Thu');
    cy.getInStoryByTestId('calendarDates')
      .children()
      .first()
      .should('be.empty');
    // Fri
    cy.getInStoryByTestId('firstDayOfWeekButtonF').click();
    cy.getInStoryByTestId('firstDayOfWeek').should('contain', 'Fri');
    cy.getInStoryByTestId('calendarDates')
      .children()
      .first()
      .should('be.empty');
    // Sat
    cy.getInStoryByTestId('firstDayOfWeekButtonS').click();
    cy.getInStoryByTestId('firstDayOfWeek').should('contain', 'Sat');
    cy.getInStoryByTestId('calendarDates')
      .children()
      .first()
      .should('be.empty');
    // Sun
    cy.getInStoryByTestId('firstDayOfWeekButtonSu').click();
    cy.getInStoryByTestId('firstDayOfWeek').should('contain', 'Sun');
    cy.getInStoryByTestId('calendarDates')
      .children()
      .first()
      .should('contain', '1');
  });

  it('Toggling Outside Days Works', () => {
    // Toggle start of week to Monday so we will have beginning and ending adjacent dates.
    cy.getInStoryByTestId('firstDayOfWeekButtonM').click();
    cy.getInStoryByTestId('firstDayOfWeek').should('contain', 'Mon');
    cy.getInStoryByTestId('calendarDates')
      .children()
      .first()
      .should('be.empty');
    cy.getInStoryByTestId('calendarDates')
      .children()
      .last()
      .should('be.empty');
    // Toogle outside days.
    cy.getInStoryByTestId('showOutsideDaysButton').click();
    cy.getInStoryByTestId('firstDayOfWeek').should('contain', 'Mon');
    // First of month.
    let firstChild = cy
      .getInStoryByTestId('calendarDates')
      .children()
      .first();
    let prevMonthDate = new Date('03/26/2018');
    firstChild.should('contain', '26');
    firstChild.click();
    cy.getInStoryByTestId('dateSelected').should(
      'contain',
      prevMonthDate.toLocaleDateString()
    );
    // Last of month.
    let lastChild = () =>
      cy
        .getInStoryByTestId('calendarDates')
        .children()
        .last();
    let nextMonthDate = new Date('05/06/2018');
    lastChild().should('contain', '6');
    lastChild().click();
    cy.getInStoryByTestId('dateSelected').should(
      'contain',
      nextMonthDate.toLocaleDateString()
    );
    // Remove selected Date.
    lastChild().click();
    cy.getInStoryByTestId('dateSelected').should('not.exist');
    // Toggle back to Sunday as first day of the week.
    cy.getInStoryByTestId('firstDayOfWeekButtonSu').click();
    cy.getInStoryByTestId('firstDayOfWeek').should('contain', 'Sun');
    cy.getInStoryByTestId('calendarDates')
      .children()
      .first()
      .should('contain', '1');
  });

  it("Can Jump to Today's Date", () => {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    cy.getInStoryByTestId('backMonth')
      .click()
      .click()
      .click();
    cy.getInStoryByTestId('monthYear').should('contain', 'January 2018');
    cy.getInStoryByTestId('todayButton').click();
    cy.getInStoryByTestId('monthYear').should(
      'contain',
      `${monthNamesFull[month]} ${year}`
    );
  });
});
