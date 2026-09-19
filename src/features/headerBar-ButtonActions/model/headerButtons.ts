import type { IHeaderButtonConfig } from "./type"
import { MINIMIZE_FULLSCREEN_STYLES, CLOSE_BTN_STYLES } from "./styles";

export const HEADER_BUTTONS: readonly IHeaderButtonConfig[] = [
  {
    key: "minimize",
    label: "—",
    style: MINIMIZE_FULLSCREEN_STYLES,
    className: "px-4",
    title: "Нажмите чтобы вернуться наверх",
  },
  {
    key: "fullscreen",
    label: "□",
    style: MINIMIZE_FULLSCREEN_STYLES,
    className: "flex justify-center items-center px-4",
    title: "Нажмите чтобы сделать полноэкранным",
  },
  {
    key: "close",
    label: "X",
    style: CLOSE_BTN_STYLES,
    className: "px-4",
    title: "Нажмите чтобы закрыть :)",
  },
];