import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addToFavorites, removeFromFavorites } from '../store/recipeSlice';
import { Recipe } from '../typescript/recipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const AddOrRemoveFavoriteButton = (props: { recipe: Recipe }) => {
  const { recipe } = props;
  const favorites = useSelector((state: RootState) => state.recipes.favorites);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="pointer">
      {favorites.find((favRecipe) => favRecipe.id === recipe.id) ? (
        <FontAwesomeIcon
          icon={solidHeart}
          color="#65558f"
          onClick={() => dispatch(removeFromFavorites(recipe))}
        />
      ) : (
        <FontAwesomeIcon
          icon={regularHeart}
          color="#65558f"
          onClick={() => dispatch(addToFavorites(recipe))}
        />
      )}
    </div>
  );
};

export default AddOrRemoveFavoriteButton;
