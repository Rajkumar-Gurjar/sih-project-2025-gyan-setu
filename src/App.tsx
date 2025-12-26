import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { StudentDashboardLayout } from './components/layouts/StudentDashboardLayout/StudentDashboardLayout';
import { TeacherDashboardLayout } from './components/layouts/TeacherDashboardLayout/TeacherDashboardLayout';
import { AuthLayout } from './components/layouts/AuthLayout/AuthLayout';
import { LessonViewerLayout } from './components/layouts/LessonViewerLayout/LessonViewerLayout';
import { Spinner } from './components/atoms/Spinner/Spinner';
import './App.css';

import ErrorPage from './components/pages/ErrorPage';

// Lazy load page components
const Home = lazy(() => import('./components/pages/Home/Home').then(module => ({ default: module.Home })));
const Login = lazy(() => import('./components/pages/Login/Login').then(module => ({ default: module.Login })));
const SignUp = lazy(() => import('./components/pages/SignUp/SignUp').then(module => ({ default: module.SignUp })));
const LessonViewer = lazy(() => import('./components/pages/LessonViewer/LessonViewer').then(module => ({ default: module.LessonViewer })));
const StudentDashboard = lazy(() => import('./components/pages/StudentDashboard/StudentDashboard').then(module => ({ default: module.StudentDashboard })));
const TeacherDashboard = lazy(() => import('./components/pages/TeacherDashboard/TeacherDashboard').then(module => ({ default: module.TeacherDashboard })));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><Spinner /></div>}>
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <SuspenseWrapper><Home /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <SuspenseWrapper><Login /></SuspenseWrapper>,
      },
    ],
  },
  {
    path: 'signup',
    element: <SuspenseWrapper><SignUp /></SuspenseWrapper>,
  },
  {
    path: '/app',
    element: <StudentDashboardLayout />,
    children: [
      {
        path: 'dashboard',
        element: <SuspenseWrapper><StudentDashboard /></SuspenseWrapper>,
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
      {
        path: 'library',
        element: <div className="p-4 text-2xl">Library Page (Coming Soon)</div>,
      },
      {
        path: 'achievements',
        element: <div className="p-4 text-2xl">Achievements Page (Coming Soon)</div>,
      },
      {
        path: 'settings',
        element: <div className="p-4 text-2xl">Settings Page (Coming Soon)</div>,
      },
    ],
  },
  {
    path: '/teacher',
    element: <TeacherDashboardLayout />,
    children: [
      {
        path: 'dashboard',
        element: <SuspenseWrapper><TeacherDashboard /></SuspenseWrapper>,
      },
      {
        path: 'students',
        element: <div className="p-4 text-2xl">Students Page (Coming Soon)</div>,
      },
      {
        path: 'lessons',
        element: <div className="p-4 text-2xl">Lessons Page (Coming Soon)</div>,
      },
      {
        path: 'reports',
        element: <div className="p-4 text-2xl">Reports Page (Coming Soon)</div>,
      },
      {
        path: 'settings',
        element: <div className="p-4 text-2xl">Settings Page (Coming Soon)</div>,
      },
    ],
  },
  {
    path: '/view',
    element: <LessonViewerLayout />,
    children: [
      {
        path: ':id',
        element: <SuspenseWrapper><LessonViewer /></SuspenseWrapper>,
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
