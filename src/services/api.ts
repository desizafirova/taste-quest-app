import {
  type FetchedRecipesResponse,
  AnalyzedRecipeArr,
  fetchPaginationProp,
} from '../types/recipe';

const URL = 'https://api.spoonacular.com/recipes/';

export async function fetchRecipes({
  number,
  offset,
}: fetchPaginationProp): Promise<FetchedRecipesResponse> {
  const res = await fetch(
    `${URL}complexSearch?number=${number}&offset=${offset}&apiKey=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const data: FetchedRecipesResponse = await res.json();
  return data;
}

export async function fetchRecipe(id: string): Promise<AnalyzedRecipeArr> {
  const res = await fetch(
    `${URL}${id}/analyzedInstructions?apiKey=${import.meta.env.VITE_API_KEY}`
  );
  const data: AnalyzedRecipeArr = await res.json();
  console.log(data);

  return data;
}
