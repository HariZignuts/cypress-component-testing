export const selectors = {
  list: '[data-cy="user-list"]',
  listItem: '[data-cy="user-item"]',
  noUsersMessage: '[data-cy="no-users-message"]',
};

export const getList = () => cy.get(selectors.list);
export const getListItems = () => cy.get(selectors.listItem);
export const getNoUsersMessage = () => cy.get(selectors.noUsersMessage);
