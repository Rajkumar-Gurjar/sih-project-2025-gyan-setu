import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './components/layouts/MainLayout/MainLayout';
import { AuthLayout } from './components/layouts/AuthLayout/AuthLayout';
import { LessonViewerLayout } from './components/layouts/LessonViewerLayout/LessonViewerLayout';
import { Home } from './components/pages/Home/Home';
import { Login } from './components/pages/Login/Login';
import { SignUp } from './components/pages/SignUp/SignUp';
import { LessonViewer } from './components/pages/LessonViewer/LessonViewer';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'lessons',
        element: <div className="p-4 text-2xl">Lessons Page (Coming Soon)</div>,
      },
      {
        path: 'downloads',
        element: <div className="p-4 text-2xl">Downloads Page (Coming Soon)</div>,
      },
      {
        path: 'progress',
        element: <div className="p-4 text-2xl">Progress Page (Coming Soon)</div>,
      },
      {
        path: 'profile',
        element: <div className="p-4 text-2xl">Profile Page (Coming Soon)</div>,
      },
    ],
  },
  {
    path: '/view',
    element: <LessonViewerLayout />,
    children: [
      {
        path: ':id',
        element: <LessonViewer />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '*',
    element: <div className="min-h-screen flex items-center justify-center text-3xl">404 - Page Not Found</div>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
