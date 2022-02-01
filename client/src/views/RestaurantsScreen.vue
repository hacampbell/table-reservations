<template>
    <div class="container-fluid">
        <div class="row">
            <SideNav activePage="restaurants" />
            <div class="col">
                <h2>Test</h2>
            </div>
        </div>
    </div>        
</template>

<script>
    import SideNav from '../components/nav/SideNav.vue';

    export default {
        name: 'Restaurants',
        components: {
            SideNav
        }
    }
</script>