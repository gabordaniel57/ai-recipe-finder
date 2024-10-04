import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../css/Search.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useSearch } from '../hooks/useSearch';

const Search: React.FC = () => {
  const { query, setQuery, handleSubmit } = useSearch();
  const wasSubmitted: boolean = useSelector(
    (state: RootState) => state.recipes.wasSubmitted
  );

  return (
    <div className="search sticky-content">
      <div className="input-wrapper">
        <input
          disabled={wasSubmitted}
          type="text"
          placeholder="What do you feel like eating?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={() => handleSubmit()}>
          {wasSubmitted ? (
            <FontAwesomeIcon icon={faTimes} color="#1E1E1E" />
          ) : (
            <FontAwesomeIcon icon={faSearch} color="#1E1E1E" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Search;
