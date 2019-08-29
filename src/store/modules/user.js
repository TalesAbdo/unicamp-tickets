export default {
    namespaced: true,

    state() {
        return {
            id: null,
            name: null,
            email: null,
            password: null,
            isSupport: true
        };
    },
    getters: {
        isAuthenticated: () => {
            if (this.id) {
                return true;
            }
            return false;
        }
    },
    mutations: {
        SET_USER(state, user) {
            if (user.newPassword) {
                user.password = user.newPassword;
            }
            state.id = user.id;
            state.name = user.name;
            state.email = user.email;
            state.password = user.password;
            state.isSupport = user.isSupport;
        },
    },
    actions: {
        async setData({ commit }, user) {
            try {
                commit('SET_USER', user);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
