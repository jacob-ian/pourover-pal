import "./App.sass";
import { useReducer } from "react";
import BrewControls from "./domain/BrewControls/BrewControls";
import BrewForm from "./domain/BrewForm/BrewForm";
import BrewSteps from "./domain/BrewSteps/BrewSteps";
import Card from "./components/Card";
import Header from "./domain/Header/Header";
import { useBrewReady } from "./hooks/useBrewReady";

export interface BrewState {
  started: boolean;
  paused: boolean;
  ready: boolean;
}

export type BrewStateAction =
  | { type: "pause" }
  | { type: "start" }
  | { type: "stop" }
  | { type: "ready"; payload: { value: boolean } };

interface DetailsUpdatePayload {
  name: BrewDetailKey;
  value: string | undefined;
}
export type DetailsAction =
  | {
      type: "update";
      payload: DetailsUpdatePayload;
    }
  | { type: "reset" };

export type BrewDetailKey =
  | "waterVolume"
  | "coffeeStrength"
  | "bloomDuration"
  | "bloomRatio";

export type BrewDetails = {
  [key in BrewDetailKey]: number | undefined;
};

const DEFAULT_DETAILS: BrewDetails = {
  waterVolume: undefined,
  coffeeStrength: 60,
  bloomDuration: 45,
  bloomRatio: 2,
};

function brewReducer(state: BrewState, action: BrewStateAction): BrewState {
  switch (action.type) {
    case "start":
      return { ...state, paused: false, started: true };
    case "stop":
      return { ...state, paused: false, started: false };
    case "pause":
      return { ...state, paused: true, started: true };
    case "ready":
      return { ...state, ready: action.payload.value };

    default:
      return state;
  }
}

function detailsReducer(
  details: BrewDetails,
  action: DetailsAction
): BrewDetails {
  switch (action.type) {
    case "reset":
      return DEFAULT_DETAILS;

    case "update":
      const { name, value } = action.payload;
      return { ...details, [name]: value ? value : undefined };

    default:
      return details;
  }
}

export default function App() {
  const [brew, dispatchBrew] = useReducer(brewReducer, {
    started: false,
    paused: false,
    ready: false,
  });

  const [brewDetails, dispatchDetails] = useReducer(
    detailsReducer,
    DEFAULT_DETAILS
  );

  useBrewReady(brewDetails, dispatchBrew);

  return (
    <div className="App">
      <Header />
      <Card>
        {brew.started ? (
          <BrewSteps {...brewDetails} paused={brew.paused} />
        ) : (
          <BrewForm {...brewDetails} dispatch={dispatchDetails} />
        )}
        <BrewControls
          {...brew}
          dispatchBrew={dispatchBrew}
          dispatchDetails={dispatchDetails}
        />
      </Card>
    </div>
  );
}
