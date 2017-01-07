let loginForm = new Vue({
    el: '#loginForm',
    data: {
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
    },
    methods: {
        submitBnt: function() {
            if (this.formValid(selectForm.formType)){
                switch (selectForm.formType){
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
                        this.resultSuccess = false;
                        mainController.loginSuccess();
                        mainHeaderField.username = result.user;
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
                        mainHeaderField.username = result.user;
                        mainController.loginSuccess();
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
        }
    }
});

let selectForm = new Vue({
    el:'#formSelect',
    data:{
        formType:'login',
    },
    methods:{
    },
    watch:{
        'formType':function(){
            switch (this.formType){
                case 'login':
                    loginForm.emailDisplay = true;
                    loginForm.bntText = 'Login';
                    loginForm.unPlaceholder = 'Username';
                    loginForm.pwPlaceholder = 'Password';
                    break;
                case 'signup':
                    loginForm.emailDisplay = false;
                    loginForm.bntText = "Sign Up";
                    loginForm.unPlaceholder = 'Pick A Username';
                    loginForm.pwPlaceholder = 'Enter Your Password';
                    break;
            }
        }
    }
});

let schField = new Vue({
    el:"#schField",
    template:
    `
    <div class="col-md-4" :style='{display:loginStatus}'>
        <div class='sidebar-nav navbar-collapse'>
            <div class="list-group">
                <div class='list-group-item'>
                    <div class="input-group">
                        <div class='input-group-btn'>

                            <!-- Search Type Dropdown Starts -->

                            <div class="dropdown">
                                <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {{schType}}
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a @click="selectType('ID')" href='javascript:void(0)'><i class="fa fa-users fa-fw" aria-hidden="true"></i>&nbsp; ID</a></li>
                                    <li><a @click="selectType('E-mail')" href='javascript:void(0)'><i class="fa fa-envelope fa-fw" aria-hidden="true"></i>&nbsp; E-mail</a></li>
                                    <li><a @click="selectType('Name')" href='javascript:void(0)'><i class="fa fa-vcard fa-fw" aria-hidden="true"></i>&nbsp; Name</a></li>
                                    <li><a @click="selectType('Address')" href='javascript:void(0)'><i class="fa fa-building fa-fw" aria-hidden="true"></i>&nbsp; Address</a></li>
                                </ul>
                            </div>
                        </div>
                        <input v-model='schKeywords' type='text' class="form-control" placeholder='Search' v-on:keyup='keyUpSearch'>        <!-- Keywords Input -->

                        <!-- Keywords Buttons Starts -->

                        <div class="input-group-btn">
                            <button class="btn btn-default" type="button" @click='search'><i class="glyphicon glyphicon-search"></i></button>
                            <button class="btn btn-default" :class='{hidden:removeBtn}' type="button" @click='clearResult'><i class="glyphicon glyphicon-remove"></i></button>
                        </div>
                    </div>
                    <div class='alert-danger' :class='{alert:schAlertHid}'>{{schAlert}}</div>
                    <br>

                    <!-- Result List Starts -->

                    <ul class='nav nav-second-level  list-group-item-overflow'>
                        <a v-for="user in users" class='list-group-item list-group-item-action' :class='{active:user.selected}' @click="select(user)" href='javascript:void(0)'>
                            {{ user.username }} <span class="badge">{{ user.eventDue }}</span>
                        </a>
                    </ul>       
                </div>

                <!-- Sidebar Switch Pages Starts -->

                <button class="list-group-item" onclick="mainController.switchPg('selectedUserField')">
                    <i class="fa fa-user"></i>&nbsp; Manage User Infos<span class="caret-right pull-right"></span>
                </button>
                <button class="list-group-item" @click="switchPg('createUserField')">
                    <i class="fa fa-users"></i>&nbsp; Create Customer Infos<span class="caret-right pull-right"></span>
                </button>
                <button class="list-group-item" @click="switchPg('summaryField')">
                    <i class="fa  fa-database"></i>&nbsp; Data Summary & Report<span class="caret-right pull-right"></span>
                </button>
                <button class="list-group-item">
                    <i class="fa  fa-gear"></i>&nbsp; Control Panel Setting<span class="caret-right pull-right"></span>
                </button>
            </div> 
        </div>       
    </div>
    `,
    data:{
        schKeywords:'',
        schType:'Type',
        schAlert:'',
        schAlertHid:false,
        loginStatus:"none",
        removeBtn:true,
        users:[
        ],
        prevSelected:1000 //default selected index
    },
    methods:{
        select:function(un){
            if (un.username != "No Result"){
                let userNum = this.users.indexOf(un);
                if (this.prevSelected != 1000){
                    this.users[this.prevSelected].selected = false;
                }
                this.users[userNum].selected = true;
                this.prevSelected = userNum;
                selectedUserField.user = this.users[this.prevSelected];
                mainController.switchPg("selectedUserField");
            }
        },
        switchPg:function (nxtPg){
            mainController.switchPg(nxtPg);
            this.clearResult();
        },
        selectType:function (t){
            if(this.schType != t){
                this.schAlert = "";
                this.schType = t;
                this.schKeywords = '';
                this.users = [];
                this.removeBtn = true;
                this.schAlertHid = false;
            }  
        },
        search:function(){
            this.schAlert = '';
            switch (this.schType){
                case 'Type':
                    this.schAlertHid = true;
                    this.schAlert = 'Please Select A Search Type';
                    break;
                case 'ID':
                    this.getByUsername();
                    break;
            }
        },
        keyUpSearch:function(){
            if (this.schKeywords.length != 0){
                this.schAlert = '';
                switch (this.schType){
                    case 'Type':
                        this.schAlertHid = true;
                        this.schAlert = 'Please Select A Search Type';
                        break;
                    case 'ID':
                        this.getByUsername();
                        break;
                }
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
                                        "password":result.A_Password,
                                        'name':result.A_Name,
                                        "email":result.A_Email,
                                        "untype":result.A_Type,
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
})

let mainHeaderField = new Vue({
    el:"#mainHeaderField",
    template:`
        <nav :style='{display:loginStatus}' class='navbar'>
            <p class="navbar-text" style='color:white'>Control Panel</p>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a class="btn dropdown-toggle" data-toggle="dropdown" href='#' style='font-size:120%'><i class="fa fa-user fa-fw" aria-hidden="true"></i> <span class="caret"></span></a>
                    <ul class="dropdown-menu" style='float:left'>
                        <li><a @click="selectType('Username')"><i class="fa fa-user fa-fw" aria-hidden="true"></i>&nbsp; User Profile</a></li>
                        <li><a @click="selectType('Username')"><i class="fa fa-gear fa-fw" aria-hidden="true"></i>&nbsp; Setting</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href='user/logout'><i class="fa  fa-sign-out fa-fw" aria-hidden="true"></i>&nbsp; Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    `,
    data:{
        username:"",
        loginStatus:"none"
    }

});

let createUserField = new Vue({
    el:"#createUserField",
    template:`
    <div class="panel-body" :class='{hidden:hideStatus}'>

        <!-- Customer Page Header Starts -->

        <div class='row'>
            <h2 class='col-md-8'>New Customer Profile</h2>
            <div class='col-md-4 text-center'>
                <br><br>
                <span :class='{ "alert-danger":msgError,"alert-success":msgSuccess }' role="alert" class='pull-right'>
                <span :class='{ hidden:spinHidden }'><i class='fa fa-circle-o-notch fa-spin'></i></span>
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
    `,
    data:{
        hideStatus:true,
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
    },
    methods:{
        addEvent:function(){
            mainController.formValid("form#newEventForm :input[required]:visible",(v)=>{
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
            mainController.formValid("form#newCustForm :input[required]:visible",(v) =>{
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
                                if (schField.users.length != 0){
                                    schField.getByUsername();
                                }
                                this.successMsg(result.content);
                                this.reset();
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
            this.successMsg('Forms Reset.');
            this.custid = "";
            this.custName = "";
            this.custEmail = "";
            this.custNum = "";
            this.custAddress = "";
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
});

let selectedUserField = new Vue({
    el:"#selectedUserField",
    template:
    `
    <div class="panel-body" :class='{hidden:hideStatus}'>


        <div class='row'>
            <h2 class='col-md-8'>Customer Profile</h2>
            <div class='col-md-4 text-center'>
                <br><br>
                <span :class='{ "alert-danger":msgError,"alert-success":msgSuccess }' role="alert">
                <i class='fa fa-circle-o-notch fa-spin' :class='{hidden:spinHidden}'>&nbsp;&nbsp;</i>
                {{msg}}
                </span>
            </div>
        </div>
        <hr />
        <div class='row'>
            <div class='col-md-4'>
                <div class='input-group'>
                    <input v-model='schKeywords' type='text' class="form-control" placeholder='Search User' v-on:keyup='keyUpSearch' id='su_SchInput' data-placement="bottom" data-trigger='manual'>        <!-- Keywords Input -->
                    <div class="input-group-btn">
                        <button class="btn btn-default" type="button" @click='search'><i class="glyphicon glyphicon-search"></i></button>
                        <button class="btn btn-default" :class='{hidden:removeBtn}' type="button" @click='clearResult'><i class="glyphicon glyphicon-remove"></i></button>
                    </div>
                </div>
            </div>
        </div>

        <div class='row'>
            <div class='col-md-4'>
                <a v-for="user in users" class='list-group-item list-group-item-action' :class='{active:user.selected}' @click="select(user)" href='javascript:void(0)'>
                    {{ user.username }} <span class="badge">{{ user.eventDue }}</span>
                </a>  
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


    `,
    data:{
        user:{},
        custid:"",
        custName:"",
        custEmail:"",
        custNum:"",
        custAddress:"",
        eventid:"",
        eventName:"",
        eventNote:"",
        events:[],
        hideStatus:true,
        spinHidden:true,
        msg:"",
        msgError:false,
        msgSuccess:false,
        schKeywords:"",
        removeBtn:true,
        users:[]
    },
    methods:{
        keyUpSearch:function(){
            if (this.schKeywords != ""){
                this.getByUsername();
            }
        },
        search:function(){
            this.getByUsername();
            this.removeBtn = false;
        },
        clearResult:function(){
            this.schKeywords = "";
            this.users = [];
            this.removeBtn = true;
        },
        select:function(user){
            if (user.username != "No Result"){
                this.user = user;
            }
        },
        addEvent:function(){
            mainController.formValid("form#modifyEventForm :input[required]:visible",(v)=>{
                if (v){
                    let event = {id:this.eventid,name:this.eventName,date:$("#su_InputEventDate").val(),note:this.eventNote};
                    this.successMsg('Event Added.')
                    this.events.push(event);
                    this.eventName = "";
                    $("#su_InputEventDate").val("");
                    this.eventNote = "";
                    this.eventid+=1;
                }else{
                    this.errorMsg("Missing Event Infos.")
                }
            })            
        },
        removeEvent:function(){
            if (this.events.length != 0){
                this.successMsg('Event Deleted.');
                this.events.pop();
                this.eventid-=1;
            }else{
                this.errorMsg("No Event Loaded.")
            }
        },
        removeSlc:function(id){
            this.events.splice(id-1,1);
            for (let i = 1;i<= this.events.length;i++){
                let index = i - 1;
                this.events[index].id = i;
            }
            this.successMsg('Event Deleted.');
            this.eventid = this.events.length + 1;
        },
        save:function(){
            let user = {"A_Username":this.custid,"A_Email":this.custEmail,"A_Type":"C","A_Name":this.custName,"A_Phone":this.custNum,"A_Address":this.custAddress,"A_Events":this.events};
            mainController.formValid("form#modifyCustForm :input[required]:visible",(v) =>{
                this.successMsg("Modification Processing");
                this.spinHidden = false;
                if (v){
                    $.ajax({
                        url: '/user/' + this.custid,
                        type:'PUT',
                        contentType: "application/json",
                        data: JSON.stringify(user),
                        success: (result)=>{
                            if (schField.users.length != 0){
                                schField.getByUsername();
                            }
                            if (result.status == "ok"){
                                this.eventName = "";
                                this.eventNote = "";
                                this.spinHidden = true;
                                this.successMsg(result.content);
                            }else{
                                this.errorMsg(result.content);
                            } 
                        }
                    });
                }else{
                    this.errorMsg("Missing Customer Infos.")
                    this.spinHidden = true;
                }
            });
        },
        reset:function(){
            this.user={};
            this.user = schField.users[schField.prevSelected];
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
                                        "password":result.A_Password,
                                        'name':result.A_Name,
                                        "email":result.A_Email,
                                        "untype":result.A_Type,
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
        }
    },
    watch:{
        user:function(){
            this.eventid = this.user.events.length + 1;
            this.custid = this.user.username;
            this.custName = this.user.name;
            this.custEmail = this.user.email;
            this.custNum = this.user.phone;
            this.custAddress = this.user.address;
            this.events = this.user.events.slice();
        },
        schKeywords:function(){
            if (this.schKeywords == ""){
                this.users = [];
            }else{
                this.removeBtn = false;
            }
        }
    }
});


let summaryField = new Vue({
    el:"#summaryField",
    template:`
    <div class="panel-body" :class='{hidden:hideStatus}'>

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
            <div class="col-md-10">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th><a href='javascript:void(0)' @click='sortBy("username")'>Customer <span class="caret"></span></a></th>
                        <th><a href='javascript:void(0)' @click='sortBy("name")'>Name <span class="caret"></span></a></th>
                        <th><a href='javascript:void(0)' @click='sortBy("date")'>Date <span class="caret"></span></a></th>
                        <th class='text-center'>Note</th>
                        <th></th>
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

                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
    `,
    data:{
        eventUser:"",
        eventName:"",
        eventNote:"",
        events:[],
        schType:"all",
        schUserName:"",
        typeHidden:true,
        hideStatus:true,
        spinHidden:true,
        msg:"",
        msgError:false,
        msgSuccess:false,
        sortTable:{
            date:false,
            username:false,
            name:false
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
    }
});