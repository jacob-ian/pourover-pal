import { render, cleanup } from "@testing-library/react";
import BrewControls from "./BrewControls";

afterEach(() => {
  cleanup();
});

describe("BrewControls", () => {
  it("Should render a container div", () => {
    const { container } = render(
      <BrewControls>
        <h1>Testing</h1>
      </BrewControls>
    );
    const component = container.querySelector(".brew-controls");
    expect(component).toBeInTheDocument();
  });

  it("Should render the children of the component", () => {
    const { container } = render(
      <BrewControls>
        <h1>Testing</h1>
      </BrewControls>
    );
    const component = container.querySelector(".brew-controls");
    const child = component?.firstChild;
    expect(child?.nodeName).toBe("H1");
  });
});
