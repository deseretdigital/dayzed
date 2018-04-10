describe("Min/Max", () => {
  before(() => {
    cy.visitStory("Min and Max Date");
  });

  it("Min and Max Dates Should Be Disabled", () => {
    cy
      .getInStory("[aria-label='Tue May 01 2018']")
      .should("have.attr", "disabled");
    cy
      .getInStory("[aria-label='Wed May 02 2018']")
      .should("have.attr", "disabled");
    cy
      .getInStory("[aria-label='Thu May 03 2018']")
      .should("have.attr", "disabled");
    cy
      .getInStory("[aria-label='Fri May 04 2018']")
      .should("not.have.attr", "disabled");

    cy.getInStoryByTestId("backYear").should("have.attr", "disabled");
    cy.getInStoryByTestId("backMonth").should("have.attr", "disabled");
    cy.getInStoryByTestId("forwardYear").should("not.have.attr", "disabled");
    cy.getInStoryByTestId("forwardMonth").should("not.have.attr", "disabled");

    cy.getInStoryByTestId("forwardMonth").click();

    cy
      .getInStory("[aria-label='Wed Jun 27 2018']")
      .should("not.have.attr", "disabled");
    cy
      .getInStory("[aria-label='Thu Jun 28 2018']")
      .should("have.attr", "disabled");
    cy
      .getInStory("[aria-label='Fri Jun 29 2018']")
      .should("have.attr", "disabled");
    cy
      .getInStory("[aria-label='Sat Jun 30 2018']")
      .should("have.attr", "disabled");
  });
});
