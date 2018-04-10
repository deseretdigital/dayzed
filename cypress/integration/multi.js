describe("Multi", () => {
  before(() => {
    cy.visitStory("Multi Date Selection");
  });

  it("Selecting Multiple Dates Works", () => {
    cy.getInStory("[aria-label='Tue May 15 2018']").click();
    cy.getInStory("[aria-label='Wed May 16 2018']").click();
    cy.getInStory("[aria-label='Thu May 17 2018']").click();
    cy.getInStory("[aria-label='Fri May 18 2018']").click();
    cy
      .getInStory("[aria-label='Tue May 15 2018']")
      .should("have.attr", "aria-pressed", "true");
    cy
      .getInStory("[aria-label='Wed May 16 2018']")
      .should("have.attr", "aria-pressed", "true");
    cy
      .getInStory("[aria-label='Thu May 17 2018']")
      .should("have.attr", "aria-pressed", "true");
    cy
      .getInStory("[aria-label='Fri May 18 2018']")
      .should("have.attr", "aria-pressed", "true");
  });
});
