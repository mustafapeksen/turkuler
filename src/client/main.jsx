import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import Singer from './components/Singer.jsx';
import NotFound from './components/NotFound.jsx';
import HomePage from './components/HomePage.jsx';
import Stories from './components/Stories.jsx';
import SongList from './components/SongList.jsx';

const isAdmin = false; // Admin bilgisini burada belirttik

// Define the routes for the application using createBrowserRouter
const router = createBrowserRouter([{
  path: "/", // Root path
  element: <App />, // Main application component
  errorElement: <NotFound />, // Component to show when route is not found
  children: [ // Nested routes
    {
      path: "", // Default route (home page)
      element: <HomePage /> // HomePage component
    },
    {
      path: "singer", // Path for 'singer' page
      element: <Singer /> // Singer component
    },
    {
      path: "song", // Path for 'song' page
      element: <SongList isAdmin={isAdmin} /> // Song component
    },
    {
      path: "stories", // Path for 'stories' page
      element: <Stories /> // Stories component
    }]
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
