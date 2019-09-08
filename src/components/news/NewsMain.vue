<template>
    <div>
        <div class="container" style="background-color: #f5f5f5; margin-top: 50px"  >
            <div v-for="post in posts"
                 :key="post.id" :id="post.id">
                <h3>{{post.user.fullname}}</h3>

                <ShowPost :post="post" :user="post.user"></ShowPost>

            </div>
        </div>

    </div>
</template>

<script>
    import Api from "../../Api";
    import ShowPost from "../../components/home/ShowPosts";
    export default {
        name: "NewsMain",
        data: () => {
            return {
                posts:[],

            }
        },
        mounted: function () {
            var app = this;
            Api.getAllPostsOfFriendsOfCurrentUser().then(function (resp) {
                app.posts = resp.data;
            })

        },
        components:{
            ShowPost
        },

    }
</script>

<style scoped>

</style>