export default {
    namespaced: true,

    state: {
        title: 'Dashboard'
    },

    getters: {
        title: state => state.title
    },

    actions: {
        updateTitle(context, payload) {
            context.commit('setTitle', payload);
        }
    },

    mutations: {
        setTitle: (state, payload) => {
            state.title = payload;
        }
    }
}
