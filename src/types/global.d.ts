export declare global {
  type GameState = {
    categories: Category[];
    links: Link[];
  };

  type Category = {
    name: string;
    items: string[];
  };

  type Link = {
    item1: string;
    item2: string;
    link: boolean;
  };

  type OuterGridRow = {
    x: Category;
    y: Category[];
  };
}
