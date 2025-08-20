import type {
  SpacingValue,
  DimensionValue,
  PixelValue,
  RadiusValue
} from "./type";

export const parseValue = (value: DimensionValue | PixelValue): string =>
  typeof value === "number" ? `${value}px` : value;

export const parseList = (value: SpacingValue | RadiusValue): string => {
  if (Array.isArray(value)) {
    return value.map(e => (typeof e === "number" ? `${e}px` : e)).join(" ");
  }
  return typeof value === "number" ? `${value}px` : value;
};
