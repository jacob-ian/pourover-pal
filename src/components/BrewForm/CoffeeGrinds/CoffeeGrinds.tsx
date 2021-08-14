import "./CoffeeGrinds.sass";

interface CoffeeGrindsProps {
  value: number | undefined;
}

export default function CoffeeGrinds(props: CoffeeGrindsProps): JSX.Element {
  const { value } = props;
  const message = value ? `Use ${props.value}g of coffee` : "";
  return <div className="coffee-grinds">{message}</div>;
}
