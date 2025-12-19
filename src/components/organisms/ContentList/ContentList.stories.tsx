import type { Meta, StoryObj } from '@storybook/react-vite';

import { ContentList } from './ContentList';

const meta = {
  component: ContentList,
} satisfies Meta<typeof ContentList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};