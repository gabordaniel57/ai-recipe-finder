import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Search from './components/Search';
import './App.css';
import Favorites from './components/Favorites';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './components/Spinner';
import { RootState } from './store';
import { useSelector } from 'react-redux';
import Suggested from './components/Suggested';
import Details from './components/Details';

const App: React.FC = () => {
  const isSpinnerActive = useSelector(
    (state: RootState) => state.recipes.isSpinnerActive
  );

  return (
    <Router>
      <div className="App">
        <Search />
        <Routes>
          <Route path="/" element={<Navigate to="/favorites" replace />} />
          <Route path="/suggested" element={<Suggested />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {isSpinnerActive && <Spinner />}
      </div>
    </Router>
  );
};

export default App;
