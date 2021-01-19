import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from  "vuex-persist";
import modules from "./modules" //autoload store modules

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
    key: 'vuex', // the key to store the state on, in the storage provider
    storage: window.localStorage, // or window.sessionStorage
    reducer: state => ({
        user: state.user
    })
});

export const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules,
    plugins: [vuexLocalStorage.plugin]
});
