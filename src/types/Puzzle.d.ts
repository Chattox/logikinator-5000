export type GameState = {
  links: Link[];
  [key: string]: string[] | LabelLinks;
};

export type Link = {
  label1: string;
  label2: string;
  link: boolean;
};

export type GameStateInput = {
  [key: string]: string[];
};
