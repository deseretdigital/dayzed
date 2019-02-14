describe('Multi', () => {
  before(() => {
    cy.visitStory('multi');
  });

  it('Selecting Multiple Dates Works', () => {
    cy.get("[aria-label='Tue May 15 2018']").click();
    cy.get("[aria-label='Wed May 16 2018']").click();
    cy.get("[aria-label='Thu May 17 2018']").click();
    cy.get("[aria-label='Fri May 18 2018']").click();
    cy.get("[aria-label='Tue May 15 2018']").should(
      'have.attr',
      'aria-pressed',
      'true'
    );
    cy.get("[aria-label='Wed May 16 2018']").should(
      'have.attr',
      'aria-pressed',
      'true'
    );
    cy.get("[aria-label='Thu May 17 2018']").should(
      'have.attr',
      'aria-pressed',
      'true'
    );
    cy.get("[aria-label='Fri May 18 2018']").should(
      'have.attr',
      'aria-pressed',
      'true'
    );
  });
});
