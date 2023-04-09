export interface FlavourOption {
  readonly value: string;
  readonly label: string;
  readonly rating: string;
}
export const flavourOptions: readonly FlavourOption[] = [
  { value: "vanilla", label: "Vanilla", rating: "safe" },
  { value: "chocolate", label: "Chocolate", rating: "good" },
  { value: "strawberry", label: "Strawberry", rating: "wild" },
  { value: "salted-caramel", label: "Salted Caramel", rating: "crazy" },
];
