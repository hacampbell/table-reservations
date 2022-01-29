<template>
    <div class="register-container">
        <h1>Drop Bear Table</h1>
        <img src="@/assets/img/koala.png" />

        <h2>Sign Up</h2>

        <form @submit.prevent="SendRegisterDetails">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" id="email" placeholder="Email..." v-model="email">
            </div>

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
    import {Register} from '../../services/auth';

    export default {
        name: 'Register',

        data() {
            // Define fields for our data binding model
            return {
                email: '',
                username: '',
                password: ''
            }
        },

        methods: {
            // Used to send the details to create a new user
            async SendRegisterDetails () {
                const response = await Register(this.email, this.username, this.password);
                
                // If we successfully created a new user, send them to login
                if (response === true) {
                    this.$router.push({name: 'Login'}); 
                } else {
                    // Otherwise, for now, just console log the errors
                    console.log(`${response.error}`);
                }
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

    .register-container {
        background-color: rgb(216, 215, 215);
        min-width: 35%;
        min-height: 60%;
        border-radius: 3%;
        padding: 5%;
    }
</style>