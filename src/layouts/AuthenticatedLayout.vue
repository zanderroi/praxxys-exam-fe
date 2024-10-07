<template>
  <div class="flex">
    <aside class="w-52 min-h-screen bg-gray-800">
      <nav>
        <h2 class="text-gray-300 text-lg font-thin p-2">BE Developer Exam</h2>

        <hr class="h-px bg-gray-600 border-0" />

        <div class="p-2">
          <div class="flex flex-row space-x-2 items-center mb-2">
            <div class="rounded-full bg-gray-300 px-2 py-1">
              <i class="fas fa-user text-gray-400"></i>
            </div>

            <p class="text-gray-300 mb-2">{{ userName }}</p>
          </div>

          <hr class="h-px bg-gray-600 border-0" />
        </div>

        <div class="p-2">
          <div class="">
            <div class="relative">
              <span
                class="absolute inset-y-0 right-3 border-l-2 border-gray-500 flex items-center pl-2"
              >
                <i class="fas fa-search text-gray-400"></i>
              </span>
              <input
                type="text"
                placeholder="Search"
                class="w-full px-4 py-1 text-sm border bg-gray-600 border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
                v-model="searchTerm"
              />
            </div>
          </div>
        </div>

        <ul class="text-gray-300 mb-4 p-2 text-sm space-y-1">
          <router-link to="/dashboard">
            <li
              class="p-2 rounded-md space-x-2"
              :class="{
                'bg-blue-600 text-white': $route.path === '/dashboard',
                'hover:bg-gray-600 text-gray-400': $route.path !== '/dashboard',
              }"
            >
              <i class="fas fa-gauge"></i>
              Dashboard
            </li>
          </router-link>
          <router-link to="/products">
            <li
              class="p-2 rounded-md space-x-2"
              :class="{
                'bg-blue-600 text-white': $route.path === '/products',
                'hover:bg-gray-600  text-gray-400': $route.path !== '/products',
              }"
            >
              <i class="fas fa-bag-shopping"></i>
              Products
            </li>
          </router-link>
          <router-link to="/settings">
            <li
              class="p-2 rounded-md space-x-2"
              :class="{
                'bg-blue-600 text-white': $route.path === '/settings',
                'hover:bg-gray-600 text-gray-400': $route.path !== '/settings',
              }"
            >
              <i class="fas fa-gear"></i>
              Settings
            </li></router-link
          >
          <router-link to="/videoplayer">
            <li
              class="p-2 rounded-md space-x-2"
              :class="{
                'bg-blue-600 text-white': $route.path === '/videoplayer',
                'hover:bg-gray-600 text-gray-400':
                  $route.path !== '/videoplayer',
              }"
            >
              <i class="fas fa-play"></i>
              Video Player
            </li></router-link
          >
        </ul>

        <div class="p-2">
          <button
            @click="handleLogout"
            class="w-full px-4 py-1 text-white text-sm bg-red-600 rounded-md hover:bg-red-700"
          >
            <i class="fa-solid fa-right-from-bracket"></i>
            Logout
          </button>
        </div>
      </nav>
    </aside>

    <main class="bg-gray-100 flex-1 p-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "@/stores/auth"; 

const authStore = useAuthStore();
const userName = computed(() => authStore.user?.name || "Guest"); 
const searchTerm = ref(""); 
const router = useRouter(); 


const handleLogout = async () => {
  try {
   
    await axios.post(
      "/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`, 
        },
      }
    );

   
    localStorage.removeItem("auth_token");


    authStore.logout(); 

  
    router.push({ name: "Login" });
  } catch (error) {
    console.error("Logout failed:", error);

  }
};

onMounted(() => {
  const authStore = useAuthStore();
  if (!authStore.user && localStorage.getItem("auth_token")) {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      authStore.login(savedUser); 
    }
  }
});
</script>

<style scoped>

</style>
