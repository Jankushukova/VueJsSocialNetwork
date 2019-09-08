<template>
    <div class="p-5 w-100 mb-5 shadow bg-light rounded-lg" style="border-bottom: 2px solid #fd7e14;"  >
        <div class="table-responsive">
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-info" v-on:click="friend=true">Friends</button>
                <button type="button" class="btn btn-outline-danger" v-on:click="friend = false">All users</button>
            </div>
            <table class="table table-striped" v-if="friend">
                <thead>My friends</thead>
                <tbody>
                <tr  v-for="(friend,index) in friends"
                     :key="friend.id"
                >
                    <td  v-on:click="goToPage(friend.id)">
                        {{friend.fullname}}
                    </td>
                    <td>
                        {{friend.phone_number}}

                    </td>
                    <td>
                        {{friend.email_address}}
                    </td>
                    <td>

                        <button class="btn btn-icon">
                            <i class="fas fa-minus" v-on:click="deleteFriend(friend, index)"></i>

                        </button>

                    </td>
                </tr>
                </tbody>
            </table>
            <table class="table table-striped" v-if="!friend">
                <thead>All users</thead>
                <tbody>
                <tr v-for="user in notfriends"
                    :key="user.id"
                >
            <ShowNotFriends :user="user" ></ShowNotFriends>
                </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
    import Api from "../../Api";
    import ShowNotFriends from "../../components/friends/ShowNotFriends";

    export default {
        name: "FriendsMain",
        data: () => {
            return {
                friend:true,
                friends:[],
                notfriends:[],
            }
        },
        mounted: function () {
            var app = this;
            Api.getAllFriendsOfCurrentUser().then(response => {
                app.friends= response.data;
            })  .catch(error => {
                this.$log.debug(error);
                alert("Failed to load posts of current user");
            })
                .finally(() => this.loading = false);


            Api.getNotFriendsOfCurrentUser().then(response => {
                app.notfriends= response.data;
            })
                .catch(error => {
                    this.$log.debug(error);
                    alert("Failed to load not friends of current user");
                })
                .finally(() => this.loading = false)

        },components:{
            ShowNotFriends
        },
        methods: {
            deleteFriend(userTwo,index){
                var app = this;
                Api.getFriendshipByFriendId(userTwo.id).then(function (resp) {
                    Api.deleteFriendship(resp.data.id).then(function () {
                        app.friends.splice(index,1);
                        app.notfriends.push(userTwo);
                    })

                })
            },
            goToPage(friendId){
                this.$router.push({name: 'friendPage',params:{friend_id:friendId}});

            }
        }
    }
</script>

<style scoped>

</style>