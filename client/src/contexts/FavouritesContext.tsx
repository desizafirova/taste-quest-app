import { createContext, ReactNode, useContext, useReducer } from 'react';

type FavouritesContextProps = {
  favourites: string[];
  addFavourite: (recipeId: string) => void;
  removeFavourite: (recipeId: string) => void;
};

type FavouritesState = string[];
type FavouritesAction =
  | { type: 'ADD'; id: string }
  | { type: 'REMOVE'; id: string };

function favouritesReducer(state: FavouritesState, action: FavouritesAction) {
  switch (action.type) {
    case 'ADD':
      return state.includes(action.id) ? state : [...state, action.id];
    case 'REMOVE':
      return state.filter((id) => id !== action.id);
    default:
      return state;
  }
}

const FavouritesContext = createContext<FavouritesContextProps | null>(null);

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [favourites, dispatch] = useReducer(favouritesReducer, []);

  function addFavourite(id: string) {
    dispatch({ type: 'ADD', id });
  }

  function removeFavourite(id: string) {
    dispatch({ type: 'REMOVE', id });
  }

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
