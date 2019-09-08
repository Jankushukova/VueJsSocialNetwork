<template>
    <div class="card-body">

        <div class="card-description row">
            <router-link tag="button" :to="{name: 'details',params:{post_id:postId}}" type="button"
                         class="btn btn-outline-info btn-rounded btn-icon">
                <i class="fas fa-back">Back</i>
            </router-link>

        </div>


        <div class="form-group">
            <label>Post title</label>
            <input type="text" class="form-control form-control-lg" placeholder="Title" aria-label="Title..."
                   v-model="title">
        </div>
        <div class="form-group">
            <label>Post description</label>
            <textarea style="height: 200px" class="form-control" placeholder="Description..." aria-label="Description"
                      v-model="description"></textarea>
        </div>

        <div class="form-group text-right">
            <button  v-on:click="saveForm" class="btn btn-outline-info btn-rounded btn-icon">
                <i class="mdi mdi-check">Save</i>
            </button>
        </div>
    </div>
</template>

<script>
    import Api from "../../Api";

    export default {
        name: "EditPost",
        data: () => {
            return {
                postId:{},
                description:'',
                title:'',
            }
        },
        mounted: function(){
            var app = this;
            app.postId = app.$route.params.post_id;
            Api.getPostById(app.postId).then(response =>{
                app.title = response.data.title;
                app.description = response.data.text;
            }).catch(error => {
                this.$log.debug(error);
                alert("Failed to load post");
            })
                .finally(() => this.loading = false);

        },
        methods: {
            saveForm() {
                var app = this;
                Api.updatePost(app.postId,app.title,app.description)
                    .then(function () {
                        alert("successfully updated");
                        app.$router.push({name: 'details',params:{post_id:app.postId}})
                    })
                    .catch(function () {

                        alert("Could not edit your post");

                    });
            }
        }
    }
</script>

<style scoped>

</style>