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
interface Ingredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

interface Equipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

interface Step {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Equipment[];
  length?: {
    number: number;
    unit: string;
  };
}

interface AnalyzedRecipe {
  name: string;
  steps: Step[];
}

type AnalyzedRecipeArr = AnalyzedRecipe[];
