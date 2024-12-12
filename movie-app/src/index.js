import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import ErrorPage from './pages/ErrorPage';
import AllMovies from './components/AllMovies';
import MovieDetail from './components/MovieDetail';
import Showtime from './components/Showtime';
//import Community from './components/Community';
import GroupCreateComponent from './components/GroupCreate';
import Search from './components/Search';

// **New Import for Profile**
import Profile from './pages/Profile';


const router = createBrowserRouter([
 {
     errorElement: <ErrorPage />
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/movies",
    element: <AllMovies />,
  },
  {
    path: "/movies/:id",
    element: <MovieDetail />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/showtime",
    element: <Showtime />,
  },
  {
    path: "/community",
    element: <GroupCreateComponent />,
  },
  // **New Route for Profile Page**
  {
    path: "/profile",
    element: <Profile />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </React.StrictMode>
);


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
