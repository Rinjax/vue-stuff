<template>
    <v-container class="fill-height">
        <div class="d-flex justify-center align-center" style="height: 100%; width: 100%">
            <v-card width="500">
                <v-system-bar
                        dark
                        color=""
                        class="py-4"
                >
                    <v-card-title>Upload BT Document</v-card-title>
                </v-system-bar>
                <v-card-text>
                    <v-file-input
                            v-model="btDocument"
                            show-size
                            label="BT Excel Doc"
                            prepend-icon="mdi-file-table"
                            accept=".xlsx"

                    ></v-file-input>
                </v-card-text>
                <v-card-action class="d-flex justify-center pb-2">
                    <v-btn @click="uploadBtDocument">Upload</v-btn>
                </v-card-action>
            </v-card>
        </div>

    </v-container>
</template>

<script>
export default {
    name: "BTWithdraw",
    components: {


    },

    data: () => ({
        btDocument: null
    }),

    methods: {
        uploadBtDocument() {
            axios.post('/')
        }
    },

    mounted() {
        this.$store.dispatch('app/updateTitle', 'BT Withdraw Project');
    }
}
</script>

<style scoped>
</style>
