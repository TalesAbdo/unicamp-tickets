export default {
    namespaced: true,

    state() {
        return {
            id: null,
            name: null,
            email: null,
            image: null,
        };
    },
    mutations: {
        SET_USER(state, user) {
            state.id = user.id; // eslint-disable-line
            state.name = user.name; // eslint-disable-line
            state.email = user.email; // eslint-disable-line
            state.isLoggedIn = user.isLoggedIn; // eslint-disable-line
        },
    },
    actions: {
        async setData({ commit }, user) {
            try {
                commit('SET_USER', user);
            } catch (error) {
                console.log(error); // eslint-disable-line
            }
        },
    },
};
