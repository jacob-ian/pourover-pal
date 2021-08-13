import "./BrewForm.sass";
import { ReactNode } from "react";

interface BrewFormProps {
  children: ReactNode;
}

export default function BrewForm(props: BrewFormProps): JSX.Element {
  return <div className="brew-form">{props.children}</div>;
}
