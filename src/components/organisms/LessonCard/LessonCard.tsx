import React from 'react';
import type { Lesson } from '../../../types';
import { useContentDownload } from '../../../hooks/useContentDownload';
import { Download, CheckCircle, Clock, Trash2 } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  onView?: (lesson: Lesson) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onView }) => {
  const { isDownloading, progress, downloadLesson, removeDownload } = useContentDownload(lesson);

  const getStatusBadge = () => {
    switch (lesson.downloadStatus) {
      case 'downloaded':
        return (
          <div className="badge badge-success gap-1 text-xs">
            <CheckCircle className="w-3 h-3" />
            Offline Ready
          </div>
        );
      case 'pending':
      case (isDownloading ? 'pending' : ''):
        return (
          <div className="badge badge-warning gap-1 text-xs">
            <Clock className="w-3 h-3 animate-pulse" />
            {progress}%
          </div>
        );
      default:
        return (
          <div className="badge badge-ghost gap-1 text-xs opacity-50">
            Online Only
          </div>
        );
    }
  };

  return (
    <div className="card card-compact bg-base-100 shadow-xl border border-base-200 hover:border-primary/50 transition-colors group">
      <figure className="aspect-video bg-base-300 relative">
        <div className="absolute top-2 right-2 z-10">
          {getStatusBadge()}
        </div>
        <div className="flex items-center justify-center w-full h-full text-base-content/20">
          <Download className="w-12 h-12" />
        </div>
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h2 className="card-title text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {lesson.title.en}
            </h2>
            <p className="text-xs text-base-content/60 mt-1">
              {lesson.subject} • Grade {lesson.grade}
            </p>
          </div>
        </div>
        
        <div className="card-actions justify-between items-center mt-2">
          <button 
            onClick={() => onView?.(lesson)}
            className="btn btn-primary btn-sm px-4"
          >
            Start Learning
          </button>
          
          <div className="flex gap-1">
            {lesson.downloadStatus === 'downloaded' ? (
              <button 
                onClick={(e) => { e.stopPropagation(); removeDownload(); }}
                className="btn btn-ghost btn-sm btn-square text-error"
                title="Remove Offline Content"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={(e) => { e.stopPropagation(); downloadLesson(); }}
                className={`btn btn-ghost btn-sm btn-square text-primary ${isDownloading ? 'loading' : ''}`}
                disabled={isDownloading}
                title="Download for Offline"
              >
                {!isDownloading && <Download className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
      {(isDownloading || lesson.downloadStatus === 'pending') && (
        <progress className="progress progress-primary w-full h-1 absolute bottom-0 rounded-none" value={progress} max="100"></progress>
      )}
    </div>
  );
};