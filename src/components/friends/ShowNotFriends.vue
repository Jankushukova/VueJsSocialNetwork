<template>
    <div>
        <td v-on:click="goToPage">
            {{user.fullname}}
        </td>
        <td>
            {{user.phone_number}}

        </td>
        <td>
            {{user.email_address}}
        </td>
        <td>

            <button class="btn btn-icon" v-if="ifsent">
                <i class="fas fa-plus" v-on:click="addFriend" >+</i>
            </button>
            <button class="btn btn-icon disabled" v-if="!ifsent">
                <i class="fas fa-check" >*</i>
            </button>

        </td>

    </div>

</template>

<script>
    import Api from "../../Api";

    export default {
        props:["user"],
        name: "ShowNotFriends",
        data: () => {
            return {
                ifsent:false,
            }
        },
        mounted: function () {
           this.ifAccept();
        },
        methods: {

            addFriend(){
                var app = this;
                Api.createNotification(app.user).then(function () {
                    app.ifAccept();

                })

            },
            goToPage(){
                var app = this;
                this.$router.push({name: 'friendPage',params:{friend_id:app.user.id}});

            },
            ifAccept(){
                var app = this;
                Api.ifAccepted(app.user.id).then(function (resp) {
                    app.ifsent = (resp.data ==="");
                });
            }
        }
    }
</script>

<style scoped>

</style>