describe('Range', () => {
  before(() => {
    cy.visitStory('range');
  });

  it('Selecting a Range of Dates Works', () => {
    cy.get("[aria-label='Tue May 15 2018']").click();
    cy.get("[aria-label='Fri May 18 2018']").click();
    cy.get("[aria-label='Tue May 15 2018']").should(
      'have.css',
      'background-color',
      'rgb(128, 0, 128)'
    );
    cy.get("[aria-label='Wed May 16 2018']").should(
      'have.css',
      'background-color',
      'rgb(128, 0, 128)'
    );
    cy.get("[aria-label='Thu May 17 2018']").should(
      'have.css',
      'background-color',
      'rgb(128, 0, 128)'
    );
    cy.get("[aria-label='Fri May 18 2018']").should(
      'have.css',
      'background-color',
      'rgb(128, 0, 128)'
    );
  });
});
