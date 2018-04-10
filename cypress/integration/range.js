describe("Range", () => {
  before(() => {
    cy.visitStory("Range");
  });

  it("Selecting a Range of Dates Works", () => {
    cy.getInStory("[aria-label='Tue May 15 2018']").click();
    cy.getInStory("[aria-label='Fri May 18 2018']").click();
    cy
      .getInStory("[aria-label='Tue May 15 2018']")
      .should("have.css", "background-color", "rgb(128, 0, 128)");
    cy
      .getInStory("[aria-label='Wed May 16 2018']")
      .should("have.css", "background-color", "rgb(128, 0, 128)");
    cy
      .getInStory("[aria-label='Thu May 17 2018']")
      .should("have.css", "background-color", "rgb(128, 0, 128)");
    cy
      .getInStory("[aria-label='Fri May 18 2018']")
      .should("have.css", "background-color", "rgb(128, 0, 128)");
  });
});
