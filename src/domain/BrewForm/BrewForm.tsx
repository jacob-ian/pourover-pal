import "./BrewForm.sass";
import { BrewDetailKey, BrewDetails, DetailsAction } from "../../App";
import BrewVolume from "./Volume/BrewVolume";
import CoffeeStrength from "./CoffeeStrength/CoffeeStrength";
import Bloom from "./Bloom/Bloom";
import CoffeeGrinds from "./CoffeeGrinds/CoffeeGrinds";

interface BrewFormProps extends BrewDetails {
  dispatch: React.Dispatch<DetailsAction>;
}

export default function BrewForm(props: BrewFormProps): JSX.Element {
  const { waterVolume, coffeeStrength, bloomDuration, bloomRatio } = props;

  function handleFieldUpdate(name: BrewDetailKey, value: string): void {
    return props.dispatch({ type: "update", payload: { name, value } });
  }

  return (
    <form className="brew-form">
      <BrewVolume
        label="Brew volume:"
        value={waterVolume}
        onChange={(e) =>
          handleFieldUpdate("waterVolume", e.currentTarget.value)
        }
      />

      <CoffeeStrength
        label="Coffee strength:"
        value={coffeeStrength}
        onChange={(value) => handleFieldUpdate("coffeeStrength", value)}
      />
      <Bloom
        label="Bloom:"
        bloomRatio={bloomRatio}
        onBloomRatioChange={(e) =>
          handleFieldUpdate("bloomRatio", e.currentTarget.value)
        }
        bloomDuration={bloomDuration}
        onBloomDurationChange={(e) =>
          handleFieldUpdate("bloomDuration", e.currentTarget.value)
        }
      />

      <CoffeeGrinds waterVolume={waterVolume} coffeeStrength={coffeeStrength} />
    </form>
  );
}
