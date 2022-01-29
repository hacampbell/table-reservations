import { createStore } from 'vuex'

export default createStore({
    state: {
        accessToken: '',   // Token to be sent with Authorization header
        refreshToken: '',  // Token used to efresh access token after it expires
    },

    mutations: {
        //Stores a given access token in the vuex store
        SetAccessToken (state, newToken) {
            state.accessToken = newToken;
        },

        //Stores a given refresh token in the vuex store
        SetRefreshToken (state, newToken) {
            state.refreshToken = newToken;
        }
    },

    actions: {
        // Sets the access token
        SetAccessToken ({commit}, newToken) {
            commit('SetAccessToken', newToken);
        },

        // Sets the refresh token
        SetRefreshToken ({commit}, newToken) {
            commit('SetRefreshToken', newToken);
        }
    },

    getters: {

        //Gets the stored access token
        GetAccessToken (state) {
            return state.accessToken;
        },

        //Gets the stored refresh token
        GetRefreshToken (state) {
            return state.refreshToken
        }
    },

    modules: {
    }
})
