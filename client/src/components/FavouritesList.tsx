import { useFavourites } from '../contexts/FavouritesContext';
import styles from './FavouritesList.module.css';
import RecipeCard from './RecipeCard';

function FavouritesList() {
  const { favourites } = useFavourites();

  return (
    <div>
      <h1 className={styles.title}>Favourites List</h1>
      {favourites.length ? (
        <ul className={styles.list}>
          {favourites.map((favourite) => (
            <RecipeCard
              key={favourite.id}
              id={favourite.id}
              image={favourite.image}
              title={favourite.title}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.p}>No recipes in the Favourites list... 🙄</p>
      )}
    </div>
  );
}

export default FavouritesList;
