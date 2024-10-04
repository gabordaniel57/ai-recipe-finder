import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, Recipe } from '../typescript/recipe';
import { toast } from 'react-toastify';

interface RecipeState {
  recipes: Recipe[];
  favorites: Recipe[];
  selectedRecipe: Recipe | null;
  isSpinnerActive: boolean;
  messages: Message[];
  wasSubmitted: boolean;
}

const initialState: RecipeState = {
  recipes: [],
  favorites: [],
  selectedRecipe: null,
  isSpinnerActive: false,
  messages: [
    {
      role: 'system',
      content:
        'Return multiple recipes based on user input. JSON { recipes:  { title: string, minutes: string, ingredients: sting[], instructions: string[] }[] }',
    },
  ],
  wasSubmitted: false,
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes(state, action: PayloadAction<Recipe[]>) {
      state.recipes = action.payload;
    },
    selectRecipe(state, action: PayloadAction<string>) {
      state.selectedRecipe =
        state.recipes.find((recipe) => recipe.id === action.payload) ??
        state.favorites.find((recipe) => recipe.id === action.payload) ??
        null;
    },
    addToFavorites(state, action: PayloadAction<Recipe>) {
      if (!state.favorites.some((fav) => fav.id === action.payload.id)) {
        state.favorites.push(action.payload);
        toast.success(`${action.payload.title} recipe was added to favorites!`);
      }
    },
    removeFromFavorites(state, action: PayloadAction<Recipe>) {
      state.favorites = state.favorites.filter(
        (fav) => fav.id !== action.payload.id
      );
      toast.info(`${action.payload.title} recipe was removed!`);
    },
    clearSelectedRecipe(state) {
      state.selectedRecipe = null;
    },
    setSpinner(state, action: PayloadAction<boolean>) {
      state.isSpinnerActive = action.payload;
    },
    updateMessages(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    clearMessages(state) {
      state.messages = initialState.messages;
    },
    setWasSubmitted(state, action: PayloadAction<boolean>) {
      state.wasSubmitted = action.payload;
    },
  },
});

export const {
  setRecipes,
  selectRecipe,
  addToFavorites,
  removeFromFavorites,
  clearSelectedRecipe,
  setSpinner,
  updateMessages,
  clearMessages,
  setWasSubmitted,
} = recipeSlice.actions;
export default recipeSlice.reducer;
