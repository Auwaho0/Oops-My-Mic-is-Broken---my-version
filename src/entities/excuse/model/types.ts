export type ExcuseCategory = "brazen" | "polite" | "tech" | "absurd" | "other";

export interface CategoryConfig {
  id: ExcuseCategory;
  label: string;
  hint: string;
}
