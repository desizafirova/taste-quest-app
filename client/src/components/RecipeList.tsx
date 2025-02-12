import { useQuery } from '@tanstack/react-query';
import { fetchRecipes } from '../services/api';
import { type FetchedRecipesResponse } from '../types/recipe';
import Spinner from './Spinner';
import Button from './Button';
import styles from './RecipeList.module.css';
import { useState } from 'react';
import RecipeCard from './RecipeCard';
function RecipeList() {
  const [page, setPage] = useState(1);
  const recipesPerPage = 12;

  const { data, isLoading, isError, error } = useQuery<FetchedRecipesResponse>({
    queryKey: ['recipes', page],
    queryFn: () =>
      fetchRecipes({
        number: recipesPerPage,
        offset: (page - 1) * recipesPerPage,
      }),
  });

  const totalPages = Math.ceil((data?.totalResults || 0) / recipesPerPage);

  if (isLoading) return <Spinner />;

  if (isError) return <div>Error: {error.message}</div>;

  if (!data?.results || data.results.length === 0) {
    return <div>No recipes found.</div>;
  }

  return (
    <div className={styles.pageFlex}>
      <ul className={styles.styleUl}>
        {data?.results.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            image={recipe.image}
            title={recipe.title}
            page={page}
            recipesPerPage={recipesPerPage}
          />
        ))}
      </ul>

      <div className={styles.pagination}>
        <Button
          textOnly={false}
          style={{ padding: '0.5rem 1rem' }}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          &larr;
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          textOnly={false}
          style={{ padding: '0.5rem 1rem' }}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
        >
          &rarr;
        </Button>
      </div>
    </div>
  );
}

export default RecipeList;
