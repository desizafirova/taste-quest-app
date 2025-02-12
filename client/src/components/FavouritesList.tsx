import { useFavourites } from '../contexts/FavouritesContext';
import styles from './FavouritesList.module.css';
import RecipeCard from './RecipeCard';

function FavouritesList() {
  const { favourites } = useFavourites();

  return (
    <div>
      <h1 className={styles.title}>Favourites List</h1>
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
    </div>
  );
}

export default FavouritesList;
