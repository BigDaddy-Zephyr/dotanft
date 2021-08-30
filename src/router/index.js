import { createRouter, createWebHistory } from 'vue-router'
import Lab from '../components/Lab.vue';
import Art from '../components/Art.vue';
import Gallery from '../components/Gallery.vue';
import Form from '../components/Form.vue'

const routes = [
  {
    path: '/mint',
    name: 'Lab',
    component: Lab
  },
  {
    path: '/art',
    name: 'Art',
    component: Art
  },
  {
    path: '/',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/form',
    name: 'Form',
    component: Form
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
