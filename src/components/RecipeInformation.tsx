import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { fetchRecipe } from '../services/api';
import Spinner from './Spinner';

function RecipeInformation() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipe(id!),
    enabled: !!id, // Only run the query if "id" is truthy
  });
  console.log(data);

  if (isLoading) return <Spinner />;
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return <div>Recipe</div>;
}

export default RecipeInformation;
