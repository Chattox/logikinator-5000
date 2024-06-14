export type GameState = {
  links: LabelLinks[];
  [key: string]: string[] | LabelLinks;
};

export type LabelLinks = {
  [key: string]: Link;
};

export type Link = {
  [key: string]: boolean;
};

export type GameStateInput = {
  [key: string]: string[];
};

export type LinkUpdate = {
  label1: string;
  label2: string;
  link: boolean;
};
