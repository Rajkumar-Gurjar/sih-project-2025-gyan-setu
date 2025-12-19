import type { Meta, StoryObj } from '@storybook/react-vite';

import { SyncStatus } from './SyncStatus';

const meta = {
  component: SyncStatus,
} satisfies Meta<typeof SyncStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};