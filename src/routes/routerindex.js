import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Navigation from "../components/Navigation";
import HomeMain from "../components/home/HomeMain";
import FriendsMain from "../components/friends/FriendsMain";
import NewsMain from "../components/news/NewsMain";
import PostDetails from "../components/home/PostDetails";
import EditPost from "../components/home/EditPost";
import FriendPage from "../components/friends/FriendPage";
import NotificationMain from "../components/notifications/NotificationMain";
import Register from "../components/Register";
Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
    var route = '';
    if (localStorage.getItem("token")==null) {
        route = '/login';
        next();
        return
    }
    else{
        route = '/';
    }
    next(route)
};

const ifAuthenticated = (to, from, next) => {
    var route = '';
    if (localStorage.getItem("token")!=null) {
        route = '/';
        next();
        return
    }else{
        route = '/login';
    }
    next(route)
};
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: ifNotAuthenticated,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            beforeEnter: ifNotAuthenticated,

        },

        {
            path: '/',
            redirect:'home',
            beforeEnter: ifAuthenticated,

        },
        {
            path: '/nav',
            name:'nav',
            component: Navigation,
            beforeEnter: ifAuthenticated,
            children:[

                {
                    path: '/home',
                    name: 'home',
                    component: HomeMain,


                },
                {
                    path: '/home/details:post_id',
                    name: 'details',
                    component: PostDetails,
                },
                {
                    path: '/home/edit:post_id',
                    name: 'edit',
                    component: EditPost,
                },

                {   path: '/friends',
                    name: 'friends',
                    component: FriendsMain,
                },
                {   path: '/friends/page:friend_id',
                    name: 'friendPage',
                    component: FriendPage,
                },

                {
                    path: '/news',
                    name: 'news',
                    component: NewsMain,
                },
                {
                    path: '/notifications',
                    name: 'notifications',
                    component: NotificationMain,
                },
            ]


        },



    ]
})