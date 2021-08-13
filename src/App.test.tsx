import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  const { container } = render(<App />);

  it("Should render", () => {
    expect(container).toBeTruthy();
  });
});
