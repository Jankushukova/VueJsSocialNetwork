<template>
    <div >
        <div class="box">
            <div class="card-profile">
                <div class="imgBx">
                    <img src="https://images.unsplash.com/photo-1532123675048-773bd75df1b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="images">
                </div>
                <div class="details-profile">
                    <h2>{{user.fullname}}<br><span><i class="fas fa-plus" v-on:click="addPost=!addPost"></i></span></h2>

                </div>
            </div>
        </div>




        <div class="container" style="background-color: #f5f5f5; margin-top: 50px"  >
            <CreatePost :Allposts="posts" v-if="addPost"></CreatePost>

            <div v-for="post in posts"
                 :key="post.id" :id="post.id">
                <ShowPost :post="post" :user="user"></ShowPost>

            </div>
        </div>



        <!-- Page Content -->
    </div>
</template>

<script>
    import Api from "../../Api";
    import CreatePost from "../../components/home/CreatePost";
    import ShowPost from "../../components/home/ShowPosts";

    export default {
        data: () => {
            return {
                user:{},
                addPost:false,
                posts:[],
            }
        },
        mounted: function () {
            var app = this;
            Api.getCurrentUser().then(response => {

                app.user = response.data;
            })
                .catch(error => {
                    this.$log.debug(error);
                    alert("Failed to load user");
                })
                .finally(() => this.loading = false);
            Api.getAllPostsOfCurrentUser().then(response => {

                app.posts= response.data;
            })
                .catch(error => {
                    this.$log.debug(error);
                    alert("Failed to load posts of current user");
                })
                .finally(() => this.loading = false)
        },
        components:{
            CreatePost,
            ShowPost
        },



        name: "Home.vue",

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