describe('Months To Display', () => {
  before(() => {
    cy.visitStory('multi-months');
  });

  it('Toggling Multiple Months Works', () => {
    cy.get("[aria-label='Tue May 01 2018']").should('exist');
    cy.get("[aria-label='Fri Jun 01 2018']").should('exist');
    cy.getByTestId('monthsToDisplay').click();
    cy.get("[aria-label='Tue May 01 2018']").should('exist');
    cy.get("[aria-label='Fri Jun 01 2018']").should('not.exist');
  });
});
