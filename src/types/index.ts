export type UserRole = 'student' | 'teacher';
export type SupportedLanguage = 'pa' | 'hi' | 'en';

export interface User {
  id: string;
  name: string;
  phone: string;
  pinHash?: string; // Hashed PIN for offline verification
  role: UserRole;
  languagePreference: SupportedLanguage;
  syncToken?: string;
}

export type DownloadStatus = 'not_downloaded' | 'pending' | 'downloaded';

export interface MediaItem {
  type: 'video' | 'image';
  url: string;
  size: number;
}

export interface Lesson {
  id: string;
  title: Record<SupportedLanguage, string>;
  content: Record<SupportedLanguage, string | object>; // Flexible for JSON or HTML
  media: MediaItem[];
  subject: string;
  grade: number; // Integer as per data-model.md
  downloadStatus: DownloadStatus;
  lastAccessed: number;
}

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';
export type ProgressEventType = 'complete' | 'attempt';

export interface ProgressEvent {
  type: ProgressEventType;
  timestamp: number;
}

export interface Progress {
  userId: string;
  lessonId: string;
  status: ProgressStatus;
  score: number; // Renamed from quizScore to match data-model.md
  lastAccessed: number;
  lastSynced?: number; // Server timestamp of last sync
  completionEvents: ProgressEvent[]; // Renamed from events for clarity in code
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}