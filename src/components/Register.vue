<template>
    <div class="my-form">
        <div class="cotainer">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Register</div>
                        <div class="card-body">
                            <div name="my-form" >
                                <div class="form-group row">
                                    <label for="full_name" class="col-md-4 col-form-label text-md-right">Full Name</label>
                                    <div class="col-md-6">
                                        <input v-model="user.fullname" type="text" id="full_name" class="form-control" name="full-name">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                    <div class="col-md-6">
                                        <input v-model="user.email_address" type="text" id="email_address" class="form-control" name="email-address">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="phone_number" class="col-md-4 col-form-label text-md-right">Phone Number</label>
                                    <div class="col-md-6">
                                        <input v-model="user.phone_number" type="text" id="phone_number" class="form-control">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="user_name" class="col-md-4 col-form-label text-md-right">User Name</label>
                                    <div class="col-md-6">
                                        <input v-model="user.username" type="text" id="user_name" class="form-control" name="username">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="password" class="col-md-4 col-form-label text-md-right">User Name</label>
                                    <div class="col-md-6">
                                        <input v-model="user.password" type="password" id="password" class="form-control" name="username">
                                    </div>
                                </div>






                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary" v-on:click="validform">
                                        Register
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>

</template>

<script>
    import Api from "../Api";

    export default {
        name: "Register",
        data: () => {
            return {
               user:{
                   birthday:"",
                   fullname:"",
                   password:"",
                   phone_number:"",
                   username:"",
                   email_address: ""
               }
            }
        },
        methods:{
            validform() {

        var a = document.getElementById("full_name").value;
        var b = document.getElementById("email_address").value;
        var c = document.getElementById("phone_number").value;
        var d = document.getElementById("user_name").value;
        var e = document.getElementById("password").value;

        if (a==null || a=="")
        {
            alert("Please Enter Your Full Name");
            return false;
        }else if (b==null || b=="")
        {
            alert("Please Enter Your Email Address");
            return false;
        }else if (c==null || c=="")
        {
            alert("Please Enter Your Username");
            return false;
        }else if (d==null || d=="")
        {
            alert("Please Enter Your Permanent Address");
            return false;
        }else if (e==null || e=="")
        {
            alert("Please Enter Your NID Number");
            return false;
        }
        else {
            alert("register");
            var app = this;

            Api.register(app.user.fullname,app.user.phone_number,app.user.email_address,app.user.username,app.user.password).then(function (resp) {
                alert("successfully registered");
                app.appearSuccess(resp.data.fullname + ' welcome!');

            })
        }

    }
        }
    }
</script>

<style scoped>
    /*body{*/
    /*    margin: 0;*/
    /*    font-size: .9rem;*/
    /*    font-weight: 400;*/
    /*    line-height: 1.6;*/
    /*    color: #212529;*/
    /*    text-align: left;*/
    /*    background-color: #f5f8fa;*/
    /*}*/

    .navbar-laravel
    {
        box-shadow: 0 2px 4px rgba(0,0,0,.04);
    }

    .navbar-brand , .nav-link, .my-form, .login-form
    {
        font-family: Raleway, sans-serif;
    }

    .my-form
    {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
    }

    .my-form .row
    {
        margin-left: 0;
        margin-right: 0;
    }

    .login-form
    {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
    }

    .login-form .row
    {
        margin-left: 0;
        margin-right: 0;
    }
</style>