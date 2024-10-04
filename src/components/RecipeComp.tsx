import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { selectRecipe } from '../store/recipeSlice';
import { Recipe } from '../typescript/recipe';
import { useNavigate } from 'react-router-dom';
import AddOrRemoveFavoriteButton from './AddOrRemoveFavoriteButton';

const RecipeComp = (props: { recipe: Recipe }) => {
  const { recipe } = props;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <div key={recipe.id} className="col-12 mb-3">
      <div className="item-card">
        <div className="default-image" />

        <div
          className="w-100 pointer"
          onClick={() => {
            dispatch(selectRecipe(recipe.id));
            navigate(`/details/${recipe.id}`);
          }}
        >
          <h5>{recipe.title}</h5>
          <p className="m-0">{recipe.minutes} min.</p>
        </div>

        <AddOrRemoveFavoriteButton recipe={recipe} />
      </div>
    </div>
  );
};

export default RecipeComp;
