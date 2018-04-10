import { monthNamesFull } from "../../stories/examples/calendarUtils";

describe("Single", () => {
  before(() => {
    cy.visitStory("Single Date Selection");
  });

  beforeEach(() => {
    cy.getInStoryByTestId("goToAprilButton").click();
  });

  it("Forward and Back Year Buttons Work", () => {
    cy.getInStoryByTestId("monthYear").should("contain", "April 2018");
    cy.getInStoryByTestId("backYear").click();
    cy.getInStoryByTestId("monthYear").should("contain", "April 2017");
    cy.getInStoryByTestId("forwardYear").click();
    cy.getInStoryByTestId("monthYear").should("contain", "April 2018");
  });

  it("Forward and Back Month Buttons Work", () => {
    cy.getInStoryByTestId("monthYear").should("contain", "April 2018");
    cy.getInStoryByTestId("backMonth").click();
    cy.getInStoryByTestId("monthYear").should("contain", "March 2018");
    cy.getInStoryByTestId("forwardMonth").click();
    cy.getInStoryByTestId("monthYear").should("contain", "April 2018");
  });

  it("Toggling Date Selection Works", () => {
    let selectedDate = new Date("04/03/2018");
    cy.getInStory("[aria-label='Tue Apr 03 2018']").click();
    cy
      .getInStoryByTestId("dateSelected")
      .should("contain", selectedDate.toLocaleDateString());
    cy.getInStory("[aria-label='Tue Apr 03 2018']").click();
    cy.getInStoryByTestId("dateSelected").should("not.exist");
  });

  it("Can Jump to Today's Date", () => {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    cy
      .getInStoryByTestId("backMonth")
      .click()
      .click()
      .click();
    cy.getInStoryByTestId("monthYear").should("contain", "January 2018");
    cy.getInStoryByTestId("todayButton").click();
    cy
      .getInStoryByTestId("monthYear")
      .should("contain", `${monthNamesFull[month]} ${year}`);
  });
});
