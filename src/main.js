import router from "./router";
import store from "./store";

const app = new Vue({
    router,
    store,
    computed:{
        isAuth (){
            return store.state.loginStatus
        }
    },
    watch:{
        "isAuth":function (){
            if (this.isAuth){
                this.$router.push('/cp/createUser');
            }
        }
    },
    beforeCreate(){
        $.ajax({
            url: '/user/loginStatus',
            type:'GET',
            success: (r)=>{ 
                if (r.status == "ok"){
                    store.commit("login",r.user);
                }
            }
        });
    }
}).$mount('#main');

