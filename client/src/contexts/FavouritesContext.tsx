import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';

type FRecipe = {
  id: number | string;
  title: string;
  image: string;
};

type FavouritesState = FRecipe[];
type FavouritesAction =
  | { type: 'ADD'; recipe: FRecipe } // Accepts full recipe object
  | { type: 'REMOVE'; id: string | number };

const FavouritesContext = createContext<{
  favourites: FavouritesState;
  addFavourite: (recipe: FRecipe) => void;
  removeFavourite: (id: string | number) => void;
} | null>(null);

const favouritesReducer = (
  state: FavouritesState,
  action: FavouritesAction
): FavouritesState => {
  switch (action.type) {
    case 'ADD':
      return state.some((recipe) => recipe.id === action.recipe.id)
        ? state
        : [...state, action.recipe];
    case 'REMOVE':
      return state.filter((recipe) => recipe.id !== action.id);
    default:
      return state;
  }
};

export function FavouritesProvider({ children }: { children: ReactNode }) {
  // Load favourites from localStorage if available
  const savedFavourites = localStorage.getItem('favourites');
  const initialFavourites: FavouritesState = savedFavourites
    ? JSON.parse(savedFavourites)
    : [];

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    initialFavourites
  );

  // Sync favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]); // Runs every time favourites change

  const addFavourite = (recipe: FRecipe) => dispatch({ type: 'ADD', recipe });
  const removeFavourite = (id: string | number) =>
    dispatch({ type: 'REMOVE', id });

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
}
