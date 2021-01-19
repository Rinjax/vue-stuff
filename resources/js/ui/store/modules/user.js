export default {
    namespaced: true,

    state: {
        user: null
    },

    getters: {
        user: state => state.user,
        isAuthenticated: state => state.user !== null
    },

    actions: {
        getUser(context) {
            return new Promise((resolve, reject) => {

                axios.get('/ui/user').then(response => {
                    if (response.status == 200) {
                        context.commit('setUser', response.data);
                        resolve(response);
                    } else {
                        reject(response);
                    }

                }).catch(error => {
                    reject(error);
                })
            });
        },

        checkIfSessionActive(context) {
            context.dispatch('getUser');
        },
    },

    mutations: {
        setUser: (state, payload) => {
            //if (typeof payload === 'object' && payload !== null) state.user = payload;

            // do want to be able to set null to logout/reset the session. Interceptor sets user null.
            state.user = payload;
        }
    }
}
