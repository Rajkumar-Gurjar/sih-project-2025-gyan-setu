export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  languagePreference: string;
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
  title: Record<string, string>; // Multilingual titles
  content: Record<string, string>; // Multilingual content (HTML/JSON string)
  media: MediaItem[];
  subject: string;
  grade: string;
  downloadStatus: DownloadStatus;
  lastAccessed: number;
}

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

export interface CompletionEvent {
  lessonId: string;
  completedAt: number;
}

export interface Progress {
  userId: string;
  lessonId: string;
  status: ProgressStatus;
  lastAccessed: number;
  quizScore?: number;
  completionEvents: CompletionEvent[]; // For cumulative merge
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

