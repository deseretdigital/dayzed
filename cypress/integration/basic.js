describe("Basic", function() {
  it("Forward and Back Year Buttons Work", () => {
    cy.visitStory("Single Date Selection");
    cy.getInStoryByTestId("monthYear").should("contain", "April 2018");
    cy.getInStoryByTestId("backYear").click();
    cy.getInStoryByTestId("monthYear").should("contain", "April 2017");
    cy.getInStoryByTestId("forwardYear").click();
    cy.getInStoryByTestId("monthYear").should("contain", "April 2018");
  });

  it("Forward and Back Month Buttons Work", () => {
    cy.visitStory("Single Date Selection");
    cy.getInStoryByTestId("monthYear").should("contain", "April 2018");
    cy.getInStoryByTestId("backMonth").click();
    cy.getInStoryByTestId("monthYear").should("contain", "March 2018");
    cy.getInStoryByTestId("forwardMonth").click();
    cy.getInStoryByTestId("monthYear").should("contain", "April 2018");
  });

  it("Date Selection Works", () => {
    let selectedDate = new Date('04/03/2018');
    cy.visitStory("Single Date Selection");
    cy.getInStory("[aria-label='Tue Apr 03 2018']").click();
    cy.getInStoryByTestId("dateSelected").should("contain", selectedDate.toLocaleDateString());
  });
});
