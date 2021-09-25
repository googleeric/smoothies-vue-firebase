import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AddSmoothie from '@/components/AddSmoothie'
import EditSmoothie from '@/components/EditSmoothie'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/add-smoothie',
      name: 'Add Smoothie',
      component: AddSmoothie
    },
    {
      path: '/edit-smoothie/:smoothie_slug',
      name: 'Edit Smoothie',
      component: EditSmoothie
    }
  ]
})
