import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import { fetchRecipes } from '../api/recipeAPI';
import {
  clearMessages,
  setRecipes,
  setSpinner,
  setWasSubmitted,
  updateMessages,
} from '../store/recipeSlice';
import { Message, Recipe, ResponseDataType } from '../typescript/recipe';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const wasSubmitted: boolean = useSelector(
    (state: RootState) => state.recipes.wasSubmitted
  );
  const messages: Message[] = useSelector(
    (state: RootState) => state.recipes.messages
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (wasSubmitted) {
      dispatch(setWasSubmitted(false));
      setQuery('');
    } else {
      if (!query) {
        toast.error('Please enter something to search.');
        return;
      }

      dispatch(clearMessages());
      dispatch(setSpinner(true));
      dispatch(setWasSubmitted(true));

      try {
        let newMessage: Message = {
          role: 'user',
          content: query,
        };
        dispatch(updateMessages(newMessage));

        let responseData: ResponseDataType = await fetchRecipes([
          ...messages,
          newMessage,
        ]);

        let allRecipes = processRecipes(responseData, dispatch);

        dispatch(setRecipes(allRecipes));
        navigate('/suggested');
        dispatch(setSpinner(false));
      } catch (err: any) {
        console.log('err', err);

        switch (err.status) {
          case 401:
            toast.error('Invalid API key.');
            break;
          case 400:
            toast.error('No recipes found. Try refining your search.');
            break;
          default:
            toast.error('Something went rong. Please try again later.');
        }

        dispatch(setWasSubmitted(false));
        dispatch(setSpinner(false));
      }
    }
  };

  const handleGetOtherRecipes = async () => {
    dispatch(setSpinner(true));
    dispatch(setWasSubmitted(true));

    try {
      let newMessage: Message = {
        role: 'user',
        content: 'try again',
      };
      dispatch(updateMessages(newMessage));

      let responseData: ResponseDataType = await fetchRecipes([
        ...messages,
        newMessage,
      ]);

      let allRecipes = processRecipes(responseData, dispatch);

      dispatch(setRecipes(allRecipes));

      navigate('/suggested');
      dispatch(setSpinner(false));
    } catch (err: any) {
      switch (err.status) {
        case 401:
          toast.error('Invalid API key.');
          break;
        case 400:
          toast.error('No recipes found. Try refining your search.');
          break;
        default:
          toast.error('Something went rong. Please try again later.');
      }

      dispatch(setWasSubmitted(false));
      dispatch(setSpinner(false));
    }
  };

  // Helper function to handle recipe processing
  const processRecipes = (
    responseData: ResponseDataType,
    dispatch: AppDispatch
  ) => {
    let allRecipes: Recipe[] = [];

    responseData.choices.forEach((choice) => {
      dispatch(updateMessages(choice.message));

      let recipes: Recipe[] = JSON.parse(choice.message.content).recipes;
      recipes.forEach((recipe) => {
        recipe.id = uuid();
        allRecipes.push(recipe);
      });
    });

    return allRecipes;
  };

  return {
    query,
    setQuery,
    handleSubmit,
    handleGetOtherRecipes,
  };
};
