export { selectors as userListSelectors } from "@pom/UserList.POM";

export const selectors = {
  loadingMessage: '[data-cy="loading-message"]',
  errorMessage: '[data-cy="error-message"]',
};

export const getLoadingMessage = () => cy.get(selectors.loadingMessage);
export const getErrorMessage = () => cy.get(selectors.errorMessage);
