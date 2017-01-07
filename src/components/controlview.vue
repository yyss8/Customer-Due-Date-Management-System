<template>
    <div>
        <nav class='navbar'>
            <div class='col-md-offset-2 col-md-8'>
                <a class="navbar-text" style='color:white' href='/'>Control Panel</a>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a class="btn dropdown-toggle" data-toggle="dropdown" href='#' style='font-size:120%'><i class="fa fa-user fa-fw" aria-hidden="true"></i> <span class="caret"></span></a>
                        <ul class="dropdown-menu" style='float:left'>
                            <li><a ><i class="fa fa-user fa-fw" aria-hidden="true"></i>&nbsp; User Profile</a></li>
                            <li><a ><i class="fa fa-gear fa-fw" aria-hidden="true"></i>&nbsp; Setting</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href='/user/logout'><i class="fa  fa-sign-out fa-fw" aria-hidden="true"></i>&nbsp; Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>

        </nav>

        <div class='row'>
            <div class='col-md-offset-2 col-md-8'>

                <!-- Sidebar Starts -->

                <div class="col-md-4">
                    <div class='sidebar-nav navbar-collapse'>
                        <div class="list-group">
                            <div class='list-group-item'>
                                <search ref="search"><br></search>
                            </div>

                            <!-- Sidebar Switch Pages Starts -->
                            <button class="list-group-item" @click='switchPg("/cp/user")'>
                                <i class="fa fa-user"></i>&nbsp; Manage Customer Infos<span class="caret-right pull-right"></span>
                            </button>
                            <button class="list-group-item" @click='switchPg("/cp/createuser")'>
                                <i class="fa fa-users"></i>&nbsp; Create Customer Info<span class="caret-right pull-right"></span>
                            </button>
                            <button class="list-group-item" @click='switchPg("/cp/event")'>
                                <i class="fa  fa-database"></i>&nbsp; Data Summary & Report<span class="caret-right pull-right"></span>
                            </button>
                            <button class="list-group-item">
                                <i class="fa  fa-gear"></i>&nbsp; Control Panel Setting<span class="caret-right pull-right"></span>
                            </button>
                        </div> 
                    </div>       
                </div>

                <!-- Sidebar Ends -->

                <div class='col-md-8'>
                    <div class="panel panel-default">
                        <router-view :save='refreshSearch'></router-view>
                    </div>
                </div>

                <!-- Page Content Ends -->

            </div>
        </div>

    </div>
</template>

<script>
    import search from "./minorcomponents/searchbar.vue";
    import store from "../store";
    export default {
        data() {
            return {

            }
        },
        store,
        methods:{
            switchPg:function(pg){
                this.schKeywords = "";
                this.users = [];
                this.$router.push(pg);
            }
        },
        components:{
            search
        }
    }
</script>

<style>
    nav {
        background-color:#337ab7;
        width:100%;
        border-color:#2e6da4;
        border-radius: 4px;
        padding-right:15px;
        padding-left:20px;
    }

    nav a{
        color:white;
    }

    .caret-right {
        position: relative;
        top:6px;
        border-bottom: 4px solid transparent;
        border-top: 4px solid transparent;
        border-left: 4px solid;
        display: inline-block;
        height: 0;
        width: 0;
    }

    .container-left-padding-0{
        padding-left:0;
    }

    input[type='number'] {
        -moz-appearance:textfield;
    }

    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0; 
    }
</style>