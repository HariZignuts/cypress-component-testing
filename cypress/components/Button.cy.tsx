import { Button } from "@/components/Button";
import { buttonPOM } from "@pom/index";

describe("Button.cy.tsx", () => {
  it("should mount and be visible", () => {
    // 1. This is the new command!
    // We "mount" the component instead of "visiting" a page.
    cy.mount(<Button onClick={() => {}}>Click Me</Button>);

    // 2. From here, all your normal Cypress commands work
    buttonPOM.getButton().should("be.visible").and("contain.text", "Click Me");
  });

  it("should be disabled when disabled prop is true", () => {
    cy.mount(
      <Button onClick={() => {}} disabled>
        Disabled Button
      </Button>
    );

    buttonPOM.getButton().should("be.disabled");

    buttonPOM
      .getButton()
      .should("have.css", "background-color", "rgb(128, 128, 128)"); // grey
  });

  it("should call the onClick handler when clicked", () => {
    const onClickSpy = cy.spy().as("onClickSpy");

    cy.mount(<Button onClick={onClickSpy}>Clickable Button</Button>);

    buttonPOM.getButton().click();

    cy.get("@onClickSpy").should("have.been.calledOnce");
  });
});
