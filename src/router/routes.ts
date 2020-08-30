import { RouteConfig } from 'vue-router'
import NotFound from '@/views/error/NotFound.vue'

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "main" */ '@/views/main/Main.vue')
  },
  {
    path: '/composition-api',
    name: 'Composition',
    component: () => import(/* webpackChunkName: "composition" */ '@/views/test/Composition.vue')
  },
  {
    path: '/todo-ui',
    name: 'TodoUI',
    component: () => import(/* webpackChunkName: "todo-ui" */ '@/views/test/TodoUI.vue')
  },
  {
    path: '**',
    component: NotFound
  }
]
