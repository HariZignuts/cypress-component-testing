import { FetchUserList } from "@/components/FetchUserList";
import { userFactory } from "@factories/index";
import { fetchUserListPOM, userListPOM } from "@pom/index";

describe("FetchUserList Component", () => {
  it("should show a loading state initially", () => {
    cy.intercept("GET", "/api/users", {
      delayMs: 1000,
      body: [],
    }).as("getUsers");

    cy.mount(<FetchUserList />);
    fetchUserListPOM.getLoadingMessage().should("be.visible");
    cy.wait("@getUsers");
    fetchUserListPOM.getLoadingMessage().should("not.exist");
  });

  it("should render a list of users on success", () => {
    const users = userFactory.createUsers(3);
    cy.intercept("GET", "/api/users", {
      statusCode: 200,
      body: users,
    });

    cy.mount(<FetchUserList />);
    fetchUserListPOM.getLoadingMessage().should("not.exist");
    userListPOM.getList().should("be.visible");
    userListPOM.getListItems().should("have.length", users.length);

    userListPOM
      .getListItems()
      .first()
      .should("contain.text", users[0].name)
      .and("contain.text", users[0].email);
  });

  it("should render an error message on failure", () => {
    cy.intercept("GET", "/api/users", {
      statusCode: 500,
    });

    cy.mount(<FetchUserList />);
    fetchUserListPOM.getLoadingMessage().should("not.exist");
    fetchUserListPOM
      .getErrorMessage()
      .should("be.visible")
      .and("contain.text", "Failed to fetch users");
  });
});
