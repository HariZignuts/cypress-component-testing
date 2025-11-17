import type { User } from "@/types/user";
import { userFactory } from "@factories/index";
import { fetchUserListPOM, userListPOM } from "@pom/index";

describe("Main App E2E Test", () => {
  it("should show a loading state, then render the user list", () => {
    let sendResponse: (reply: { statusCode: number; body: User[] }) => void;

    cy.intercept("GET", "**/api/users", (req) => {
      return new Promise((resolve) => {
        sendResponse = (reply) => {
          resolve(req.reply(reply));
        };
      });
    }).as("getUsers");

    cy.visit("/");

    // 1. Assert the loading state (this part is fine)
    fetchUserListPOM.getLoadingMessage().should("be.visible");
    userListPOM.getList().should("not.exist");

    // --- THIS IS THE FIX ---
    // 2. Wrap the 'sendResponse' call in a cy.then()
    // This ensures it runs *after* the interceptor has assigned the function.
    cy.then(() => {
      sendResponse!({
        statusCode: 200,
        body: userFactory.createUsers(5),
      });
    });
    // --- END FIX ---

    // 3. Wait for the request to complete
    cy.wait("@getUsers");

    // 4. Assert the final successful state
    fetchUserListPOM.getLoadingMessage().should("not.exist");
    userListPOM.getList().should("be.visible");
    userListPOM.getListItems().should("have.length", 5);
  });

  // Test 2: Test the error state (no changes needed)
  it("should show an error if the API fails", () => {
    cy.intercept("GET", "**/api/users", {
      statusCode: 500,
    }).as("getUsersError");

    cy.visit("/");
    cy.wait("@getUsersError");

    fetchUserListPOM.getLoadingMessage().should("not.exist");
    userListPOM.getList().should("not.exist");
    fetchUserListPOM
      .getErrorMessage()
      .should("be.visible")
      .and("contain.text", "Failed to fetch users");
  });
});
