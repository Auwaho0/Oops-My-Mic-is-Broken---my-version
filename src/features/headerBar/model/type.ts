import type { CSSProperties } from "react";

export type THeaderButtonKey = "minimize" | "fullscreen" | "close";

export interface IHeaderButtonConfig {
  key: THeaderButtonKey;
  label: string;
  style: CSSProperties;
  className: string;
  title: string;
}