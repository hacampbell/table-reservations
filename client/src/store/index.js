import { createStore } from 'vuex'

export default createStore({
    state: {
        accessToken: '',   // Token to be sent with Authorization header
        refreshToken: '',  // Token used to efresh access token after it expires
        resDataGlobal: []  // A list of all of the users reservations
    },

    mutations: {
        //Stores a given access token in the vuex store
        SetAccessToken (state, newToken) {
            state.accessToken = newToken;
        },

        //Stores a given refresh token in the vuex store
        SetRefreshToken (state, newToken) {
            state.refreshToken = newToken;
        },

        //Stores the new reservations
        UpdateResData (state, newData) {
            state.resDataGlobal =  newData;
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
        },

        // Sets the global reservations 
        UpdateResData ({commit}, newData) {
            commit('UpdateResData', newData);
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
        },

        // Gets the stored reservations
        GetResData (state) {
            return state.resDataGlobal;
        }
    },

    modules: {
    }
})
