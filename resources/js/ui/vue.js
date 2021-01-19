window.Vue = require('vue');

import App from "../../vue/ui/App";

import vuetify from "./vuetify";
import {store} from "./store/store.js";
import {router} from "./router"
//import VueApexCharts from "vue-apexcharts";

//Vue.component('apexchart', VueApexCharts);

Vue.config.productionTip = false;

const files = require.context('../vue/global-components', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));


/**
 * Axios interceptor to catch backend responses if the user session has timed out or not authenticated.
 */
axios.interceptors.response.use(
        success => {
            if (success.status === 401 || success.status === 419) {
                console.log('status: ' + success.status);
                console.log('should be redirecting');
                console.log(router.currentRoute.path);
                store.commit('user/setUser', null);
                if (router.currentRoute.path !== '/ui/login') router.push({name: 'Login'});
            }

            return success;
        },
        error => error
);


/**
 * Global Auth guard. If user is not logged in then redirect to login. Dont think need this as axios interceptor will
 * catch 401 or 419 which would happen on pages loading thing dynamically, and CRM component has getUser on created hook
 */
/*router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !store.getters['user/isAuthenticated']) next({ name: 'Login' })
    else next();
});*/



const vue = new Vue({
    vuetify,
    router,
    store: store,
    el: '#vue',
    render: h => h(App)
});
