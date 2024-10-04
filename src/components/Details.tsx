import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import AddOrRemoveFavoriteButton from './AddOrRemoveFavoriteButton';

const Details: React.FC = () => {
  const selectedRecipe = useSelector(
    (state: RootState) => state.recipes.selectedRecipe
  );

  if (!selectedRecipe) return null;

  return (
    <div className="container row p-0">
      <div className="col-md-6 sticky-content">
        <div className="default-image-details" />

        <div className="w-100 d-flex jstify-content-between mt-3 mb-2">
          <div>
            <h5>{selectedRecipe.title}</h5>
            <p className="m-0">{selectedRecipe.minutes} min.</p>
          </div>

          <AddOrRemoveFavoriteButton recipe={selectedRecipe} />
        </div>
      </div>

      <div className="col-md-6 overflow-auto mt-4">
        <h5>Ingredients:</h5>
        <ul>
          {selectedRecipe?.ingredients?.map(
            (ingredient: string, index: number) => (
              <li key={index}>{ingredient}</li>
            )
          )}
        </ul>

        <h5>Instructions:</h5>
        <ol>
          {selectedRecipe?.instructions?.map(
            (instruction: string, index: number) => (
              <li key={index}>{instruction}</li>
            )
          )}
        </ol>
      </div>
    </div>
  );
};

export default Details;
