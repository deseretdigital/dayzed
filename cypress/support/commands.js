Cypress.Commands.add('getByTestId', id => cy.get(`[data-test="${id}"]`));

// see the baseUrl config in cypress.json
Cypress.Commands.add('visitStory', name => {
  cy.visit(`/`);
  cy.get(`a[href="/examples/${name}"]`).click({ force: true });
});
