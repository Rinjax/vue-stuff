<template>
    <v-navigation-drawer
        expand-on-hover
        dark
        app
    >
        <template v-slot:prepend>
            <v-list-item class="px-2" two-line>
                <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/men/20.jpg" alt="">
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>Steve Temple</v-list-item-title>
                    <v-list-item-subtitle>steve.temple@focusgroup.co.uk</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>
        <v-list dense nav>
            <v-list-item link @click="synergy">
                <v-list-item-icon>
                    <v-icon>mdi-alpha-s-box-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Synergy</v-list-item-title>
                </v-list-item-content>

            </v-list-item>
            <router-link
                v-for="(route, index) in routes"
                :key="index"
                :to="route.path">

                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>{{ route.meta.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ route.name }}</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
            </router-link>

        </v-list>
    </v-navigation-drawer>
</template>

<script>


export default {
    name: "NavSideBar",
    data: () => ({
        draw: null,
    }),

    computed: {
        routes() {

            // todo make this better, using the array index is bad idea as might change
            return this.$router.options.routes[2].children.filter(route => {
                return route.meta.list_in_nav
            })
        }
    },

    methods: {
        synergy(){
            window.location.href = 'http://dev.synavel.co.uk/ui/synergy';
        }
    }
}
</script>

<style scoped>
    a {
        text-decoration: none;
    }

    a.router-link-active > div {
        background-color: #1a202c;
    }
</style>
