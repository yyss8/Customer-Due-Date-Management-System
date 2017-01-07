<template>
    <div class="panel-body">
        

        <div class='row'>
            <h2 class='col-md-8'>Events Information</h2>
            <div class='col-md-4 text-center'>
                <br><br>
                <span :class='{ "alert-danger":msgError,"alert-success":msgSuccess }' role="alert">
                <i class='fa fa-circle-o-notch fa-spin' :class='{hidden:spinHidden}'>&nbsp;&nbsp;</i>
                {{msg}}
                </span>
            </div>
        </div>
        <hr />

        <form id='addEventForm'>
            <div class='row'>
                <div class='col-md-2'>
                    <label class="control-label">ID *</label>
                    <input type="text" class="form-control" required v-model='eventUser'>
                </div>
                <div class='col-md-2'>
                    <label class="control-label">Name *</label>
                    <input type="text" class="form-control" required v-model='eventName'>
                </div>
                <div class='col-md-3'>
                    <div class="input-group date" data-provide="datepicker">
                        <label  class="control-label">Date *</label>
                        <div class='input-group'>
                            <input type="text" class="form-control" required id='ae_InputEventDate'>      
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

        <div class="row">
                <div class="col-md-3">        
                    <div class="btn-group">
                        <label class='btn btn-default active'>All <input type="radio" value='all' v-model='schType'></label>
                        <label class='btn btn-default'>ID <input type="radio" value='user' v-model='schType'></label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class='input-group' :class='{hidden:typeHidden}'>
                        <input type="text" class="form-control" v-model='schUserName' placeholder='ID'>
                        <span class="input-group-addon">
                            <a href='javascript:void(0)' @click='getEvents'><i class="glyphicon glyphicon-search"></i></a>
                        </span>
                    </div>
                </div>
                <div class="col-md-offset-3 col-md-3 text-right">  
                    <button class='btn btn-default glyphicon glyphicon-repeat' @click='getEvents'></button>
                </div>
        </div>
        <div class='row'>
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th><a href='javascript:void(0)' @click='sortBy("username")'>Customer <span class="caret"></span></a></th>
                        <th><a href='javascript:void(0)' @click='sortBy("name")'>Name <span class="caret"></span></a></th>
                        <th><a href='javascript:void(0)' @click='sortBy("date")'>Date <span class="caret"></span></a></th>
                        <th class='text-center'>Note</th>
                        <th class='text-center'>Status</th>
                        <th class='text-center'></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for='event in events'>
                            <td>{{event.username}}</td>
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

        </div>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                eventUser:"",
                eventName:"",
                eventNote:"",
                events:[],
                schType:"all",
                schUserName:"",
                typeHidden:true,
                spinHidden:true,
                msg:"",
                msgError:false,
                msgSuccess:false,
                sortTable:{
                    date:false,
                    username:false,
                    name:false
                }
            }
        },
        methods:{
            getEvents:function() {
                this.spinHidden = false;
                $.ajax({
                    url: `/event/all?kyWrds=${this.schUserName}`,
                    type:'GET',
                    success: (r)=>{ 
                        if (r.status == "ok"){
                            if (r.result.length == 0){
                                this.spinHidden = true;
                                this.errorMsg("No Event Found For This ID");
                            }else{
                                this.spinHidden = true;
                                this.events = r.result;
                                this.successMsg("Event List Loaded");
                            }
                        }else{
                            this.errorMsg(r.content);
                        }
                    }
                });
            },
            sortBy:function(t){
                if (this.sortTable[t]){
                    if (t != "date"){
                        this.events = this.events.sort(function(a,b) {return (a[t]> b[t]) ? 1 : ((b[t] > a[t]) ? -1 : 0);});
                    }else{
                        this.events = this.events.sort(function(a,b) {return (new Date(a[t]) > new Date(b[t])) ? 1 : (new Date((b[t]) > new Date(a[t])) ? -1 : 0);});
                    }
                    this.sortTable[t] = false;
                }else{
                    if (t != "date"){
                        this.events = this.events.sort(function(a,b) {return (a[t]> b[t]) ? -1 : ((b[t] > a[t]) ? 1 : 0);});
                    }else{
                        this.events = this.events.sort(function(a,b) {return (new Date(a[t]) > new Date(b[t])) ? -1 : (new Date((b[t]) > new Date(a[t])) ? 1 : 0);});
                    }
                    this.sortTable[t] = true;  
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
            },
            search:function(){

            }
        },
        watch:{
            "schType":function () {
                if (this.schType == "all"){
                    this.schUserName = "";
                    this.typeHidden = true;
                }else{
                    this.typeHidden = false;
                }
            },
            "hideStatus":function() {
                if (!this.hideStatus){
                    this.getEvents();
                }
            }
        },
        created(){
            this.getEvents();
        }
    }
</script>