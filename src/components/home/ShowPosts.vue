<template>
    <div class="p-5 w-100 mb-5 shadow bg-light rounded-lg" style="border-bottom: 2px solid #fd7e14;"  >

        <router-link :to="{ name: 'details',params:{user_id:User.id,post_id:post.id}}"><h2>{{Post.title}}</h2></router-link>

        <h5>Data</h5>
        <div class="fakeimg" style="height:200px;">Image</div>
        <p>{{Post.text}}</p>
        <div class=" row ml-3" >
            <div class="colomn">

                <i class="far fa-heart text-info" v-on:click="AddorDelete">{{likes.length}}</i>

            </div>


            <div class="colomn ml-2">
                <router-link :to="{ name: 'details',params:{post_id:post.id}}"><i class="far fa-comment text-info">{{comments.length}}</i></router-link>


            </div>
        </div>
    </div>
</template>

<script>
    import Api from "../../Api";

    export default {
        name: "ShowPosts",
        props:["post","user"],
        data: () => {
            return {
                Post:{},
                likes:[],
                User:{},
                comments:[],
                currentUser:{},
            }
        },
        mounted: function () {
            var app = this;
            app.Post = app.post;
            app.User = app.user;
            Api.getAllLikesOfPost(app.Post.id).then(response => {
                app.likes= response.data;

            });
            Api.getAllCommentsOfPost(app.Post.id).then(response => {
                app.comments= response.data;

            });
            Api.getCurrentUser().then(function (resp) {
                app.currentUser = resp.data;

            })
        },
        methods: {
            AddorDelete(){
                var app = this;
                for (var i = 0 ; i < app.likes.length;i++){

                    if(app.likes[i].user.id===app.currentUser.id && app.likes[i].post.id===app.Post.id){
                        app.deleteLike(app.likes[i]);
                        return;
                    }
                }
                app.addLike();
            },
            addLike() {
                var app = this;
                Api.createLike(app.User,app.Post)
                    .then(function (resp) {
                        app.likes.push(resp.data);
                    })
                    .catch(function () {
                        alert("Could not create like");
                    });
            },
            deleteLike(like){
                var app = this;
                Api.deleteLike(like.id)
                    .then(function () {
                        app.likes.splice(app.likes.indexOf(like),1);
                    })
                    .catch(function () {
                        alert("Could not find post");
                    });

            }
        },
    }
</script>

<style scoped>
    i{
        cursor: pointer;
    }
</style>