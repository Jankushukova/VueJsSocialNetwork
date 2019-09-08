<template>
    <div class="mt-5" >

        <div id="perspective" class="perspective effect-moveleft" style="background-color: #f5f5f5">
            <div class="container" style="background-color: #f5f5f5" >
                <div class="wrapper"><!-- wrapper needed for scroll -->
                    <!-- Top Navigation -->
                    <div class="column">
                        <p><button id="showMenu">Show Menu</button></p>
                    </div>
                    <div class="main clearfix">

                        <div class="related">
                            <router-view></router-view>
                        </div>


                    </div><!-- /main -->
                </div><!-- wrapper -->
            </div><!-- /container -->
            <nav class="outer-nav right vertical">
                <router-link :to="{ name: 'home'}" class="icon-home">Home</router-link>
                <router-link :to="{ name: 'news'}" class="icon-news">News</router-link>
                <router-link :to="{ name: 'friends'}"><i class="far fa-user">  Friends</i></router-link>
                <router-link :to="{ name: 'notifications'}" ><i class="far fa-bell"> Notifications</i></router-link>
                <router-link :to="{ name: ''}" class="icon-mail">Messages</router-link>
                <a :href="$router.resolve({name: 'login'}).href" class="icon-upload" v-on:click="change">Exit</a>
            </nav>
        </div><!-- /perspective -->
    </div><!-- /container -->
</template>
<script>

    export default {
        name: "Navigation",

        methods:{
            change: function () {
                localStorage.clear();
            }
        },

    }





</script>

<style scoped>

</style>