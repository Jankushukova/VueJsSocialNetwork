<template>
    <div>
        <div class="card-body">
            <div class="p-5 w-100 mb-5 shadow  rounded-lg" style="border-bottom: 2px solid #fd7e14;"  >
                <div class="card-description row">
                    <router-link tag="button" :to="{name: 'home'}" type="button"
                                 class="btn btn-outline-info btn-rounded btn-icon" v-if="UserId===currentUser.id">
                        <i class="fas fa-back">Back</i>
                    </router-link>
                    <router-link tag="button" :to="{name: 'friendPage',params: {friend_id: UserId}}" type="button"
                                               class="btn btn-outline-info btn-rounded btn-icon" v-if="UserId!==currentUser.id">
                    <i class="fas fa-back">Back</i>
                    </router-link>

                </div>
                <div class="row">
                    <div class="col mr-4" > <router-link :to="{ name: 'details'}"><h2>{{post.title}}</h2></router-link>
                    </div>
                    <div :id="'warning'+ post.id" style="visibility: hidden">
                        <i class="fas fa-check-circle text-success fa-2x ml-3" v-on:click="save(post.id)"></i>
                    </div>
                </div>
                <h5>Data</h5>
                <div class="fakeimg" style="height:200px;">Image</div>
                <p>{{post.text}}</p>
                <div class=" row ml-3" >

                    <div class="colomn">
                        <i class="far fa-heart text-info" v-on:click="AddorDeleteLike">{{likes.length}}</i>
                    </div>
                    <div class="colomn ml-2">
                        <i class="far fa-comment text-info">{{comments.length}}</i>
                    </div>
                    <div class="colomn ml-auto">
                        <i class="fas fa-cut ml-auto text-info" :id="'config'+ post.id" v-on:click="conf(post.id)" v-if="UserId===currentUser.id"></i>
                        <i class="fas fa-trash-alt text-info" :id="'delete'+ post.id" v-on:click="deleteEntry(post.id)" style="display: none "></i>
                        <router-link :to="{name: 'edit',params:{post_id:postId}}"><i class="fas fa-eye-dropper ml-3 text-info" :id="'edit'+ post.id"   style="display: none"></i></router-link>
                    </div>
                </div>
                <CreateComment :allcomments="comments" :post="post"></CreateComment>
                <ShowComment :allcomments="comments"></ShowComment>
            </div>

        </div>
    </div>
</template>

<script>
    import Api from "../../Api";
    import CreateComment from "../../components/home/CreateComment";
    import ShowComment from "../../components/home/ShowComment";

    export default {
        name: "PostDetaıls",
        data: () => {
            return {
                postId:{},
                post:{},
                currentUser:{},
                likes:[],
                comments:[],
                UserId:{},
            }
        },
        mounted: function(){
            var app = this;
            app.postId = app.$route.params.post_id;
            Api.getPostById(app.postId).then(response =>{
                app.post = response.data;
            }).catch(error => {
                this.$log.debug(error);
                alert("Failed to load post");
            })
                .finally(() => this.loading = false);
            Api.getCurrentUser().then(response => {

                app.currentUser = response.data;
            })
                .catch(error => {
                    this.$log.debug(error);
                    alert("Failed to load user");
                })
                .finally(() => this.loading = false);
            Api.getAllLikesOfPost(app.postId).then(response => {
                app.likes= response.data;

            });
            Api.getAllCommentsOfPost(app.postId).then(response => {
                app.comments= response.data;

            });
            Api.getUserOfPost(app.postId).then(function (resp) {
                app.UserId = resp.data.id;
            })

        },
        methods: {
            deleteEntry(id) {
                Api.deletePost(id)
                    .then(function () {
                    })
                    .catch(function () {
                        alert("Could not delete course");
                    });
                this.save(id);
            },
            conf(id){
                document.getElementById('config' + id).style.display = "none";
                document.getElementById('edit' + id).style.display = "inline";
                document.getElementById('delete' + id).style.display = "inline";
                document.getElementById('warning' + id).style.visibility = "visible";


            },
            save(id){
                document.getElementById('config' + id).style.display = "inline";
                document.getElementById('edit' + id).style.display = "none";
                document.getElementById('delete' + id).style.display = "none";
                document.getElementById('warning' + id).style.visibility = "hidden";
                this.$router.push("/home");

            },
            AddorDeleteLike(){
                var app = this;
                for (var i = 0 ; i < app.likes.length;i++){
                    if(app.likes[i].user.id===app.currentUser.id && app.likes[i].post.id===app.post.id){
                        app.deleteLike(app.likes[i]);
                        return;
                    }
                }
                app.addLike();
            },
            addLike() {
                var app = this;
                Api.createLike(app.currentUser,app.post)
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

        },components:{
            CreateComment,
            ShowComment,
        }
    }
</script>

<style scoped>
    i{
        cursor: pointer;
    }
</style>