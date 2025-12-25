import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LessonViewerLayout } from './LessonViewerLayout';
import { describe, it, expect } from 'vitest';

describe('LessonViewerLayout', () => {
    it('renders the layout with header and outlet content', () => {
        render(
            <MemoryRouter initialEntries={['/view/1']}>
                <Routes>
                    <Route path="/view" element={<LessonViewerLayout />}>
                        <Route path=":id" element={<div>Lesson Content</div>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Lesson Viewer')).toBeInTheDocument();
        expect(screen.getByText('Lesson Content')).toBeInTheDocument();
        expect(screen.getByLabelText('Go back')).toBeInTheDocument();
    });

    it('navigates back when the back button is clicked', async () => {
        const user = userEvent.setup();
        
        render(
            <MemoryRouter initialEntries={['/home', '/view/1']} initialIndex={1}>
                <Routes>
                    <Route path="/home" element={<div>Home Page</div>} />
                    <Route path="/view" element={<LessonViewerLayout />}>
                        <Route path=":id" element={<div>Lesson Content</div>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        const backButton = screen.getByLabelText('Go back');
        await user.click(backButton);

        // After clicking back, we should be at Home Page
        expect(await screen.findByText('Home Page')).toBeInTheDocument();
    });
});
