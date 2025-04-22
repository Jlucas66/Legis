import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes'; // Certifique-se de que suas rotas estão definidas aqui

const router = createRouter({
  history: createWebHistory(), // Define o modo 'history'
  routes,
});

export default router;
