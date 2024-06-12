export type GameState = {
  links: LabelLinks;
  [key: string]: string[] | LabelLinks;
};

export type LabelLinks = {
  [key: string]: Link;
};

export type Link = {
  [key: string]: boolean;
};
