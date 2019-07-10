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
            state.name = user.name;
            state.email = user.email;
            state.serial = user.serial;
            state.isLoggedIn = user.isLoggedIn;
        },
    },
    actions: {
        async getInfo({ commit }, user) {
            try {
                commit('SET_USER', user);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
