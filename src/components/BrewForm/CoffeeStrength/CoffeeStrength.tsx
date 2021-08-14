import InputLabel from "../../common/InputLabel";
import { ReactNode } from "react";
import "./CoffeeStrength.sass";

interface CoffeeStrengthProps {
  children: ReactNode;
}

export default function CoffeeStrength(
  props: CoffeeStrengthProps
): JSX.Element {
  return <InputLabel label="Coffee strength:">{props.children}</InputLabel>;
}
