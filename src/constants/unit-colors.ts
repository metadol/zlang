export type UnitColor = {
  /** Unit banner background */
  background: string;
  /** Lesson button shadow, progress ring, accent text */
  accent: string;
};

/**
 * Unit color palette — cycles by unit order (1 → color[0], 6 → color[0], etc.).
 * Edit this array to change the learn-page color theme.
 */
export const UNIT_COLORS: UnitColor[] = [
  { background: "#58cc02", accent: "#58cc02" }, // green
  { background: "#1cb0f6", accent: "#1cb0f6" }, // blue
  { background: "#ce82ff", accent: "#ce82ff" }, // purple
  { background: "#ff9600", accent: "#ff9600" }, // orange
  { background: "#ff4b4b", accent: "#ff4b4b" }, // red
];

export const getUnitColor = (unitOrder: number): UnitColor => {
  const index = (unitOrder - 1) % UNIT_COLORS.length;
  return UNIT_COLORS[index];
};
