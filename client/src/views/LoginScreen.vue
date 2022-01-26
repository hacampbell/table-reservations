<template>
    <div class="background">
        <div class="login-container">
            <h1>Login</h1>

            <form>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" aria-describedby="username" placeholder="Enter username">
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password">
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>


<script>

    export default {
        mounted () {
            console.log('Hello World!');
        }
    }
</script>


<style>
    body {
        margin: 0px 0px 0px 0px;
        padding: 0px 0px 0px 0px;
        border: 0px 0px 0px 0px;
    }

    form {
        margin-top: 15%;
        margin-left: 8%;
        max-width: 85%;
    }

    label {
        margin-top: 5%;
        margin-bottom: 1%;
    }

    button {
        margin-top: 5%;
        min-width: 20%;
    }

    .background {
        background-color: rgb(45, 46, 46);
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .login-container {
        background-color: rgb(214, 214, 214);
        width: 35%;
        height: 50%;
        justify-content: center;
        border-radius: 5%;
    }

    @media only screen and (max-width: 900px) {
        .login-container {
            width: 70%;
            height: 70%
        }
    }
</style>