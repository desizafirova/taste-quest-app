import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoShareOutline } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa6';
import { fetchRecipe, fetchRecipes } from '../services/api';
import Spinner from './Spinner';
import { AnalyzedRecipe, FetchedRecipesResponse } from '../types/recipe';
import styles from './RecipeInformation.module.css';

function RecipeInformation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { number = 10, offset = 0 } = location.state || {};
  // Fetch single recipe details
  const {
    data: recipeDetails,
    isLoading: isLoadingRecipeDetails,
    isError: isErrorRecipeDetails,
  } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () =>
      id ? fetchRecipe(id) : Promise.reject(new Error('Recipe ID not found')),
    enabled: !!id, // Only run the query if "id" exists
    staleTime: Infinity,
  });

  // Fetch all recipes
  const {
    data: allRecipes,
    isLoading: isLoadingAllRecipes,
    isError: isErrorAllRecipes,
  } = useQuery<FetchedRecipesResponse>({
    queryKey: ['recipes', { number: 10, offset: 0 }], // Provide default values
    queryFn: () => fetchRecipes({ number, offset }),
  });

  if (isLoadingRecipeDetails || isLoadingAllRecipes) return <Spinner />;

  if (isErrorRecipeDetails || isErrorAllRecipes) {
    return (
      <div>
        <h2>Oops! Something went wrong.</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  // Find current recipe in allRecipes
  const currentRecipe = allRecipes?.results?.find(
    (recipe) => recipe.id.toString() === id
  );
  const currentRecipeTitle = currentRecipe?.title || 'Recipe Not Found';
  const currentRecipeImage = currentRecipe?.image || '';

  // Extract steps safely
  const recipeInstructions: AnalyzedRecipe | undefined = recipeDetails?.[0];
  const steps = recipeInstructions?.steps || [];

  return (
    <main className={styles.main}>
      <div className={styles.titleAndImage}>
        {currentRecipeImage && (
          <img
            src={currentRecipeImage}
            alt={`Photo of ${currentRecipeTitle}`}
            className={styles.recipeImage}
          />
        )}
        <h2 className={styles.title}>{currentRecipeTitle}</h2>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.btn}
          onClick={() => {
            navigate(-1);
          }}
        >
          &larr;
        </button>
        <button
          className={styles.btn}
          onClick={() => {
            navigator.share({
              title: currentRecipeTitle,
              url: `${window.location.origin}/recipes/${id}`,
            });
          }}
        >
          <IoShareOutline />
        </button>
        <button className={styles.btn} onClick={() => {}}>
          <FaRegHeart />
        </button>
      </div>
      <div className={styles.ingredientsAndInstructionsFlex}>
        {/* Ingredients */}
        <div className={styles.flexBox}>
          <h2>Ingredients</h2>
          <div>
            {steps.length > 0 ? (
              <ul className={styles.ingredients}>
                {steps.flatMap((step) =>
                  step.ingredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                  ))
                )}
              </ul>
            ) : (
              <p>No ingredients found.</p>
            )}
          </div>
        </div>
        {/* Instructions */}
        <div className={styles.flexBox}>
          <h2>Instructions</h2>
          {steps.length > 0 ? (
            <ul className={styles.instructions}>
              {steps.map((step) => (
                <li key={step.number}>
                  <h3>Step {step.number}</h3>
                  <p>{step.step}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No instructions available.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default RecipeInformation;
