<template>
    <div>

        <div v-for="note in notifications"
             :key="note.id">
            <b-alert variant="info" show  dismissible :id="note.id">
                {{note.userOne.fullname}}
                wants to add you to friends.
                <i class="fas fa-check" @click="addNote(note)">+</i> <i class="fas fa-times" @click="deleteNote(note)">-</i>

            </b-alert>

        </div>
    </div>
</template>

<script>
    import Api from "../../Api";

    export default {
        data() {
            return {
                notifications:[],
                count: 0,
            }
        },
        mounted: function () {
            var app = this;
            Api.getAllNotificationsOfCurrentUser().then(function (resp) {
                app.notifications = resp.data;
            })
        },
        methods: {
            addNote(note){
                var app = this;
                Api.acceptAndDeleteNotification(note.id).then(function () {
                    app.appearSuccess('Wooohoo new friend!');
                    document.getElementById(note.id).style.display = 'none';
                }).catch(function () {
                    app.appearError()


                });

            },
            deleteNote(note){
                var app = this;
                Api.doNotAcceptAndDeleteNotification(note.id).then(function () {
                    app.appearSuccess('Someone will cry today...');
                    document.getElementById(note.id).style.display = 'none';


                }) .catch(function () {
                    app.appearError()


                });

            },appearSuccess (text) {
                this.$toasted.show(text, {
                    //theme of the toast you prefer
                    theme: 'bubble',
                    //position of the toast container
                    position: 'bottom-left',
                    //display time of the toast
                    duration: 5000
                })
            },appearError () {
                this.$toasted.show('Oh some problem occurred', {
                    //theme of the toast you prefer
                    theme: 'bubble',
                    //position of the toast container
                    position: 'top-left',
                    //display time of the toast
                    duration: 5000
                })
            }
        }
    }
</script>

<style scoped>


</style>