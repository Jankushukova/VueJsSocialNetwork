<template>
    <div class="card-body">

        <div class="card-description row">
            <div class="col">Create new Post</div>
        </div>


        <div class="form-group">
            <label>Post title</label>
            <input type="text" class="form-control form-control-lg" placeholder="Title" aria-label="Title..."
                   v-model="title" required>
        </div>
        <div class="form-group">
            <label>Post description</label>
            <textarea style="height: 200px" class="form-control" placeholder="Description..." aria-label="Description"
                      v-model="description" required></textarea>
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
        props:["Allposts"],
        name: "CreatePost",
        data: function () {
            return {

                title: '',
                description: '',
            }
        },
        methods: {
            saveForm() {
                var app = this;
                Api.createPost(app.title,app.description)
                    .then(function (resp) {
                        app.Allposts.push(resp.data);
                    })
                    .catch(function (resp) {
                        alert(resp.data);

                        alert("Could not create your post");

                    });
            }
        }
    }
</script>

<style scoped>

</style>