<template>
    <div>
        <transition name="fade">
            <span :class='{ "alert-danger":msgError,"alert-success":msgSuccess }' role="alert" v-if='msgHidden'>
                <i class='fa fa-circle-o-notch fa-spin' v-if='spinHidden'></i>
            {{msg}}
            </span>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg:"",
                msgSuccess:false,
                msgError:false,
                spinHidden:false,
                msgHidden:true,
            }
        },
        methods:{
            ajaxCall:function(promise,onSuccess,onError=function(){},options={loading:"Loading Content"}){

                this.spinHidden = true;
                this.successMsg(options.loading);
                promise.then((result) => {
                    this.spinHidden = false;
                    this.successMsg(result.content);
                    onSuccess(result);
                }, (error) => {
                    this.spinHidden = false;
                    this.errorMsg(error.content);
                    onError(error);
                });
            },
            successMsg:function(txt){
                this.msgHidden = true;
                this.msg = txt;
                this.msgSuccess = true;
                setTimeout(()=>{
                    this.msg = "";
                    this.msgSuccess = false;
                    this.msgHidden = false;
                },3000);
            },
            errorMsg:function(txt){
                this.msgHidden = true;
                this.msg = txt;
                this.msgError = true;
                setTimeout(()=>{
                    this.msg = "";
                    this.msgError = false;
                    this.msgHidden = false;
                },3000);            
            }
        }
    }
</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>