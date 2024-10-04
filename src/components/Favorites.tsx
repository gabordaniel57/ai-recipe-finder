import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import RecipeComp from './RecipeComp';

const Favorites: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.recipes.favorites);

  return (
    <div className="container">
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet!</p>
      ) : (
        <div className="row">
          {favorites.map((recipe, index) => (
            <RecipeComp key={index} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
