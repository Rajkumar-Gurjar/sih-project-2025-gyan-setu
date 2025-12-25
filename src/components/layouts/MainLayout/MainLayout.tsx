import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../../organisms/Header/Header';
import { SideBar } from '../../organisms/SideBar/SideBar';
import { Footer } from '../../organisms/Footer/Footer';
import { useAuthStore } from '../../../store/useAuthStore';

export const MainLayout: React.FC = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen flex flex-col bg-base-100">
            <Header />
            <div className="flex flex-1">
                <SideBar />
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};
