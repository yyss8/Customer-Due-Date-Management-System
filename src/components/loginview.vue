<template>
    <div class="col-md-offset-4 col-md-4 login-view">
        <br><br><br><br>
        <div class="col-md-offset-2 col-md-8">
            <form id="login">
                <div>
                    <label class="radio-inline"><input type="radio" value='login' v-model="formType" style="color:white">Login</label>
                    <label class="radio-inline"><input type="radio" value='signup' v-model="formType" style="color:white">Sign Up</label>
                </div><br>
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-user fa-fw" aria-hidden="true"></i></span>
                        <input type="text" v-model="username" :placeholder="unPlaceholder" required class="form-control mainInput" v-on:keyup.enter='loginBnt' data-minlength="2">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-key fa-fw" aria-hidden="true"></i></span>
                        <input type="password" v-model='password' :placeholder="pwPlaceholder" required class="form-control mainInput" v-on:keyup.enter='loginBnt' data-minlength="6">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group" :class='{hidden:emailDisplay}'>
                        <span class="input-group-addon" ><i class="fa fa-envelope fa-fw" aria-hidden="true"></i></span>
                        <input type="email" v-model='email' placeholder="Enter Your E-mail" required class="form-control mainInput" data-error='Please Enter Correc E-mail'>
                    </div>
                </div>
                <button @click="submitBnt" type="button" class="btn btn-primary mainBnt">{{ bntText }}</button>
            </form><br><b style='color:white'>Demo Account: ID:1 Pw:1</b>
            <p class="alert alert-danger" :class="{hidden:resultAlert}" role="alert">
                <i class="fa  fa-exclamation fa-fw" aria-hidden="true" :class="{hidden:resultAlert}"></i>
            {{ result }}</p>
            <p class="alert alert-success" :class="{hidden:resultSuccess}" role="alert">
                <i class="fa  fa-check fa-fw" aria-hidden="true"></i>
            {{ result }}</p>
        </div>
    </div>
</template>

<script>
import store from "../store";

export default {
    data () {
        return {
            username: '',
            password:'',
            email:'',
            result:'',
            resultSuccess:true,
            resultAlert:true,
            bntText:'Login',
            unPlaceholder:'Username',
            pwPlaceholder:'Password',
            emailDisplay:true,
            formType:"login"
        }
    },
    store,
    methods: {
            submitBnt: function() {
                if (this.formValid(this.formType)){
                    switch (this.formType){
                        case 'login':
                            this.login()
                            break;
                        case 'signup':
                            this.signup()
                            break;
                    }
                }
            },
            login:function(){
                $.ajax({
                    url: '/user/login',
                    type:'GET',
                    data: {username:this.username,password:this.password},
                    success: (result)=>{
                        if (result.status == "ok"){
                            if (this.resultAlert != true){
                                this.resultAlert = true;
                            }
                            store.commit("login",result.user);
                            this.resultSuccess = false;
                            this.result = result.content;
                        }else{
                            this.resultAlert = false;
                            this.result = result.content
                        } 
                    }
                });
            },
            signup:function(){
                $.ajax({
                    url: '/m/signup',
                    type:'POST',
                    dataType:"json",
                    data: {'username':this.username,'password':this.password,'email':this.email},
                    success: (result)=>{
                        if (result.status == "ok"){
                            if (this.resultAlert != true){
                                this.resultAlert = true;
                            }
                            this.resultSuccess = false;
                            this.result = result.content;
                        }else{
                            this.resultAlert = false;
                            this.result = result.content
                        } 
                    }
                });
            },
            formValid:function(form){
                let emailValid = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
                if (this.username == ""){
                    this.resultAlert = false;
                    this.result = "Please Enter Username";
                    return false
                }else if (this.password == ""){
                    this.resultAlert = false;
                    this.result = "Please Enter Password";
                    return false
                }else if (form == 'signup' && this.email == ""){
                    this.resultAlert = false;
                    this.result = "Please Enter E-mail Address";
                    return false
                }else if (form == 'signup' && this.email.match(emailValid) == null){
                    this.resultAlert = false;
                    this.result = "Please Enter Correct E-mail";
                    return false
                }else{
                    return true
                }
            },
            successMsg:function(txt){
                this.msg = txt;
                this.msgSuccess = true;
                setTimeout(()=>{
                    this.msg = "";
                    this.msgSuccess = false;
                },3000);
            },
            errorMsg:function(txt){
                this.msg = txt;
                this.msgError = true;
                setTimeout(()=>{
                    this.msg = "";
                    this.msgError = false;
                },3000);            
            }
    },
    watch:{
        'formType':function(){
            switch (this.formType){
                case 'login':
                    this.emailDisplay = true;
                    this.bntText = 'Login';
                    this.unPlaceholder = 'Username';
                    this.pwPlaceholder = 'Password';
                    break;
                case 'signup':
                    this.emailDisplay = false;
                    this.bntText = "Sign Up";
                    this.unPlaceholder = 'Pick A Username';
                    this.pwPlaceholder = 'Enter Your Password';
                    break;
            }
        }
    }
}
</script>

<style>
 .login-view{
    min-height: 360px;
    background-color:cornflowerblue;
    border-radius: 20px;
 }

.mainBnt{
    background-color:cornflowerblue;
    border:2px solid white; 
    width:100%;
}

.mainBnt:hover{
    color:cornflowerblue;
    background-color:white;
    border-color: cornflowerblue;
}


.mainBnt:focus{
    color:cornflowerblue;
    background-color:white;
    border-color: cornflowerblue;
}

.mainBnt:active{
    color:white;
    background-color:cornflowerblue;
    border-color: white;
}
</style>