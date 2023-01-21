import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import Contact from './components/Pages/Contact/Contact';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home></Home>
    },
    {
      path:'/contact/:id',
      element: <Contact></Contact>
    }
  ])

  return (
    <div className="App">
       <RouterProvider router={router}>

       </RouterProvider>
    </div>
  );
}

export default App;
