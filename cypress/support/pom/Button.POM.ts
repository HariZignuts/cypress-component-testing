export const selectors = {
  button: '[data-cy="standard-button"]',
};

export const getButton = () => {
  return cy.get(selectors.button);
};
