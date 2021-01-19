<template>
    <transition :name="effect">
        <router-view></router-view>
    </transition>

</template>

<script>
    export default {
        name: "App",

        data: () => ({
            effect: null
        }),

        watch: {
            '$route'(to, from) {
                if (to.path === '/ui/login') this.effect = 'logout';

                if (from.path === '/ui/login') this.effect = 'login';

                //if (from.path !== '/ui/login' && to)
            }
        }
    }
</script>

<style scoped>
    /* login effect bring crm into view once login prompt gone */
    .login-enter-active {
        animation: crm-in 1s;
    }

    /* login effect with prompt growing out of view */
    .login-leave-active {
        animation: grow-out 0.5s;
    }

    .logout-enter-active {
        animation: grow-out 1s reverse;
    }

    .out-leave-active {
        animation: crm-in 1s reverse;
    }


    @keyframes grow-out {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }

    @keyframes crm-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
