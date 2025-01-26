import { useQuery } from '@tanstack/react-query';
import { fetchRecipes } from '../services/api';
import { type FetchedRecipesResponse } from '../types/recipe';
import Spinner from './Spinner';
import Button from './Button';
import styles from './RecipeList.module.css';
import { useNavigate } from 'react-router';
function RecipeList() {
  const { data, isLoading, isError, error } = useQuery<FetchedRecipesResponse>({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ul className={styles.styleUl}>
      {data?.results.map((recipe) => (
        <li key={recipe.id} className={styles.flex}>
          <div>
            <img src={recipe.image} alt={recipe.title} className={styles.img} />
            <h2 className={styles.h2}>{recipe.title}</h2>
          </div>
          <Button
            onClick={() => {
              navigate(`/recipes/${recipe.id}`); // Navigate to recipe page with the recipe ID as a parameter
            }}
          >
            Go to the recipe &rarr;
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default RecipeList;
