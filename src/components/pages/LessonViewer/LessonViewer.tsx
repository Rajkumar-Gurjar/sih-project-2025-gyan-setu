import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMultilingual } from '../../../hooks/useMultilingual';
import { db } from '../../../services/storage/dexie.db';
import type { Lesson } from '../../../types';

/**
 * LessonViewer component displays the content of a specific lesson.
 * It supports hot-reloading of content based on the current language selection.
 */
export const LessonViewer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getLocalized } = useMultilingual();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLesson = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await db.lessons.get(id);
                if (data) {
                    setLesson(data);
                    // Update last accessed timestamp for LRU logic
                    await db.lessons.update(id, { lastAccessed: Date.now() });
                } else {
                    setError('Lesson not found');
                }
            } catch (err) {
                console.error('Failed to fetch lesson:', err);
                setError('Failed to load lesson');
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 space-y-4">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-base-content opacity-70">Loading lesson content...</p>
            </div>
        );
    }

    if (error || !lesson) {
        return (
            <div className="alert alert-error shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error || 'Lesson not found'}</span>
            </div>
        );
    }

    // Hot-reloading: pick localized content using the hook
    const title = getLocalized(lesson.title) || 'Untitled Lesson';
    const content = getLocalized(lesson.content) || 'No content available.';

    return (
        <article className="animate-in fade-in duration-500">
            <header className="mb-8">
                <div className="flex flex-wrap gap-2 mb-3">
                    <div className="badge badge-primary uppercase tracking-wider text-xs font-bold">
                        {lesson.subject}
                    </div>
                    <div className="badge badge-outline uppercase tracking-wider text-xs font-bold">
                        Grade {lesson.grade}
                    </div>
                    {lesson.downloadStatus === 'downloaded' && (
                        <div className="badge badge-success gap-1 text-xs">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-3 h-3 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                             Offline Ready
                        </div>
                    )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-base-content leading-tight">
                    {title}
                </h1>
            </header>

            <div className="prose prose-lg max-w-none text-base-content/90 leading-relaxed mb-12">
                {typeof content === 'string' ? (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                    <div className="bg-base-200 p-4 rounded-lg font-mono text-sm overflow-auto">
                         {JSON.stringify(content, null, 2)}
                    </div>
                )}
            </div>
            
            {lesson.media && lesson.media.length > 0 && (
                <section className="mt-12 space-y-6">
                    <h2 className="text-2xl font-bold border-b border-base-200 pb-2">Media Materials</h2>
                    <div className="grid grid-cols-1 gap-8">
                        {lesson.media.map((item, idx) => (
                            <div key={idx} className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
                                {item.type === 'image' && (
                                    <figure>
                                        <img src={item.url} alt={`Lesson media ${idx}`} className="w-full object-cover" />
                                    </figure>
                                )}
                                {item.type === 'video' && (
                                    <div className="aspect-video bg-black">
                                        <video controls className="w-full h-full">
                                            <source src={item.url} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                )}
                                <div className="card-body p-4 bg-base-200/30">
                                    <div className="flex justify-between items-center text-xs opacity-60">
                                        <span className="font-semibold uppercase">{item.type}</span>
                                        <span>Size: {(item.size / (1024 * 1024)).toFixed(2)} MB</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <footer className="mt-16 pt-8 border-t border-base-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-xs opacity-50">Lesson ID: {lesson.id} • Refreshed: {new Date(lesson.lastAccessed).toLocaleTimeString()}</p>
                <div className="flex gap-4 w-full sm:w-auto">
                    <button className="btn btn-primary flex-1 sm:flex-none px-8">
                        Take Lesson Quiz
                    </button>
                </div>
            </footer>
        </article>
    );
};
