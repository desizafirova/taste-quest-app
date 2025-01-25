import { useQuery } from '@tanstack/react-query';
import { fetchRecipes } from '../services/api';
import { type FetchedRecipesResponse } from '../types/recipe';
import Spinner from './Spinner';
import Button from './Button';

function RecipeList() {
  const { data, isLoading, isError, error } = useQuery<FetchedRecipesResponse>({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  if (isLoading) return <Spinner />;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data?.results.map((recipe) => (
        <li key={recipe.id}>
          <img src={recipe.image} alt={recipe.title} />
          <h2>{recipe.title}</h2>
          <Button>Go to the recipe &rarr;</Button>
        </li>
      ))}
    </ul>
  );
}

export default RecipeList;
