import {createRouter, createWebHistory} from 'vue-router'
import Connection from '../views/Connection'
import Posts from '../views/Posts'

const routes = [
    {
        path: '/',
        name: 'Connection',
        component: Connection
    },
    {
        path: '/posts',
        name: 'Posts',
        component: Posts,
        beforeEnter: (to, from, next) => {
            // ?

            next()
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router