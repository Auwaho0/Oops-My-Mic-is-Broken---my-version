export type ExcuseCategory = "brazen" | "polite" | "tech" | "absurd";

export interface CategoryConfig {
  id: ExcuseCategory;
  label: string;
  hint: string;
}
