<template>

        <div class="app app-header-fixed">
            <div class="container w-xxl w-auto-xs" ng-controller="SigninFormController" ng-init="app.settings.container = false;">
                <h3 class="navbar-brand block m-t">浪Live</h3>
                <div class="m-b-lg">
                    <form name="form" class="form-validation">
                        <div class="text-danger wrapper text-center" ng-show="authError">

                        </div>
                        <div class="list-group list-group-sm">
                            <div class="list-group-item">
                                <input type="text" placeholder="Email" class="form-control no-border" v-model="users.id" required>
                            </div>
                            <div class="list-group-item">
                                <input type="password" placeholder="Password" class="form-control no-border" v-model="users.password" required>
                            </div>
                        </div>
                        <button @click="login()" type="button" class="btn btn-lg btn-primary btn-block">Log in</button>
                    </form>
                </div>
                <div class="text-center">
                    <p>
                        <small class="text-muted">&copy; 2017-浪Live</small>
                    </p>
                </div>
            </div>
        </div>

</template>

<script>
    export default {
        name: 'login',
        data () {
            return {
                users:{
                    id:"",
                    password:""
                }
            }
        },
        methods:{
            login(){
                let _this=this;
                let info=_this.users;
                var url="/api/html/company/admin/login";
                if(info.id&&info.password){
                    var pwd=$.crypto(info.password);
                    console.log(pwd);
                    // $.post(domain+'v2/activity/dracula_data', {"uid":token, "upw":pwd},
                    $.post(url, {"uid":info.id, "upw":pwd},
                        function(data) {
                            if(data.ret_code=="0"){
                                alert("登录成功");
                                _this.$router.push({
                                    path:"/home"
                                });
                            }
                        },
                        "json"
                    );
                }else{
                    alert("名字和密码都不能为空！");
                }
                



                // if(info.id=="admin@qq.com"&&info.password=="admin"){
                //     _this.$router.push({
                //         path:"/home"
                //     });
                // }else{
                //     alert("請輸入用戶名和密碼");
                // }
            }
        }
    }
</script>

<style>
</style>
