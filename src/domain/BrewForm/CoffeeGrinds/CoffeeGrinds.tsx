import { calculateCoffeeGrinds } from "../../../utils";
import "./CoffeeGrinds.sass";

interface CoffeeGrindsProps {
  waterVolume: number | undefined;
  coffeeStrength: number | undefined;
}

export default function CoffeeGrinds(props: CoffeeGrindsProps): JSX.Element {
  const { waterVolume, coffeeStrength } = props;
  const coffeeGrinds = calculateCoffeeGrinds({ waterVolume, coffeeStrength });

  const message = coffeeGrinds ? `Use ${coffeeGrinds}g of coffee` : "";
  return <div className="coffee-grinds">{message}</div>;
}
