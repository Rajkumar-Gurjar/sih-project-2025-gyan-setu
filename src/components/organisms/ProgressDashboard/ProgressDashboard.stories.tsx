import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressDashboard } from './ProgressDashboard';

const meta = {
  component: ProgressDashboard,
} satisfies Meta<typeof ProgressDashboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};