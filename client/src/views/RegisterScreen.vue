<template>
    <div class="background">
        <Register />
    </div>
</template>

<script>
    import Register from '../components/auth/Register.vue';

    export default {
        name: 'RegisterScreen',
        components: {
            Register
        }
    }
</script>

<style>
    .background {
        background-color: rgb(35, 39, 61);
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-y: auto;
    }
</style>