import { createRouter, createWebHistory } from 'vue-router'

import Home from "../views/HomeView.vue";
import Info from "../views/InfoView.vue";
import Pumps from "../views/PumpsView.vue";
import Update from "../views/UpdateView.vue";
import Teste from "../views/TesteView.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/info', name: 'info', component: Info },
  { path: '/pumps', name: 'pumps', component: Pumps },
  { path: '/update', name: 'update', component: Update },
  { path: '/teste', name: 'teste', component: Teste },
  { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
})

export default router