import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'SUPER_ADMIN' | 'ADMIN' | 'BROKER' | 'CLIENT';
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string) => void;
    logout: () => void;
}

// Mock User Data
const MOCK_USER: User = {
    id: 'usr_12345',
    name: 'Raul Diaz',
    email: 'admin@insurancelight.test',
    role: 'SUPER_ADMIN',
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    login: (email: string) => {
        // Mocking an API call delay
        setTimeout(() => {
            set({
                user: { ...MOCK_USER, email },
                isAuthenticated: true
            });
        }, 500);
    },
    logout: () => {
        set({ user: null, isAuthenticated: false });
    },
}));
