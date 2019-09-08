<template>
    <div>

        <div class="media mb-4" v-for="comment in allcomments"
             :key="comment.id"
        >
            <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
            <div class="media-body">
                <h5 class="mt-0">{{comment.user.fullname}}</h5>
                {{comment.description}}
            </div>
        </div>

    </div>


</template>

<script>
    export default {
        name: "ShowComment",
        props:["allcomments"],

    }
</script>

<style scoped>

</style>