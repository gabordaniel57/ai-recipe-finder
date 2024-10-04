import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Recipe } from '../typescript/recipe';
import { useSearch } from '../hooks/useSearch';
import RecipeComp from './RecipeComp';

const Suggested = () => {
  const recipes: Recipe[] = useSelector(
    (state: RootState) => state.recipes.recipes
  );
  const { handleGetOtherRecipes } = useSearch();

  return (
    <div className="container">
      <h2>Suggested recipes</h2>

      <div className="row">
        {recipes.map((recipe, index) => (
          <RecipeComp key={index} recipe={recipe} />
        ))}

        {recipes.length ? (
          <div className="d-flex justify-content-center">
            <button
              className="button-try-again"
              onClick={handleGetOtherRecipes}
            >
              I don’t like these
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Suggested;
