import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

const App = () => {
  return (
    <>
      {/* This automatically handles rendering the correct page 
        based on the URL in the browser 
      */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;