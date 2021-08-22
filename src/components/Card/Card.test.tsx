import { render } from "@testing-library/react";
import Card from ".";

describe("Card", () => {
  const { container } = render(
    <Card>
      <h1>Testing</h1>
    </Card>
  );
  const card = container.firstChild;

  it("Should render the card", () => {
    expect(card).toBeTruthy();
  });

  it("Should render its children", () => {
    expect(card?.textContent).toBe("Testing");
  });
});
