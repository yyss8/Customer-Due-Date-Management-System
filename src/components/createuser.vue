<template>
    <div class="panel-body">

        <!-- Customer Page Header Starts -->

        <div class='row'>
            <h2 class='col-md-8'>New Customer Profile</h2>
            <div class='col-md-4 text-center'>
                <br><br>
                <span :class='{ "alert-danger":msgError,"alert-success":msgSuccess }' role="alert" class='pull-right'>
                <i class='fa fa-circle-o-notch fa-spin' :class="{hidden:spinHidden}">&nbsp;&nbsp;</i>
                {{msg}} 
                </span>
            </div>
        </div>
        <hr />
        <!-- Customer Form Starts -->

        <span style='font-size: 12px;font-weight: 700;'>Customer Information</span>
        <form id='newCustForm'>
            <div class='row'>
                <div class="form-group col-md-3">
                    <label class="control-label">ID *</label>
                    <input v-model='custid' type="text" class="form-control" required>
                </div>
                <div class='form-group col-md-3'>
                    <label class="control-label">Name *</label>
                    <input v-model='custName' type="text" class="form-control" required>
                </div>
                <div class='form-group col-md-6'>
                    <label class="control-label">Email *</label>
                    <input v-model='custEmail' type="email" class="form-control" required>
                </div>
            </div>
            <br>
            <div class='row'>
                <div class="form-group col-md-3">
                    <label class="control-label">Contact#</label>
                    <input v-model='custNum' type="number" class="form-control" required>
                </div>
                <div class='form-group col-md-9'>
                    <label class="control-label">Contact Address</label>
                    <input v-model='custAddress' type="text" class="form-control">
                </div>
            </div>
            <span style='font-size: 12px;font-weight: 700;'>Customer Event Information</span>
        </form>

        <!-- Event Form Starts -->

        <form id='newEventForm'>
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
                        <label for="us_InputEventDate" class="control-label">Date *</label>
                        <div class='input-group'>
                            <input type="text" class="form-control" required id='us_InputEventDate'>      
                            <span class="input-group-addon"><i class="fa fa-table"></i></span>
                        </div>
                    </div>
                </div>
                <div class='col-md-5'>
                    <label for="us_InputEventDet" class="control-label">Event Note</label>
                    <input type="text" class="form-control" id="us_InputEventDet" v-model='eventNote'>             
                </div>
            </div>
        </form><br>

        <!-- Event Table Starts -->

        <div class='row'>
            <div class="col-md-10">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th class='text-center'>Note</th>
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
                            <td class='text-center'><button class='btn-xs btn-default glyphicon glyphicon-remove' @click='removeSlc(event.id)' style='margin-top:-20px;'></button></td>
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
                <button @click='reset' class='btn btn-default'><i class="glyphicon glyphicon-trash"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
    import _g from "../globals.js";

    export default {
        data () {
            return {
                msg:"",
                msgSuccess:false,
                msgError:false,
                spinHidden:true,
                custid:"",
                custName:"",
                custEmail:"",
                custNum:"",
                custAddress:"",
                eventid:1,
                eventName:"",
                eventNote:"",
                events:[
                ]
            }
        },
        methods:{
            addEvent:function(){
                _g.formValid("form#newEventForm :input[required]:visible",(v)=>{
                    if (v){
                        let event = {id:this.eventid,name:this.eventName,date:$("#us_InputEventDate").val(),note:this.eventNote};
                        this.successMsg('Event Added.')
                        this.events.push(event);
                        this.eventName = "";
                        $("#us_InputEventDate").val("");
                        this.eventNote = "";
                        this.eventid+=1;
                    }else{
                        this.errorMsg("Missing Event Infos.")
                    }
                })
            },
            removeEvent:function(){
                if (this.events.length != 0){
                    this.successMsg('Event Deleted.')
                    this.events.pop();
                    this.eventid-=1;
                }else{
                    this.errorMsg("No Event Loaded.")
                }

            },
            save:function(){        
                let user = {"A_Username":this.custid,"A_Password":"111","A_Email":this.custEmail,"A_Type":"C","A_Name":this.custName,"A_Phone":this.custNum,"A_Address":this.custAddress,"A_Events":this.events};
                _g.formValid("form#newCustForm :input[required]:visible",(v) =>{
                    this.spinHidden = false;
                    this.successMsg("User Creating");
                    if (v){
                        $.ajax({
                            url: '/user/' + this.custid,
                            type:'POST',
                            contentType: "application/json",
                            data: JSON.stringify(user),
                            success: (result)=>{
                                if (result.status == "ok"){
                                    this.spinHidden = true;
                                    this.successMsg(result.content);
                                    $('#newCustForm')[0].reset();
                                    this.eventid = 1;
                                    this.events.length = 0;
                                    this.eventName = "";
                                    this.eventNote = "";
                                }else{
                                    this.errorMsg(result.content);
                                } 
                            }
                        });
                    }else{
                        this.errorMsg("Missing Customer Infos.")
                    }
                });
            },
            removeSlc:function(id){
                this.events.splice(id-1,1);
                for (let i = 1;i<= this.events.length;i++){
                    let index = i - 1;
                    this.events[index].id = i;
                }
                this.eventid = this.events.length + 1;
            },
            reset:function(){
                this.successMsg('Forms Reset.')
                $('#newCustForm')[0].reset();
                this.eventid = 1;
                this.events.length = 0;
                this.eventName = "";
                this.eventNote = "";
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
        }
    }
</script>