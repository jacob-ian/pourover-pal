import "./App.sass";
import { Dispatch, useEffect, useReducer } from "react";
import BrewControls from "./components/BrewControls/BrewControls";
import BrewForm from "./components/BrewForm/BrewForm";
import BrewSteps from "./components/BrewSteps/BrewSteps";
import Card from "./components/Card";
import Header from "./components/Header/Header";
import { useReady } from "./hooks/useReady";

export interface MainState {
  brewStarted: boolean;
  brewPaused: boolean;
  brewReady: boolean;
}

export type MainAction =
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

function mainReducer(state: MainState, action: MainAction): MainState {
  switch (action.type) {
    case "start":
      return { ...state, brewPaused: false, brewStarted: true };
    case "stop":
      return { ...state, brewPaused: false, brewStarted: false };
    case "pause":
      return { ...state, brewPaused: true, brewStarted: true };
    case "ready":
      return { ...state, brewReady: action.payload.value };

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
  const [main, dispatchMain] = useReducer(mainReducer, {
    brewStarted: false,
    brewPaused: false,
    brewReady: false,
  });

  const [brewDetails, dispatchDetails] = useReducer(
    detailsReducer,
    DEFAULT_DETAILS
  );

  useReady(brewDetails, dispatchMain);

  return (
    <div className="App">
      <Header />
      <Card>
        {main.brewStarted ? (
          <BrewSteps {...brewDetails} brewPaused={main.brewPaused} />
        ) : (
          <BrewForm {...brewDetails} dispatch={dispatchDetails} />
        )}
        <BrewControls
          {...main}
          dispatchMain={dispatchMain}
          dispatchDetails={dispatchDetails}
        />
      </Card>
    </div>
  );
}
