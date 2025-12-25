import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useProgressStore } from '../../../store/useProgressStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { useMultilingual } from '../../../hooks/useMultilingual';
import { db } from '../../../services/storage/dexie.db';
import type { Lesson } from '../../../types';
import { CheckCircle, Clock, Trophy, BookOpen } from 'lucide-react';

/**
 * ProgressDashboard provides a visual summary of the student's learning progress,
 * including completed lessons, quiz scores, and recent activity.
 */
export const ProgressDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { progress, fetchProgress, isLoading } = useProgressStore();
  const { getLocalized } = useMultilingual();
  const [lessons, setLessons] = useState<Record<string, Lesson>>({});

  useEffect(() => {
    if (user) {
      fetchProgress(user.id);
      
      // Fetch lessons from local DB to map IDs to titles
      db.lessons.toArray().then((allLessons) => {
        const lessonMap = allLessons.reduce((acc, l) => {
          acc[l.id] = l;
          return acc;
        }, {} as Record<string, Lesson>);
        setLessons(lessonMap);
      });
    }
  }, [user, fetchProgress]);

  // Calculate summary statistics
  const stats = useMemo(() => {
    const values = Object.values(progress);
    const completed = values.filter((p) => p.status === 'completed').length;
    const totalScore = values.reduce((sum, p) => sum + (p.score || 0), 0);
    const avgScore = values.length > 0 ? Math.round(totalScore / values.length) : 0;

    return {
      completed,
      avgScore,
      totalTracked: values.length,
    };
  }, [progress]);

  // Sort by last accessed and limit to recent 5
  const recentProgress = useMemo(() => {
    return Object.values(progress)
      .sort((a, b) => b.lastAccessed - a.lastAccessed)
      .slice(0, 5);
  }, [progress]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12 min-h-[300px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-base-content flex gap-2 items-center">
          <BookOpen className="text-primary" />
          {t('progress.title')}
        </h2>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="stats shadow bg-base-100 border border-base-200">
          <div className="stat">
            <div className="stat-figure text-primary">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="stat-title text-xs uppercase font-bold tracking-wider opacity-60">
              {t('progress.lessonsCompleted')}
            </div>
            <div className="stat-value text-primary">{stats.completed}</div>
            <div className="stat-desc font-medium">Out of {stats.totalTracked} started</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100 border border-base-200">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <Trophy className="w-10 h-10" />
            </div>
            <div className="stat-title text-xs uppercase font-bold tracking-wider opacity-60">
              {t('progress.averageScore')}
            </div>
            <div className="stat-value text-secondary">{stats.avgScore}%</div>
            <div className="stat-desc font-medium">Across all quizzes</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100 border border-base-200 lg:col-span-1 md:col-span-2">
          <div className="stat">
            <div className="stat-figure text-accent opacity-50">
              <Clock className="w-10 h-10" />
            </div>
            <div className="stat-title text-xs uppercase font-bold tracking-wider opacity-60">
              Learning Streak
            </div>
            <div className="stat-value text-accent opacity-50">--</div>
            <div className="stat-desc font-medium italic">Available in next update</div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="card bg-base-100 shadow-sm border border-base-200 overflow-hidden">
        <div className="card-body p-0">
          <div className="bg-base-200/50 p-4 border-b border-base-200">
            <h3 className="card-title text-lg">{t('progress.recentActivity')}</h3>
          </div>
          
          {recentProgress.length === 0 ? (
            <div className="text-center py-16 px-6 text-base-content/40">
              <div className="mb-4 flex justify-center">
                <BookOpen className="w-12 h-12 opacity-20" />
              </div>
              <p className="max-w-xs mx-auto">
                No progress recorded yet. Start exploring lessons to see your growth here!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-base-100">
                  <tr>
                    <th className="bg-transparent">Lesson</th>
                    <th className="bg-transparent text-center">Status</th>
                    <th className="bg-transparent">Latest Score</th>
                    <th className="bg-transparent hidden sm:table-cell text-right">Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProgress.map((p) => {
                    const lesson = lessons[p.lessonId];
                    return (
                      <tr key={p.lessonId} className="hover">
                        <td className="py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-base leading-tight">
                              {lesson ? getLocalized(lesson.title) : 'Unknown Lesson'}
                            </span>
                            <span className="text-xs opacity-60 mt-0.5">
                              {lesson?.subject} • Grade {lesson?.grade}
                            </span>
                          </div>
                        </td>
                        <td className="text-center">
                          {p.status === 'completed' ? (
                            <span className="badge badge-success badge-sm gap-1 py-3 px-3">
                              <CheckCircle className="w-3 h-3" />
                              {t('progress.completed')}
                            </span>
                          ) : (
                            <span className="badge badge-warning badge-sm gap-1 py-3 px-3">
                              <Clock className="w-3 h-3" />
                              {t('progress.inProgress')}
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between gap-4 max-w-[150px]">
                              <progress 
                                className={`progress h-2 w-full ${
                                  p.score >= 80 ? 'progress-success' : 
                                  p.score >= 50 ? 'progress-warning' : 
                                  'progress-error'
                                }`} 
                                value={p.score} 
                                max="100"
                              ></progress>
                              <span className="text-xs font-mono font-bold">{p.score}%</span>
                            </div>
                          </div>
                        </td>
                        <td className="hidden sm:table-cell text-right text-xs opacity-60 font-medium">
                          {new Date(p.lastAccessed).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};