import type { Progress } from '../../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface SyncRequest {
  lastSyncToken: string;
  localProgress: Progress[];
}

export interface SyncResponse {
  serverChanges: Progress[];
  newSyncToken: string;
}

export const syncService = {
  async sync(data: SyncRequest, token: string): Promise<SyncResponse> {
    const response = await fetch(`${API_BASE_URL}/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('SYNC_FAILED');
    }

    return response.json();
  },
};
