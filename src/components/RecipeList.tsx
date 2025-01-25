import { useQuery } from '@tanstack/react-query';
import { fetchRecipes } from '../services/api';
import { type FetchedRecipesResponse } from '../types/recipe';
import Spinner from './Spinner';
import Button from './Button';
import styles from './RecipeList.module.css';
function RecipeList() {
  const { data, isLoading, isError, error } = useQuery<FetchedRecipesResponse>({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  if (isLoading) return <Spinner />;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ul style={styles}>
      {data?.results.map((recipe) => (
        <li key={recipe.id} style={styles}>
          <img src={recipe.image} alt={recipe.title} />
          <h2 style={styles}>{recipe.title}</h2>
          <Button>Go to the recipe &rarr;</Button>
        </li>
      ))}
    </ul>
  );
}

export default RecipeList;
