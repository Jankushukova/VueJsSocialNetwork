<template>
    <div class="card my-4">
        <h5 class="card-header">Leave a Comment:</h5>
        <div class="card-body">
            <form>
                <div class="form-group">
                    <textarea class="form-control" rows="10" v-model="description" required></textarea>
                </div>
                <button  v-on:click="saveForm" class="btn btn-outline-info btn-rounded btn-icon">
                    Save
                </button>
            </form>

        </div>
    </div>
</template>

<script>
    import Api from "../../Api";

    export default {
        props:["allcomments","post"],
        name: "CreateComment",
        data: function () {
            return {
                description: '',
            }
        },
        methods: {
            saveForm(e) {
                e.preventDefault();
                var app = this;
                Api.createComment(app.post,app.description)
                    .then(function (resp) {
                        app.allcomments.push(resp.data);
                    })
                    .catch(function () {

                    });
            }
        }
    }
</script>

<style scoped>

</style>