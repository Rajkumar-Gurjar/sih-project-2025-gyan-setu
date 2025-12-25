import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LessonViewer } from './LessonViewer';
import { db } from '../../../services/storage/dexie.db';
import type { Lesson } from '../../../types';
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import i18n from '../../../i18n/config';

const mockLesson: Lesson = {
    id: '1',
    title: {
        en: 'English Title',
        hi: 'Hindi Title',
        pa: 'Punjabi Title'
    },
    content: {
        en: 'English Content',
        hi: 'Hindi Content',
        pa: 'Punjabi Content'
    },
    media: [
        { type: 'image', url: 'test.jpg', size: 1024 * 1024 }
    ],
    subject: 'Math',
    grade: 5,
    downloadStatus: 'downloaded',
    lastAccessed: Date.now()
};

describe('LessonViewer', () => {
    beforeEach(async () => {
        await db.lessons.clear();
        await db.lessons.add(mockLesson);
        await i18n.changeLanguage('en');
    });

    afterAll(async () => {
        await db.lessons.clear();
    });

    it('renders localized content and handles loading state', async () => {
        render(
            <MemoryRouter initialEntries={['/view/1']}>
                <Routes>
                    <Route path="/view/:id" element={<LessonViewer />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Loading lesson content/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('English Title')).toBeInTheDocument();
            expect(screen.getByText('English Content')).toBeInTheDocument();
            expect(screen.getByText(/Math/)).toBeInTheDocument();
            expect(screen.getByText(/Grade 5/)).toBeInTheDocument();
        });
    });

    it('hot-reloads content when language changes', async () => {
        render(
            <MemoryRouter initialEntries={['/view/1']}>
                <Routes>
                    <Route path="/view/:id" element={<LessonViewer />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('English Title')).toBeInTheDocument();
        });

        // Act: Change language to Hindi
        await i18n.changeLanguage('hi');

        // Assert: Content should update instantly (hot-reloading)
        await waitFor(() => {
            expect(screen.getByText('Hindi Title')).toBeInTheDocument();
            expect(screen.getByText('Hindi Content')).toBeInTheDocument();
        });

        // Act: Change language to Punjabi
        await i18n.changeLanguage('pa');

        // Assert: Content should update again
        await waitFor(() => {
            expect(screen.getByText('Punjabi Title')).toBeInTheDocument();
            expect(screen.getByText('Punjabi Content')).toBeInTheDocument();
        });
    });

    it('shows error if lesson not found', async () => {
        render(
            <MemoryRouter initialEntries={['/view/999']}>
                <Routes>
                    <Route path="/view/:id" element={<LessonViewer />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Lesson not found')).toBeInTheDocument();
        });
    });
});
