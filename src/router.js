const VueRouter = require("vue-router");
import LoginView from "./components/loginview.vue";
import ControlView from "./components/controlview.vue";
import CreateView from "./components/createuser.vue";
import UserView from "./components/userview.vue";
import EventView from "./components/eventview.vue";
import ErrorView from "./components/404.vue";
import store from "./store.js";

let router = new VueRouter({
    mode: "history",
    routes: [
        { path: '/', component: LoginView },
        {  
            path: '/cp', 
            component: ControlView,children:
                [
                    {
                        path:"createuser",
                        component: CreateView
                    },
                    {
                        path:"user",
                        component: UserView
                    },
                    {
                        path:"event",
                        component: EventView
                    }
                ],
            redirect:"/cp/createuser",  //default control home page
            meta: { requiresAuth: true }
        },
        { path: '*', component: ErrorView }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.state.loginStatus) {
            next({
                path: '/',
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } 
    else{
        next();
    }
});


export default router;
