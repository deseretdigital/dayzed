describe("Months To Display", () => {
  before(() => {
    cy.visitStory("Display Multiple Months");
  });

  it("Toggling Multiple Months Works", () => {
    cy.getInStory("[aria-label='Tue May 01 2018']").should("exist");
    cy.getInStory("[aria-label='Fri Jun 01 2018']").should("exist");
    cy.getInStoryByTestId("monthsToDisplay").click();
    cy.getInStory("[aria-label='Tue May 01 2018']").should("exist");
    cy.getInStory("[aria-label='Fri Jun 01 2018']").should("not.exist");
  });
});
