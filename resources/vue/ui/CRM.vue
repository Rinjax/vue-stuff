<template>
    <v-app>
        <AppBar></AppBar>
        <NavSideBar></NavSideBar>
        <v-main>
            <router-view name="content"></router-view>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: "CRM",

    created() {
        this.$store.dispatch('user/getUser').catch(e => { console.log(e) });
    }
}
</script>

<style scoped>

</style>
