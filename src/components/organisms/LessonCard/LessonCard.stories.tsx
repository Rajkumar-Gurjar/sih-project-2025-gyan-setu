import type { Meta, StoryObj } from '@storybook/react';
import { LessonCard } from './LessonCard';
import type { Lesson } from '../../../types';

const mockLesson: Lesson = {
  id: '1',
  title: { en: 'Introduction to Fractions', hi: 'भिन्नों का परिचय', pa: 'ਭਿੰਨਾਂ ਦੀ ਜਾਣ-ਪਛਾਣ' },
  subject: 'Mathematics',
  grade: 5,
  downloadStatus: 'not_downloaded',
  lastAccessed: Date.now(),
  media: [{ type: 'video', url: 'v1.mp4', size: 50 * 1024 * 1024 }],
  content: { en: '', hi: '', pa: '' }
};

const meta: Meta<typeof LessonCard> = {
  title: 'Organisms/LessonCard',
  component: LessonCard,
  decorators: [
    (Story) => (
      <div className="p-10 max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof LessonCard>;

export const Default: Story = {
  args: {
    lesson: mockLesson,
  },
};

export const Downloaded: Story = {
  args: {
    lesson: { ...mockLesson, downloadStatus: 'downloaded' },
  },
};

export const Downloading: Story = {
  args: {
    lesson: { ...mockLesson, downloadStatus: 'pending' },
  },
};
