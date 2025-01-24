import { type FetchedRecipesResponse } from '../types/recipe';

const URL = 'https://api.spoonacular.com/recipes/';

const KEY = '?apiKey=222ebaaea0c644bd9799484e565cffae';

export async function fetchRecipes(): Promise<FetchedRecipesResponse> {
  const res = await fetch(`${URL}complexSearch${KEY}`);
  const data: FetchedRecipesResponse = await res.json();
  return data;
}
