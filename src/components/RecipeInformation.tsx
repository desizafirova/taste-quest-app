import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { fetchRecipe, fetchRecipes } from '../services/api';
import Spinner from './Spinner';
import { AnalyzedRecipe, FetchedRecipesResponse } from '../types/recipe';

function RecipeInformation() {
  const { id } = useParams();
  const {
    data: recipeDetails,
    isLoading: isLoadingRecipeDetails,
    isError: isErrorRecipeDetails,
    error: errorRecipeDetails,
  } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipe(id!),
    enabled: !!id, // Only run the query if "id" is truthy
    staleTime: Infinity,
  });

  const {
    data: allRecipes,
    isLoading: isLoadingAllRecipes,
    isError: isErrorAllRecipes,
    error: errorAllRecipes,
  } = useQuery<FetchedRecipesResponse>({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  console.log(allRecipes?.results);
  const currentRecipe = allRecipes?.results.find(
    (recipe) => recipe.id.toString() === id
  );
  console.log(currentRecipe);
  const currentRecipeTitle = currentRecipe?.title;
  const currentRecipeImage = currentRecipe?.image;

  if (isLoadingRecipeDetails || isLoadingAllRecipes) return <Spinner />;
  if (isErrorRecipeDetails) {
    return <div>Error: {errorRecipeDetails.message}</div>;
  }
  if (isErrorAllRecipes) {
    return <div>Error: {errorAllRecipes.message}</div>;
  }

  const recipeInstructions: AnalyzedRecipe = recipeDetails![0];

  const { steps } = recipeInstructions;

  return (
    <main>
      <h2>{currentRecipeTitle}</h2>
      <img src={currentRecipeImage} alt={`Photo of ${currentRecipeTitle}`} />
      <h3>Ingredients</h3>
      <div>
        {steps.map((step) => {
          const ingredients = step.ingredients;

          return ingredients.map((ingredient) => {
            return <p key={ingredient.id}>{ingredient.name}</p>;
          });
        })}
      </div>
      <div>
        <h3>Instructions</h3>
        <ul>
          {steps.map((step) => {
            return (
              <div key={step.number}>
                <h3>Step {step.number}</h3>
                <p>{step.step}</p>
              </div>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

export default RecipeInformation;
