const store = new Vuex.Store({
    state: {
        currentUser:"",
        loginStatus:false,
        selectedUser:{}
    },
    mutations: {
        login (state,user) {
            state.currentUser = user;
            state.loginStatus = true;
        },
        selectUserPage (state,user){
            state.selectedUser = user;
        },
        updateCurrentUserEvent(state,events){
            state.selectedUser.events = events;
        }
    }
});


export default store