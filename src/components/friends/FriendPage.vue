<template>
    <div >
        <div class="box">
            <div class="card-profile">
                <div class="imgBx">
                    <img src="https://images.unsplash.com/photo-1532123675048-773bd75df1b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="images">
                </div>
                <div class="details-profile">
                    <h2>{{friend.fullname}}<br><span>
                        <i v-if="!iffriend" class="fas fa-user-plus" v-on:click="addFriend">Add</i>
                    </span> </h2>

                </div>
            </div>
        </div>




        <div class="container" style="background-color: #f5f5f5; margin-top: 50px"  >

            <div v-for="post in posts"
                 :key="post.id" :id="post.id">
                <ShowPost :post="post" :user="friend"></ShowPost>

            </div>
        </div>



        <!-- Page Content -->
    </div>
</template>

<script>
    import Api from "../../Api";
    import ShowPost from "../../components/home/ShowPosts";

    export default {
        name: "FriendPage",
        data: () => {
            return {
                friendId:{},
                friend:{},
                posts:[],
                iffriend:true,
            }
        },
        mounted: function(){
            var app = this;
            app.friendId = app.$route.params.friend_id;
            Api.getUserById(app.friendId).then(function (resp) {
                app.friend = resp.data;

            });
            Api.getAllPostsOfCustomUser(app.friendId).then(function (resp) {
                app.posts = resp.data;
            });
           Api.ifFriends(app.friendId).then(function (resp) {
               if(resp.data==="")
                   app.iffriend = false;

           })
        },
        methods:{
            addFriend(){
                var app = this;
                Api.createFriendship(app.friend)
                app.iffriend = true;
            },

        },
        components:{ShowPost,}


    }
</script>

<style scoped>
    i{
        cursor: pointer;
    }

    #main{
        margin: 0;
        padding: 0;
        display: flex;
        justify-content:center;
        align-items: center;
        min-height: 100vh;
        background: #212121;
        font-family: sans-serif;
    }
    .box{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        grid-gap: 15px;
        margin: 0 auto;
    }
    .card-profile{
        position: relative;
        width: 300px;
        height: 350px;
        background: #fff;
        margin: 0 auto;
        border-radius: 4px;
        box-shadow:0 2px 10px rgba(0,0,0,.2);
    }
    .card-profile:before,
    .card-profile:after
    {
        content:"";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        background: #fff;
        transition: 0.5s;
        z-index:-1;
    }
    .card-profile:hover:before{
        transform: rotate(20deg);
        box-shadow: 0 2px 20px rgba(0,0,0,.2);
    }
    .card-profile:hover:after{
        transform: rotate(10deg);
        box-shadow: 0 2px 20px rgba(0,0,0,.2);
    }
    .card-profile .imgBx{
        position: absolute;
        top: 10px;
        left: 10px;
        bottom: 10px;
        right: 10px;
        background: #222;
        transition: 0.5s;
        z-index: 1;
    }

    .card-profile:hover .imgBx
    {
        bottom: 80px;
    }

    .card-profile .imgBx img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .card-profile .details-profile{
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: 10px;
        height: 60px;
        text-align: center;
    }

    .card-profile .details-profile h2{
        margin: 0;
        padding: 0;
        font-weight: 600;
        font-size: 20px;
        color: #777;
        text-transform: uppercase;
    }

    .card-profile .details-profile h2 span{
        font-weight: 500;
        font-size: 16px;
        color: #f38695;
        display: block;
        margin-top: 5px;
    }
    .container{
        padding-top: 56px;
    }
</style>