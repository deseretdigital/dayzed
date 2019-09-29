import { monthNamesFull } from '../../docs/components/calendarUtils';

describe('Single', () => {
  before(() => {
    cy.visitStory('single');
  });

  beforeEach(() => {
    cy.getByTestId('goToAprilButton').click();
  });

  it('Forward and Back Year Buttons Work', () => {
    cy.getByTestId('monthYear').should('contain', 'April 2018');
    cy.getByTestId('backYear').click();
    cy.getByTestId('monthYear').should('contain', 'April 2017');
    cy.getByTestId('forwardYear').click();
    cy.getByTestId('monthYear').should('contain', 'April 2018');
  });

  it('Forward and Back Month Buttons Work', () => {
    cy.getByTestId('monthYear').should('contain', 'April 2018');
    cy.getByTestId('backMonth').click();
    cy.getByTestId('monthYear').should('contain', 'March 2018');
    cy.getByTestId('forwardMonth').click();
    cy.getByTestId('monthYear').should('contain', 'April 2018');
  });

  it('Toggling Date Selection Works', () => {
    let selectedDate = new Date('04/03/2018');
    cy.get("[aria-label='Tue Apr 03 2018']").click();
    cy.getByTestId('dateSelected').should(
      'contain',
      selectedDate.toLocaleDateString()
    );
    cy.get("[aria-label='Tue Apr 03 2018']").click();
    cy.getByTestId('dateSelected').should('not.exist');
  });

  it('Toggling First Day of Week Works', () => {
    // Sun (default)
    cy.getByTestId('firstDayOfWeek').should('contain', 'Sun');
    cy.getByTestId('calendarDates')
      .children()
      .first()
      .should('contain', '1');
    // Mon
    cy.getByTestId('firstDayOfWeekButtonM').click();
    cy.getByTestId('firstDayOfWeek').should('contain', 'Mon');
    cy.getByTestId('calendarDates')
      .children()
      .first()
      .should('be.empty');
    // Tue
    cy.getByTestId('firstDayOfWeekButtonT').click();
    cy.getByTestId('firstDayOfWeek').should('contain', 'Tue');
    cy.getByTestId('calendarDates')
      .children()
      .first()
      .should('be.empty');
    // Wed
    cy.getByTestId('firstDayOfWeekButtonW').click();
    cy.getByTestId('firstDayOfWeek').should('contain', 'Wed');
    cy.getByTestId('calendarDates')
      .children()
      .first()
      .should('be.empty');
    // Thu
    cy.getByTestId('firstDayOfWeekButtonTh').click();
    cy.getByTestId('firstDayOfWeek').should('contain', 'Thu');
    cy.getByTestId('calendarDates')
      .children()
      .first()
      .should('be.empty');
    // Fri
    cy.getByTestId('firstDayOfWeekButtonF').click();
    cy.getByTestId('firstDayOfWeek').should('contain', 'Fri');
    cy.getByTestId('calendarDates')
      .children()
      .first()
      .should('be.empty');
    // Sat
    cy.getByTestId('firstDayOfWeekButtonS').click();
    cy.getByTestId('firstDayOfWeek').should('contain', 'Sat');
    cy.getByTestId('calendarDates')
      .children()
      .first()
      .should('be.empty');
    // Sun
    cy.getByTestId('firstDayOfWeekButtonSu').click();
    cy.getByTestId('firstDayOfWeek').should('contain', 'Sun');
    cy.getByTestId('calendarDates')
      .children()
      .first()
      .should('contain', '1');
  });

  it('Toggling Outside Days Works', () => {
    // Toggle start of week to Monday so we will have beginning and ending adjacent dates.
    cy.getByTestId('firstDayOfWeekButtonM').click();
    cy.getByTestId('firstDayOfWeek').should('contain', 'Mon');
    cy.getByTestId('calendarDates')
      .children()
      .first()
      .should('be.empty');
    cy.getByTestId('calendarDates')
      .children()
      .last()
      .should('be.empty');
    // Toogle outside days.
    cy.getByTestId('showOutsideDaysButton').click();
    cy.getByTestId('firstDayOfWeek').should('contain', 'Mon');
    // First of month.
    let firstChild = cy
      .getByTestId('calendarDates')
      .children()
      .first();
    let prevMonthDate = new Date('03/26/2018');
    firstChild.should('contain', '26');
    firstChild.click();
    cy.getByTestId('dateSelected').should(
      'contain',
      prevMonthDate.toLocaleDateString()
    );
    // Last of month.
    let lastChild = () =>
      cy
        .getByTestId('calendarDates')
        .children()
        .last();
    let nextMonthDate = new Date('05/06/2018');
    lastChild().should('contain', '6');
    lastChild().click();
    cy.getByTestId('dateSelected').should(
      'contain',
      nextMonthDate.toLocaleDateString()
    );
    // Remove selected Date.
    lastChild().click();
    cy.getByTestId('dateSelected').should('not.exist');
    // Toggle back to Sunday as first day of the week.
    cy.getByTestId('firstDayOfWeekButtonSu').click();
    cy.getByTestId('firstDayOfWeek').should('contain', 'Sun');
    cy.getByTestId('calendarDates')
      .children()
      .first()
      .should('contain', '1');
  });

  it("Can Jump to Today's Date", () => {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    cy.getByTestId('backMonth')
      .click()
      .click()
      .click();
    cy.getByTestId('monthYear').should('contain', 'January 2018');
    cy.getByTestId('todayButton').click();
    cy.getByTestId('monthYear').should(
      'contain',
      `${monthNamesFull[month]} ${year}`
    );
  });
});
