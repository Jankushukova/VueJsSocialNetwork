<template>
    <div>
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
    </div>


</template>

<script>
    import Api from "../../Api";

    export default {
        props:["friend", "friends"],
        name: "ShowFriends",

        methods: {
            deleteFriend(userTwo){
                Api.getFriendshipByFriendId(userTwo.id).then(function (resp) {
                    Api.deleteFriendship(resp.data.id).then(function () {
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