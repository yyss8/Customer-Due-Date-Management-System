module.exports = {
    loginSuccess:function() {
        $('#loginField').addClass('loginSuccess');
        setTimeout(() =>{
            $('#loginField').hide();
            $('#mainField').show();
            createUserField.hideStatus = false;
            this.curPage = "createUserField";
            schField.loginStatus = "block";
            mainHeaderField.loginStatus = "block";
        },500)
    },
    switchPg:function(nxtPg) {
        eval(this.curPage).hideStatus = true;
        this.curPage = nxtPg;
        eval(nxtPg).hideStatus = false;
    },
    formValid:function(form,callback){
        let inputs = $(form);
        let noError = true;
        inputs.each(function(){
            if ($(this).val() == ""){
                $(this).focus()
                noError = false;
                return false
            }
        });
        callback(noError);
    },
    success:(txt,status) => {
        status = false;
        setTimeout(() => {
            status= true;
        },3000)
    }
};

