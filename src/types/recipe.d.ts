export type Recipe = {
  id: number | string;
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
// For fetchRecipe
export interface Ingredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface Equipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface Step {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Equipment[];
  length?: {
    number: number;
    unit: string;
  };
}

export interface AnalyzedRecipe {
  name: string;
  steps: Step[];
}

export type AnalyzedRecipeArr = AnalyzedRecipe[];

export type fetchPaginationProp = {
  number: number;
  offset: number;
};
