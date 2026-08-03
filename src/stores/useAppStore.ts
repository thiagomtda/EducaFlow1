import { create } from 'zustand';
import { ThemeMode, SchoolClass } from '../types';
import { AppConstants } from '../constants';

interface AppState {
  theme: ThemeMode;
  selectedClassId: string | null;
  selectedClass: SchoolClass | null;
  activeTab: 'chamada' | 'diario' | 'planos' | 'pareceres' | 'config';
  teacherActiveTab: 'attendance' | 'diary' | 'planner';
  isSidebarOpen: boolean;
  setTheme: (theme: ThemeMode) => void;
  setSelectedClass: (schoolClass: SchoolClass | null) => void;
  setActiveTab: (tab: AppState['activeTab']) => void;
  setTeacherActiveTab: (tab: 'attendance' | 'diary' | 'planner') => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  selectedClassId: 'cls-3a-2026',
  selectedClass: {
    id: 'cls-3a-2026',
    code: 'EF1-3A',
    name: 'Turma 3º Ano A - Matutino',
    year: 2026,
    grade: '3º Ano',
    shift: 'Matutino',
    studentCount: 5,
  },
  activeTab: 'chamada',
  teacherActiveTab: 'attendance',
  isSidebarOpen: true,

  setTheme: (theme) => {
    localStorage.setItem(AppConstants.STORAGE_THEME_KEY, theme);
    set({ theme });
  },

  setSelectedClass: (schoolClass) => {
    set({
      selectedClass: schoolClass,
      selectedClassId: schoolClass ? schoolClass.id : null,
    });
  },

  setActiveTab: (activeTab) => set({ activeTab }),
  setTeacherActiveTab: (teacherActiveTab) => set({ teacherActiveTab }),

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
