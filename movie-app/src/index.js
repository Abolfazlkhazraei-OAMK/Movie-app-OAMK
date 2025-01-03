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
import GroupCreate from './components/GroupCreate';
import GroupDetails from './components/GroupDetails';
import JoinRequests from './components/JoinRequests';
import GroupMembers from './components/GroupMembers';
//import Community from './components/Community';
import GroupCreateComponent from './components/GroupCreate';
import Search from './components/Search';
import DeleteAccount from './components/deleteAccount.jsx';

// **New Import for Profile**
import Profile from './pages/Profile';

import ProfilePage from './pages/ProfilePage';
import GroupChat from './pages/GroupChat';

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
    path: "/users/:userId",
    element: <ProfilePage />
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
    element: <GroupCreate/>
  },
  {
    path: "/community/group/:groupId",
    element: <GroupDetails />,
  },
  {
    path: "/community/group/:groupId/requests",
    element: <JoinRequests />,
  },
  {
    path: "/community/group/:groupId/members",
    element: <GroupMembers />,
  },
  {
    path: "/community/group/:groupId/chat",
    element: <GroupChat />
  },
  // **New Route for Profile Page**
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/delete-account",
    element: <DeleteAccount />
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
