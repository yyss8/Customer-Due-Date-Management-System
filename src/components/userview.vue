<template>
    <div class="panel-body">
        <div class='row'>
            <h2 class='col-md-8'>Customer Profile</h2>
            <div class='col-md-4 text-center'>
                <br><br>
                <msgbar ref="msg"></msgbar>
            </div>
        </div>
        <hr />
        <div class='row'>
            <div class='col-md-4'>
                <search requireRefresh='{true}'></search>
            </div>
        </div>

        <br>

        <span style='font-size: 12px;font-weight: 700;'>Customer Information</span>
        <form id='modifyCustForm'>
            <div class='row'>
                <div class="form-group col-md-3">
                    <label class="control-label">ID</label>
                    <input v-model='custid' type="text" class="form-control">
                </div>
                <div class="form-group col-md-3">
                    <label class="control-label">Name</label>
                    <input v-model='custName' type="text" class="form-control">
                </div>
                <div class="form-group col-md-6">
                    <label class="control-label">Email</label>
                    <input v-model='custEmail' type="text" class="form-control">
                </div>
            </div>

            <div class='row'>
                <div class="form-group col-md-3">
                    <label class="control-label">Contact#</label>
                    <input v-model='custNum' type="number" class="form-control">
                </div>
                <div class="form-group col-md-9">
                    <label class="control-label">Contact Address</label>
                    <input v-model='custAddress' type="text" class="form-control">
                </div>
            </div>
        </form>
        <span style='font-size: 12px;font-weight: 700;'>Event Information</span>
    
        <form id='modifyEventForm'>
            <div class='row'>
                <div class="col-md-2">
                    <label class="control-label">ID *</label>
                    <input type="text" class="form-control" required v-model='eventid' readonly>
                </div>
                <div class='col-md-2'>
                    <label class="control-label">Name *</label>
                    <input type="text" class="form-control" required v-model='eventName'>
                </div>
                <div class='col-md-3'>
                    <div class="input-group date" data-provide="datepicker">
                        <label  class="control-label">Date *</label>
                        <div class='input-group'>
                            <input type="text" class="form-control" required id='su_InputEventDate'>      
                            <span class="input-group-addon"><i class="fa fa-table"></i></span>
                        </div>
                    </div>
                </div>
                <div class='col-md-5'>
                    <label class="control-label">Event Note</label>
                    <input type="text" class="form-control" v-model='eventNote'>             
                </div>
            </div>
        </form><br>

        <div class='row'>
            <div class="col-md-10">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th class='text-center'>Note</th>
                        <th class='text-center'>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for='event in events'>
                            <td>{{event.id}}</td>
                            <td>{{event.name}}</td>
                            <td>{{event.date}}</td>
                            <td class='text-center dropdown'>
                                <a class='fa fa-info-circle' href='javascript:void(0)' id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <li><div class='container-fluid'>{{event.note}}</div></li>
                                </ul>
                            </td>
                            <td class='text-center'>{{event.status}}</td>
                            <td class='text-center'>
                                <button class='btn-xs btn-default glyphicon glyphicon-remove' @click='removeSlc(event.id)' style='margin-top:-20px;' v-if="event.status === 'on'"></button>
                                <button class='btn-xs btn-default glyphicon glyphicon glyphicon-ok' @click='removeSlc(event.id)' style='margin-top:-20px;' v-else></button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div class='col-md-2 text-right'>
                <button class='btn btn-default glyphicon glyphicon-plus' @click='addEvent'></button><br>
                <button class='btn btn-default glyphicon glyphicon-minus' @click='removeEvent'></button><br><br>
            </div>
        </div>

        <!-- Save Buttons Starts -->

        <div class="row">
            <div class="col-md-offset-10 col-md-2 text-right">
                <button @click='save' class='btn btn-default'><i class="glyphicon glyphicon-floppy-disk"></i></button><br>
                <button @click='reset' class='btn btn-default'><i class="glyphicon glyphicon-repeat"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
    import _g from "../globals.js";
    import store from "../store.js";
    import search from "./minorcomponents/searchbar.vue";
    import msgbar from "./minorcomponents/msgbar.vue";

    export default {
        data () {
            return {
                custid:"",
                custName:"",
                custEmail:"",
                custNum:"",
                custAddress:"",
                eventid:1,
                eventName:"",
                eventNote:"",
                events:[
                ],
                users:[]
            }
        },
        store,
        computed:{
            currentUser:function(){
                return store.state.selectedUser
            }
        },
        methods:{
            addEvent:function(){
                _g.formValid("form#modifyEventForm :input[required]:visible",(v)=>{
                    if (v){

                        let event = {id:this.eventid,name:this.eventName,date:$("#su_InputEventDate").val(),note:this.eventNote,status:"on"};
                        
                        let ajax = new Promise((resolve,reject) => {
                            $.ajax({
                                url: '/event/add/' + this.custid,
                                type:'POST',
                                contentType: "application/json",
                                data: JSON.stringify(event)
                            }).done(resolve).fail(reject);
                        });

                        let onSuccess = (result) =>{
                            if (result.status == "ok"){
                                this.events.push(event);
                                store.commit("updateCurrentUserEvent", this.events); //update current user events
                                this.reset();
                                if (this.$parent.$refs.search.users.length != 0 ){
                                    this.$parent.$refs.search.getByUsername(); //refresh sidebar search result
                                }   
                            }
                        }

                        let onError = (err) => {
                            
                        }

                        this.$refs.msg.ajaxCall(ajax,onSuccess,onError,{
                            loading:"Event Creating"
                        });

                    }else{
                        this.$refs.msg.errorMsg("Missing Event Infos.")
                    }
                })            
            },
            removeEvent:function(){
                if (this.events.length != 0){
                    this.$refs.msg.successMsg('Event Deleted.');
                    this.events.pop();
                    this.eventid-=1;
                }else{
                    this.$refs.msg.errorMsg("No Event Loaded.")
                }
            },
            removeSlc:function(id){
                this.events.splice(id-1,1);
                for (let i = 1;i<= this.events.length;i++){
                    let index = i - 1;
                    this.events[index].id = i;
                }
                this.$refs.msg.successMsg('Event Deleted.');
                this.eventid = this.events.length + 1;
            },
            save:function(){
                
                _g.formValid("form#modifyCustForm :input[required]:visible",(v) =>{
                    let user = {"A_Username":this.custid,"A_Email":this.custEmail,"A_Name":this.custName,"A_Phone":this.custNum,"A_Address":this.custAddress,"A_Events":this.events};
                    if (v){
                        let ajax = new Promise((resolve,reject) => {
                            $.ajax({
                                url: '/user/' + this.custid,
                                type:'PUT',
                                contentType: "application/json",
                                data: JSON.stringify(user),
                            }).done(resolve).fail(reject);
                        });

                        let onSuccess = (result) => {
                            let curUser = {"username":this.custid,
                                            'name':this.custName,
                                            "email":this.custEmail,
                                            "phone":this.custNum,
                                            "address":this.custAddress,
                                            "events":this.events,
                                            "selected":false };
                            if (result.status == "ok"){
                                if (this.$parent.$refs.search.users.length != 0 ){
                                    this.$parent.$refs.search.getByUsername(); //refresh sidebar search result
                                    curUser.selected = true
                                }
                            }
                            
                            store.commit('selectUserPage',curUser);
                        }

                        let onError = (err) => {

                        }

                        this.$refs.msg.ajaxCall(ajax,onSuccess,onError,{
                            loading:"Modification Processing"
                        })

                    }else{
                        this.$refs.msg.errorMsg("Missing Customer Infos.")
                    }
                });
            },
            reset:function(){
                this.eventName = "";
                $("#su_InputEventDate").val("");
                this.eventNote = "";
                this.loadData();
            },
            loadData(){
                this.eventid = this.currentUser.events.length + 1;
                this.custid = this.currentUser.username;
                this.custName = this.currentUser.name;
                this.custEmail = this.currentUser.email;
                this.custNum = this.currentUser.phone;
                this.custAddress = this.currentUser.address;
                this.events = this.currentUser.events.slice();    
            }
        },
        watch:{
            currentUser:function(){
                this.loadData();              
            }
        },
        created(){
            if (this.currentUser.username != undefined){
                this.loadData();
            }
        },
        components:{
            search,
            msgbar
        }
        
    }
</script>
