/* Процедурный синтез фоновых шумов на Web Audio API.
   Никаких mp3 — всё генерируется осцилляторами и шумом в реальном времени. */

export type SoundId =
  | "drill"
  | "jackhammer"
  | "hammer"
  | "baby"
  | "dog"
  | "socks"
  | "static"
  | "robot"
  | "doorbell";

type StopFn = () => void;
