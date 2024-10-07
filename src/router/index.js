import { createRouter, createWebHistory } from 'vue-router';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Product from '../views/Products.vue';
import Settings from '../views/Settings.vue';
import VideoPlayer from '../views/VideoPlayer.vue';
import axios from 'axios';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    component: AuthenticatedLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'products',
        name: 'Products',
        component: Product,
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
      },
      {
        path: 'videoplayer',
        name: 'VideoPlayer',
        component: VideoPlayer,
      },
    ],
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('auth_token');
  const isAuthenticated = !!token;

  
  if (to.meta.requiresAuth && !isAuthenticated) {
    
    return next('/login');
  }

  if (isAuthenticated) {
    try {
     
      await axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
       
        localStorage.removeItem('auth_token');
        return next('/login'); 
      }
    }
  }

  
  if (to.name === 'Login' && isAuthenticated) {
    return next({ name: 'Dashboard' });
  }

  next(); 
});

export default router;