export type Recipe = {
  id: number;
  title: string;
  image: string;
  imageType: string;
};

export type FetchedRecipesResponse = {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
};
