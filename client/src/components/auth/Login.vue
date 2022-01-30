<template>
    <div class="login-container">
        <h1>Drop Bear Table</h1>
        <img src="@/assets/img/koala.png" />

        <h2>Login</h2>

        <form @submit.prevent="SendLoginInfo">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" placeholder="Username..." v-model="username">
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password..." v-model="password">
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
                const loginResp = await Login(this.username, this.password);

                // Check the user was able to log in
                if (loginResp === false) {
                    console.log('Unable to log in. Incorrect username or password.');
                    return;
                }

                // Store access and refresh tokens
                this.$store.dispatch('SetAccessToken', loginResp.accessToken);
                this.$store.dispatch('SetRefreshToken', loginResp.refreshToken);

                // Redirect the user to the home page now they're logged in
                this.$router.push({name: 'Home'});
            }
        }
    }
</script>

<style scoped>
    img {
        max-width: 50%;
    }

    h2 {
        margin-top: 5%;
        margin-bottom: 0;
    }

    label {
        margin: 2% 5% 0.5% 5%;
    }

    button {
        margin: 5%;
        min-width: 25%;
    }

    .login-container {
        background-color: rgb(216, 215, 215);
        min-width: 35%;
        min-height: 60%;
        border-radius: 3%;
        padding: 5%;
    }
</style>