import type { Meta, StoryObj } from '@storybook/react-vite';

import { QuizQuestion } from './QuizQuestion';

const meta = {
  component: QuizQuestion,
} satisfies Meta<typeof QuizQuestion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};