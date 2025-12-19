import type { Meta, StoryObj } from '@storybook/react-vite';

import { DownloadManager } from './DownloadManager';

const meta = {
  component: DownloadManager,
} satisfies Meta<typeof DownloadManager>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};