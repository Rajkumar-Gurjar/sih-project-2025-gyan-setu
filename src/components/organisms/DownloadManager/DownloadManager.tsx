import React, { useEffect, useState } from 'react';
import { db } from '../../../services/storage/dexie.db';
import type { Lesson } from '../../../types';
import { useContentDownload } from '../../../hooks/useContentDownload';
import { Trash2, Download, RefreshCw } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';

const DownloadItem: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const { isDownloading, progress, downloadLesson, removeDownload } = useContentDownload(lesson);

  return (
    <div className="flex flex-col p-4 border-b border-base-300 last:border-b-0 gap-2">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-sm line-clamp-1">{lesson.title.en}</h4>
          <p className="text-xs text-base-content/70">{lesson.subject} • Grade {lesson.grade}</p>
        </div>
        <div className="flex items-center gap-2">
          {lesson.downloadStatus === 'pending' || isDownloading ? (
            <div className="flex items-center gap-2 text-primary">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-xs font-medium">{progress}%</span>
            </div>
          ) : lesson.downloadStatus === 'downloaded' ? (
            <button 
              onClick={removeDownload}
              className="btn btn-ghost btn-xs text-error tooltip tooltip-left" 
              data-tip="Remove Download"
              aria-label="Remove Download"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={downloadLesson}
              className="btn btn-ghost btn-xs text-primary tooltip tooltip-left" 
              data-tip="Download"
              aria-label="Download"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      {(isDownloading || lesson.downloadStatus === 'pending') && (
        <progress className="progress progress-primary w-full h-1" value={progress} max="100"></progress>
      )}
    </div>
  );
};

export const DownloadManager: React.FC = () => {
  const downloadingOrDownloadedLessons = useLiveQuery(
    () => db.lessons
      .where('downloadStatus')
      .anyOf(['pending', 'downloaded'])
      .toArray(),
    []
  );

  const [usage, setUsage] = useState<number>(0);

  useEffect(() => {
    const calculateUsage = async () => {
      if (!downloadingOrDownloadedLessons) return;
      const total = downloadingOrDownloadedLessons.reduce((acc, lesson) => {
        return acc + lesson.media.reduce((sum, m) => sum + (m.size || 0), 0);
      }, 0);
      setUsage(total);
    };
    calculateUsage();
  }, [downloadingOrDownloadedLessons]);

  const usageMB = (usage / (1024 * 1024)).toFixed(1);
  const limitMB = 500;
  const usagePercentage = Math.min((usage / (limitMB * 1024 * 1024)) * 100, 100);

  if (!downloadingOrDownloadedLessons) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden max-w-md w-full">
      <div className="card-body p-0">
        <div className="p-4 bg-base-200/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="card-title text-base font-bold">Downloads</h3>
            <span className="text-xs font-medium">{usageMB} MB / {limitMB} MB</span>
          </div>
          <progress className={`progress w-full ${usagePercentage > 90 ? 'progress-error' : 'progress-primary'}`} value={usagePercentage} max="100"></progress>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {downloadingOrDownloadedLessons.length === 0 ? (
            <div className="p-8 text-center text-base-content/50">
              <Download className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p className="text-sm">No downloads yet</p>
            </div>
          ) : (
            downloadingOrDownloadedLessons.map((lesson) => (
              <DownloadItem key={lesson.id} lesson={lesson} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};