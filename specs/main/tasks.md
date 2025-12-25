# Tasks: Core MVP Foundation

**Input**: Design documents from `/specs/main/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize Dexie.js database schema in src/services/storage/dexie.db.ts
- [X] T002 Configure Workbox service worker for PWA in src/service-worker.ts
- [X] T003 [P] Configure i18next for multilingual support in src/i18n/config.ts
- [ ] T004 [P] Create shared Tailwind CSS v4 themes and DaisyUI v5 config in src/index.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T005 Create useAuthStore for session management in src/store/useAuthStore.ts
- [ ] T006 Implement Auth API service in src/services/api/auth.service.ts
- [ ] T007 Implement Sync Manager for cumulative merge logic in src/services/sync/syncManager.ts
- [ ] T008 [P] Create LRU cleanup utility in src/utils/lru-cleanup.ts
- [ ] T009 [P] Define core TypeScript interfaces in src/types/index.ts (User, Lesson, Progress)

---

## Phase 3: User Story 1 - Authentication (Priority: P1) 🎯 MVP

**Goal**: Student can register and login using Phone and PIN.

**Independent Test**: Successfully login and see "Welcome back" on Dashboard after registration.

### Implementation for User Story 1

- [ ] T010 [US1] Implement registration logic in src/components/pages/SignUp/SignUp.tsx
- [ ] T011 [US1] Implement login logic with exponential backoff in src/components/pages/Login/Login.tsx
- [ ] T012 [P] [US1] Implement PIN input atom with 4-digit constraint in src/components/atoms/Input/PinInput.tsx
- [ ] T013 [US1] Integrate Auth store with AuthLayout in src/components/layouts/AuthLayout/AuthLayout.tsx

---

## Phase 4: User Story 2 - Lesson Viewing (Priority: P2)

**Goal**: Student can view lessons in multiple languages with instant hot-reloading.

**Independent Test**: Open a lesson, switch language from Punjabi to English, and see content update instantly.

### Implementation for User Story 2

- [ ] T014 [US2] Create Lesson Viewer layout in src/components/layouts/LessonViewerLayout/LessonViewerLayout.tsx
- [ ] T015 [US2] Implement Lesson Viewer page with hot-reloading in src/components/pages/LessonViewer/LessonViewer.tsx
- [ ] T016 [P] [US2] Create Language Switcher molecule in src/components/molecules/LanguageSwitcher/LanguageSwitcher.tsx
- [ ] T017 [US2] Implement useMultilingual hook for content switching in src/hooks/useMultilingual.ts

---

## Phase 5: User Story 3 - Manual Downloads (Priority: P3)

**Goal**: Student can manually download lessons for offline use within a 500MB limit.

**Independent Test**: Click download on a lesson, turn off internet, and still be able to open that lesson.

### Implementation for User Story 3

- [ ] T018 [US3] Implement useContentDownload hook using Cache API in src/hooks/useContentDownload.ts
- [ ] T019 [US3] Implement Download Manager organism in src/components/organisms/DownloadManager/DownloadManager.tsx
- [ ] T020 [US3] Integrate LRU cleanup into download flow to maintain 500MB limit in src/services/storage/cache.service.ts
- [ ] T021 [P] [US3] Add Download Status badges to Lesson Cards in src/components/organisms/LessonCard/LessonCard.tsx

---

## Phase 6: User Story 4 - Progress & Sync (Priority: P4)

**Goal**: Student progress is tracked locally and synchronized via cumulative merge.

**Independent Test**: Complete a lesson offline, reconnect, and see completion reflected on the server/dashboard.

### Implementation for User Story 4

- [ ] T022 [US4] Implement useProgressStore for local tracking in src/store/useProgressStore.ts
- [ ] T023 [US4] Implement background sync trigger in src/hooks/useOfflineSync.ts
- [ ] T024 [P] [US4] Create Progress Dashboard organism in src/components/organisms/ProgressDashboard/ProgressDashboard.tsx
- [ ] T025 [US4] Integrate sync status indicator in src/components/organisms/SyncStatus/SyncStatus.tsx

---

## Phase 7: Polish & Cross-Cutting Concerns

- [ ] T026 [P] Final Accessibility (WCAG 2.1 AA) audit on all interactive components
- [ ] T027 [P] Update quickstart.md with deployment and sync testing instructions
- [ ] T028 Performance profiling for initial load on slow networks
- [ ] T029 Code cleanup and final type check

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 & 2**: Mandatory prerequisites for all features.
- **Phase 3 (Auth)**: Essential for personalized progress and sync.
- **Phase 4 (Viewing)**: Depends on Phase 1 (i18n).
- **Phase 5 (Downloads)**: Depends on Phase 1 (PWA) and Phase 2 (LRU).
- **Phase 6 (Sync)**: Depends on Phase 2 (Sync Manager) and Phase 3 (Auth).

### Parallel Opportunities

- T003, T004 (i18n and Styling)
- T008, T009 (LRU and Types)
- T012 (PIN Input) can be done while T010/T011 are in progress
- T016 (Language Switcher) can be done while T015 is in progress
- T021 (Badges) can be done while T019 is in progress
- T024 (Dashboard) can be done while T022/T023 are in progress
