export default {
    namespaced: true,

    state() {
        return {
            id: null,
            name: null,
            email: null,
            password: null,
            isSupport: false,
            image: null
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
                user.password = user.newPassword; // eslint-disable-line
            }
            state.id = user.id; // eslint-disable-line
            state.name = user.name; // eslint-disable-line
            state.email = user.email; // eslint-disable-line
            state.password = user.password; // eslint-disable-line    
            state.isSupport = user.isSupport; // eslint-disable-line
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
