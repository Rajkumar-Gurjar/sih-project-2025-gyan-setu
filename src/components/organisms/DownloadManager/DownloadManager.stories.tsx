import type { Meta, StoryObj } from '@storybook/react';
import { DownloadManager } from './DownloadManager';
import { db } from '../../../services/storage/dexie.db';
import { useEffect } from 'react';
import type { Lesson } from '../../../types';

const mockLessons: Lesson[] = [
  {
    id: '1',
    title: { en: 'Introduction to Fractions', hi: 'भिन्नों का परिचय', pa: 'ਭਿੰਨਾਂ ਦੀ ਜਾਣ-ਪਛਾਣ' },
    subject: 'Mathematics',
    grade: 5,
    downloadStatus: 'downloaded',
    lastAccessed: Date.now(),
    media: [{ type: 'video', url: 'v1.mp4', size: 50 * 1024 * 1024 }],
    content: { en: '', hi: '', pa: '' }
  },
  {
    id: '2',
    title: { en: 'Solar System', hi: 'सौर मंडल', pa: 'ਸੌਰ ਮੰਡਲ' },
    subject: 'Science',
    grade: 6,
    downloadStatus: 'pending',
    lastAccessed: Date.now(),
    media: [{ type: 'video', url: 'v2.mp4', size: 120 * 1024 * 1024 }],
    content: { en: '', hi: '', pa: '' }
  }
];

const meta: Meta<typeof DownloadManager> = {
  title: 'Organisms/DownloadManager',
  component: DownloadManager,
  decorators: [
    (Story) => {
      useEffect(() => {
        const seed = async () => {
          await db.lessons.clear();
          await db.lessons.bulkAdd(mockLessons);
        };
        seed();
      }, []);
      return (
        <div className="p-4 bg-base-300 min-h-screen flex justify-center items-start">
          <Story />
        </div>
      );
    }
  ],
};

export default meta;

type Story = StoryObj<typeof DownloadManager>;

export const Default: Story = {};

export const Empty: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        db.lessons.clear();
      }, []);
      return (
        <div className="p-4 bg-base-300 min-h-screen flex justify-center items-start">
          <Story />
        </div>
      );
    }
  ]
};
