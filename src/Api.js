import axios from 'axios'

const SERVER_URL = 'http://localhost:9000';
const instance = axios.create({
    baseURL: SERVER_URL,
    headers: {
        Authorization : "Bearer " + localStorage.getItem("token"),
    }
});


export default {

    login:(username,password)=>instance.post('/login',{username:username, password:password}),
    getCurrentUser:()=>instance.get("/api/users/current"),
    getUserById:(id)=>instance.get("/api/users/" + id),
    getNotFriendsOfCurrentUser: ()=>instance.get('/api/users/not'),
    register:(fullname,phone,email,username,password)=>instance.post("/api/users/register", {username:username,fullname:fullname,password:password,email:email,phone:phone}),

    //Posts
    createPost: (title,description) => instance.post('/api/posts', {title:title,text:description}),
    getAllPostsOfCurrentUser: () => instance.get('/api/posts'),
    getAllPostsOfCustomUser: (id) => instance.get('/api/posts/custom/' + id),
    getPostById: (id) => instance.get('/api/posts/' + id),
    getUserOfPost: (id) => instance.get('/api/posts/user/' + id),
    deletePost: (id) => instance.delete('/api/posts/' + id),
    updatePost: (id,title,text) => instance.put('/api/posts/update/' + id,{title:title,text:text}),


    //Likes
    createLike: (user,post) => instance.post('/api/likes', {user:user,post:post}),
    getAllLikesOfPost: (id) => instance.get('/api/likes/' + id),
    getLikeById: (id) => instance.get('/api/likes/getone/' + id),
    deleteLike: (id) => instance.delete('/api/likes/' + id),
    updateLike: (id) => instance.put('/api/likes/update/' + id),


    //Comments
    createComment: (post,description) => instance.post('/api/comments', {post:post,description:description}),
    getAllCommentsOfPost: (id) => instance.get('/api/comments/' + id),
    getCommentById: (id) => instance.get('/api/comments/getone/' + id),
    deleteComment: (id) => instance.delete('/api/comments/' + id),
    updateComment: (id,user,post,description) => instance.put('/api/comments/update/' + id,{user:user,post:post,description:description}),




    //Friendship
    // createFriendship: (userTwo) => instance.post('/api/friendship', {userTwo:userTwo}),
    getAllFriendsOfCurrentUser: () => instance.get('/api/friendship'),
    getAllPostsOfFriendsOfCurrentUser: () => instance.get('/api/friendship/posts'),
    ifFriends: (id) => instance.get('/api/friendship/iffriends/' + id),
    getFriendshipByFriendId: (id) => instance.get('/api/friendship/' + id),
    deleteFriendship: (id) => instance.delete('/api/friendship/' + id),

    //Notification
    createNotification: (userTwo) => instance.post('/api/notifications', {userTwo:userTwo}),
    getAllNotificationsOfCurrentUser: () => instance.get('/api/notifications'),
    ifAccepted: (id) => instance.get('/api/notifications/ifaccepted/' + id),
    doNotAcceptAndDeleteNotification: (id) => instance.delete('/api/notifications/notaccept/' + id),
    acceptAndDeleteNotification: (id) => instance.delete('/api/notifications/accept/' + id),



    // //Todos
    // // (C)reate
    // createNew: (text, completed) => instance.post('todos', {title: text, completed: completed}),
    //
    // // (R)ead
    // getAll: () => instance.get('todos', {
    //     transformResponse: [function (data) {
    //         return data? JSON.parse(data)._embedded.todos : data;
    //     }]
    // }),
    // // (U)pdate
    // updateForId: (id, text, completed) => instance.put('todos/'+id, {title: text, completed: completed}),
    //
    // // (D)elete
    // removeForId: (id) => instance.delete('todos/'+id),
    //
    //
    //
    // //Users
    //
    // // (C)reate
    // createNewUser: (birthday,email,firstname,surname,password,phone,username,role) => instance.post('users', {birthday:birthday,username:username,fullname:firstname+" "+surname,email_address:email,user_password:password,phone_number:phone,role_id:role}),
    // // (R)ead
    // getAllUsers: () => instance.get('users', {
    //     transformResponse: [function (data) {
    //         return data? JSON.parse(data)._embedded.todos : data;
    //     }]
    // }),
    // // (D)elete
    // removeUserForId: (id) => instance.delete('todos/'+id),
    //










}