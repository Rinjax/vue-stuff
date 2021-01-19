<template>
    <v-card :color="color">
        <v-system-bar :color="color + ' darken-3'" class="py-9 justify-center">
            <h3>{{title}}</h3>
        </v-system-bar>
        <v-row>
            <v-col class="d-flex align-center justify-center">
                <v-icon large>{{icon}}</v-icon>
                <p style="color: #353030; margin: 0; font-size: 2rem">{{amount}}</p>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
name: "DashboardOverviewCard",
    props: ['icon', 'title', 'amount', 'color']
}
</script>

<style scoped>

</style>
