import { RouteConfig } from 'vue-router'
import NotFound from '@/views/error/NotFound.vue'

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "main" */ '@/views/main/Main.vue')
  },
  {
    path: '**',
    component: NotFound
  }
]
