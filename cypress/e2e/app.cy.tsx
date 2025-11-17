import { userFactory } from "@factories/index";
import { fetchUserListPOM, userListPOM } from "@pom/index";

describe("Main App E2E Test", () => {
  // Test 1: Test the loading state explicitly
  it("should show a loading state while fetching", () => {
    // We add a delay to *force* the loading state
    // to stay on the screen so we can test it.
    cy.intercept("GET", "**/api/users", {
      delayMs: 1500, // A 1.5 second delay
      body: userFactory.createUsers(5),
    }).as("getUsers");

    cy.visit("/");

    // The page *will* be in a loading state
    fetchUserListPOM.getLoadingMessage().should("be.visible");

    // Now wait for the delayed request to finish
    cy.wait("@getUsers");

    // Now assert the final state
    fetchUserListPOM.getLoadingMessage().should("not.exist");
    userListPOM.getList().should("be.visible");
  });

  // Test 2: Test the error state
  it("should show an error if the API fails", () => {
    cy.intercept("GET", "**/api/users", {
      statusCode: 500,
    }).as("getUsersError");

    cy.visit("/");

    // Wait for the failed call
    cy.wait("@getUsersError");

    // Assert the final error state
    fetchUserListPOM.getLoadingMessage().should("not.exist");
    userListPOM.getList().should("not.exist");
    fetchUserListPOM
      .getErrorMessage()
      .should("be.visible")
      .and("contain.text", "Failed to fetch users");
  });
});
