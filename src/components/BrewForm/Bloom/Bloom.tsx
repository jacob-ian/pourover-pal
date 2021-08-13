import { ReactNode } from "react";
import InputLabel from "../../common/InputLabel";

interface BloomProps {
  children: ReactNode;
}

export default function Bloom(props: BloomProps): JSX.Element {
  return <InputLabel label="Bloom">{props.children}</InputLabel>;
}
