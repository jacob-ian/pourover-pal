import { ReactNode } from "react";
import "./CoffeeStrength.sass";

interface CoffeeStrengthProps {
  children: ReactNode;
}

export default function CoffeeStrength(
  props: CoffeeStrengthProps
): JSX.Element {
  return (
    <div className="coffee-strength">
      <h3>Coffee strength:</h3>
      <div className="coffee-strength-container">{props.children}</div>
    </div>
  );
}
