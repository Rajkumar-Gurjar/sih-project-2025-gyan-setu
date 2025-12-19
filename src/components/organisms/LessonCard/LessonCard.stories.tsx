import type { Meta, StoryObj } from '@storybook/react-vite';

import { LessonCard } from './LessonCard';

const meta = {
  component: LessonCard,
} satisfies Meta<typeof LessonCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};