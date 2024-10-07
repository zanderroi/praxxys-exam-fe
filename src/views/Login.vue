<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center">Login</h1>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="login" class="block text-sm font-medium text-gray-700">Username or Email</label>
          <input
            type="text"
            id="login"
            v-model="login"
            required
            placeholder="Enter your username or email"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div class="flex items-center">
          <input
            type="checkbox"
            id="remember"
            v-model="remember"
            class="mr-2"
          />
          <label for="remember" class="text-sm text-gray-600">Remember me</label>
        </div>

        <button type="submit" class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Login
        </button>

        <div v-if="error" class="mt-4 text-red-500 text-center">{{ error }}</div>
      </form>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth'; 

export default {
  name: 'Login',
  setup() {
    const login = ref('');
    const password = ref('');
    const remember = ref(false);
    const error = ref(null);
    const router = useRouter();
    const authStore = useAuthStore(); 

    const handleLogin = async () => {
      error.value = null;

      try {
        const response = await axios.post('/api/login', {
          login: login.value,
          password: password.value,
          remember: remember.value,
        });

       
        localStorage.setItem('auth_token', response.data.token);

       
        authStore.login(response.data.user); 

       
        router.push({ name: 'Dashboard' });
      } catch (err) {
        
        error.value = err.response?.data?.message || 'Login failed. Please try again.';
      }
    };

    return {
      login,
      password,
      remember,
      error,
      handleLogin,
    };
  },
};
</script>

<style scoped>
/* You can add any custom styles here if needed */
</style>