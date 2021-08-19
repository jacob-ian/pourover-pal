import React, { useEffect, useState } from "react";
import {
  calculateAbsoluteStrength,
  calculateRatioStrength,
} from "../../../utils";
import InputLabel from "../../common/InputLabel/InputLabel";
import "./CoffeeStrength.sass";
import CoffeeStrengthAbsolute from "./CoffeeStrengthAbsolute";
import CoffeeStrengthRatio from "./CoffeeStrengthRatio";

interface CoffeeStrengthProps {
  label: string;
  onChange: (value: string) => void;
  value: number | undefined;
}

export default function CoffeeStrength(
  props: CoffeeStrengthProps
): JSX.Element {
  return (
    <>
      <InputLabel label={props.label} for="strength-abs" />
      <div className="coffee-strength">
        <CoffeeStrengthAbsolute
          value={props.value}
          onChange={(e) => props.onChange(e.currentTarget.value)}
        />
        =
        <CoffeeStrengthRatio
          absoluteStrength={props.value}
          onChange={(value) => props.onChange(value)}
        />
      </div>
    </>
  );
}
