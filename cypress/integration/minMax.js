describe('Min/Max', () => {
  before(() => {
    cy.visitStory('min-max');
  });

  it('Min and Max Dates Should Be Disabled', () => {
    cy.get("[aria-label='Tue May 01 2018']").should('have.attr', 'disabled');
    cy.get("[aria-label='Wed May 02 2018']").should('have.attr', 'disabled');
    cy.get("[aria-label='Thu May 03 2018']").should('have.attr', 'disabled');
    cy.get("[aria-label='Fri May 04 2018']").should(
      'not.have.attr',
      'disabled'
    );

    cy.getByTestId('backYear').should('have.attr', 'disabled');
    cy.getByTestId('backMonth').should('have.attr', 'disabled');
    cy.getByTestId('forwardYear').should('not.have.attr', 'disabled');
    cy.getByTestId('forwardMonth').should('not.have.attr', 'disabled');

    cy.getByTestId('forwardMonth').click();

    cy.get("[aria-label='Wed Jun 27 2018']").should(
      'not.have.attr',
      'disabled'
    );
    cy.get("[aria-label='Thu Jun 28 2018']").should('have.attr', 'disabled');
    cy.get("[aria-label='Fri Jun 29 2018']").should('have.attr', 'disabled');
    cy.get("[aria-label='Sat Jun 30 2018']").should('have.attr', 'disabled');
  });
});
