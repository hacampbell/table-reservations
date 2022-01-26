<template>
    <div class="background">
        <div class="login-container">
            <h1>Test</h1>
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