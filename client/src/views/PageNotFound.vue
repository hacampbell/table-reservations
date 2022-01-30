<template>
    <div class="container-fluid">
        <div class="row">
            <SideNav activePage="home" />
            <div class="col">
                <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                    <h1>404 - Page Not Found</h1>
                    <h2>You just tried to access a resource that doesn't exist.</h2>
                    <br/>
                    <router-link to='/'>
                        <input type="button" class="btn btn-primary" value="Return to Home" />
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SideNav from '../components/nav/SideNav.vue';

    export default {
        name: 'PageNotFound',

        components: {
            SideNav,
        }
    }
</script>
