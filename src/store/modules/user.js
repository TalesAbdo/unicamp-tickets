export default {
    namespaced: true,

    state() {
        return {
            name: null,
            email: null,
            image: null,
            isLoggedIn: false
        };
    },
    mutations: {
        SET_USER(state, user) {
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
