<template>
    <div class="background">
        <Login />
    </div>
</template>

<script>
    import Login from '../components/auth/Login.vue';

    export default {
        name: 'LoginScreen',
        components: {
            Login
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
</style>