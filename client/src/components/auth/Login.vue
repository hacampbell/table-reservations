<template>
    <div class="login-container">
        <h1>Login</h1>

        <form @submit.prevent="SendLoginInfo">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" placeholder="Enter username" v-model="username">
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
            </div>

            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</template>

<script>
    import {Login} from '../../services/auth';

    export default {
        name: 'Login',

        data() {
            // Define fields for our data binding model
            return {
                username: '',
                password: ''
            }
        },

        methods: {
            // Used to send the details entered by the user to the server for login
            async SendLoginInfo () {
                await Login(this.username, this.password);
            }
        }
    }
</script>

<style scoped>
    label {
        margin: 5% 5% 1% 5%;
    }

    button {
        margin: 5%;
        min-width: 25%;
    }

    .login-container {
        background-color: rgb(214, 214, 214);
        min-width: 35%;
        min-height: 60%;
        border-radius: 3%;
        padding: 5%;
    }
</style>