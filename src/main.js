import { createApp } from 'vue';
import '@/style.scss';
import App from '@/layouts/AppLayout.vue';
import router from '@/router/index.js';

createApp(App).use(router).mount('#app');
