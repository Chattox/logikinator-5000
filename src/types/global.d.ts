export declare global {
  type GameState = {
    links: Link[];
    [key: string]: string[] | LabelLinks;
  };

  type Link = {
    label1: string;
    label2: string;
    link: boolean;
  };

  type GameStateInput = {
    [key: string]: string[];
  };
}
