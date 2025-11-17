import { UserList } from "@/components/UserList";
import { userFactory } from "@factories/index";
import { userListPOM } from "@pom/index";

describe("UserList.cy.tsx", () => {
  it("should display 'No users found.' message when user list is empty", () => {
    cy.mount(<UserList users={[]} />);

    userListPOM
      .getNoUsersMessage()
      .should("be.visible")
      .and("contain.text", "No users found.");

    userListPOM.getList().should("not.exist");
  });

  it("should render a list of users when provided", () => {
    const MOCK_USERS = userFactory.createUsers(2);
    const firstUser = MOCK_USERS[0];

    cy.mount(<UserList users={MOCK_USERS} />);

    userListPOM.getNoUsersMessage().should("not.exist");
    userListPOM.getList().should("be.visible");
    userListPOM.getListItems().should("have.length", MOCK_USERS.length);

    userListPOM
      .getListItems()
      .first()
      .should("contain.text", `${firstUser.name} (${firstUser.email})`);
  });
});
