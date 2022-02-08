<template>
    <div class="register-container">
        <h1>Drop Bear Table</h1>
        <img src="@/assets/img/koala.png" />

        <h2>Sign Up</h2>

        <p v-if="errors.length">
            Please correct the following error(s):
            <ul>
                <li class="text-danger" v-for="(error, index) in this.errors" :key="index">{{ error }}</li>
            </ul>
        </p>

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

            <button type="submit" class="btn btn-primary">Register</button>
        </form>

        <router-link to="/login" >Already a member? Sign in here.</router-link>
    </div>
</template>

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

    a {
        color: rgb(46, 46, 46);
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    p {
        margin-top: 1%;
    }

    p ul{
        text-align: left;
    }

    p b {
        color: black;
    }

    .register-container {
        background-color: rgb(216, 215, 215);
        width: 40%;
        min-height: 60%;
        border-radius: 3%;
        padding: 2% 5%;
    }

    @media screen and (max-width: 992px) { 
        .register-container {
            min-width: 90%;
            min-height: 100%;
            border-radius: 0;
            padding: 2% 5%;
        }
    }
</style>

<script>
    import {Register} from '../../services/auth';
    const validator = require('../../services/registerDataValidation');

    export default {
        name: 'Register',

        data() {
            // Define fields for our data binding model
            return {
                email: '',
                username: '',
                password: '',
                errors: []
            }
        },

        methods: {
            // Used to send the details to create a new user
            async SendRegisterDetails () {
                this.CheckData();

                if (this.errors.length > 0) return;

                const response = await Register(this.email, this.username, this.password);
                
                // If we successfully created a new user, send them to login
                if (response === true) {
                    this.$router.push({name: 'Login'}); 
                } else {
                    // Otherwise, for now, just console log the errors
                    console.log(`${response.error}`);
                }
            },

            // Checks that the values entered on the form are valid
            CheckData () {
                this.errors = [];

                if (!validator.isValidEmail(this.email)) {
                    this.errors.push('A valid email must be entered.');
                }

                if (!validator.isValidUsername(this.username)) {
                    this.errors.push('Usernames must be between 3 and 25 characters long, and contain only letters and numbers.');
                }

                if (!validator.isValidPassword(this.password)) {
                    this.errors.push('Passwords must be between 8 and 25 characters long, contain only letters and numbers, at least one uppercase letter, and no spaces');
                }
            }
        }
    }
</script>