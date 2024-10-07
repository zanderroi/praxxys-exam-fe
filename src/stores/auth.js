import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('user')) || null); 
    const isAuthenticated = ref(!!localStorage.getItem('auth_token'));

    const login = (userData) => {
        user.value = userData;
        isAuthenticated.value = true;
        localStorage.setItem('user', JSON.stringify(userData)); 
    };

    const logout = () => {
        user.value = null;
        isAuthenticated.value = false;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user'); 
    };

    return {
        user,
        isAuthenticated,
        login,
        logout,
    };
});