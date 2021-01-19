<template>
    <v-container>
        <v-row>
            <v-col>
                <h1 class="pt-9">some cool awesome widgets here</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-row>
                    <v-col></v-col>
                </v-row>
                <v-row>
                    <v-col></v-col>
                </v-row>
            </v-col>
            <v-col>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>


export default {
    name: "Dashboard",

    data: () => ({

    }),

    methods: {

    },

    created() {
        this.$store.dispatch('app/updateTitle', 'Dashboard');


    }
}
</script>

<style scoped>

</style>
