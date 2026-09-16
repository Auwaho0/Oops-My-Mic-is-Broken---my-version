import {
  Baby,
  BellRing,
  Construction,
  Cpu,
  Dog,
  Hammer,
  Home,
  Radio,
  Wrench,
} from "lucide-react";
import type { SoundCategoryGroup } from "./types";

export const SOUND_GROUPS: SoundCategoryGroup[] = [
  {
    title: "[ РЕМОНТ ]",
    note: "сосед сверху взял перфоратор в аренду на месяц",
    items: [
      { id: "drill", label: "Дрель", sub: "штробит стену с 8 утра", Icon: Wrench },
      {
        id: "jackhammer",
        label: "Перфоратор",
        sub: "девятый этаж, слышно всем",
        Icon: Construction,
      },
      { id: "hammer", label: "Молоток", sub: "аккуратные удары. почти", Icon: Hammer },
    ],
  },
  {
    title: "[ СЕМЬЯ ]",
    note: "домашние не в курсе, что у тебя созвон",
    items: [
      {
        id: "baby",
        label: "Плач ребёнка",
        sub: "ему просто нужно внимание",
        Icon: Baby,
      },
      { id: "dog", label: "Лай собаки", sub: "охраняет от курьера", Icon: Dog },
      {
        id: "socks",
        label: "«Мам, где носки?»",
        sub: "крик сквозь две стены",
        Icon: Home,
      },
    ],
  },
  {
    title: "[ ТЕХНИКА ]",
    note: "проблемы на стороне провайдера, вы уж простите",
    items: [
      {
        id: "static",
        label: "Статический шум",
        sub: "классика плохой связи",
        Icon: Radio,
      },
      {
        id: "robot",
        label: "Робот-голос",
        sub: "в-в-вы м-меня с-слышите?",
        Icon: Cpu,
      },
      {
        id: "doorbell",
        label: "Звонок в дверь",
        sub: "кто-то всегда не вовремя",
        Icon: BellRing,
      },
    ],
  },
];
