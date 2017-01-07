<template>
    <div>
        <div class="input-group">

        <input v-model='schKeywords' type='text' class="form-control" placeholder='User Search' v-on:keyup='keyUpSearch'>        <!-- Keywords Input -->

        <!-- Keywords Buttons Starts -->

        <div class="input-group-btn">
            <button class="btn btn-default" type="button" @click='search'><i class="glyphicon glyphicon-search"></i></button>
            <button class="btn btn-default" :class='{hidden:removeBtn}' type="button" @click='clearResult'><i class="glyphicon glyphicon-remove"></i></button>
        </div>
        </div>
        <div class='alert-danger' :class='{alert:schAlertHid}'>{{schAlert}}</div>
        <slot></slot>

        <!-- Result List Starts -->

        <ul class='nav nav-second-level  list-group-item-overflow'>
            <a v-for="user in users" class='list-group-item list-group-item-action' :class='{active:user.selected}' @click="select(user)" href='javascript:void(0)'>
                {{ user.username }} <span class="badge">{{ user.eventDue }}</span>
            </a>
        </ul>   
    </div>
</template>

<script>
    import store from "../../store";
    export default {
        data () {
            return {
                schKeywords:'',
                schAlert:'',
                schAlertHid:false,
                removeBtn:true,
                users:[]
            }
        },
        props:['requireRefresh'],
        store,
        methods:{
            select:function (un){
                if (un.username != "No Result"){
                    let userNum = this.users.indexOf(un);
                    if (this.prevSelected != 1000){
                        this.users[this.prevSelected].selected = false;
                    }
                    this.users[userNum].selected = true;
                    this.prevSelected = userNum;
                    this.$router.push('/cp/user');
                    store.commit("selectUserPage",this.users[this.prevSelected]); 
                    if (this.requireRefresh){
                        this.clearResult();
                    }
                }
            },
            search:function(){
                this.schAlert = '';
                this.getByUsername();
            },
            keyUpSearch:function(){
                if (this.schKeywords.length != 0){
                    this.schAlert = '';
                    this.getByUsername();
                }
            },
            getByUsername:function(){
                $.ajax({
                    url: '/m/users/byusername',
                    type:'GET',
                    data: {kyWrds:this.schKeywords},
                    success: (r)=>{
                        this.prevSelected = 1000;
                        this.users.length = 0;
                        if (r.results.length != 0){
                            r.results.forEach((result) => {
                                let user = { "username":result.A_Username,
                                            'name':result.A_Name,
                                            "email":result.A_Email,
                                            "phone":result.A_Phone,
                                            "address":result.A_Address,
                                            "events":result.A_Events,
                                            "selected":false };
                                let eventDue = 0;
                                if (user.events.length != 0 ){
                                    user.events.forEach((e) => {
                                        let dueDate = new Date(e.date);
                                        let today = new Date();
                                        if ((dueDate - today) / (1000*60*60*24) <= 5){
                                            eventDue += 1;
                                        }
                                    });
                                };
                                user["eventDue"] = eventDue;
                                this.users.push(user);
                            });
                        }else{
                            let notFound = {"username":"No Result","selected":false};
                            this.users.push(notFound);
                        }

                    }
                });
            },
            clearResult:function(){
                this.users.length = 0;
                this.removeBtn = true;
                this.schKeywords = "";
            }
        },
        watch:{
            schKeywords:function(){
                if (this.schKeywords.length == 0){
                    this.schAlertHid = false;
                    this.schAlert = "";
                    this.users.length = 0;
                    this.removeBtn = true;
                }
            },
            users:function (){
                if (this.users.length != 0 ){
                    this.removeBtn = false;
                }
            }
        }
    }
</script>