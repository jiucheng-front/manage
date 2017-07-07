<template>

        <div class="app app-header-fixed ">
            <div class="container w-xxl w-auto-xs" ng-controller="SigninFormController" ng-init="app.settings.container = false;">
                <h3 class="navbar-brand block m-t">浪Live</h3>
                <div class="m-b-lg">
                    <form name="form" class="form-validation">
                        <div class="text-danger wrapper text-center" ng-show="authError">

                        </div>
                        <div class="list-group list-group-sm">
                            <div class="list-group-item">
                                <input type="email" placeholder="Email" class="form-control no-border" v-model="users.email" required>
                            </div>
                            <div class="list-group-item">
                                <input type="password" placeholder="Password" class="form-control no-border" v-model="users.password" required>
                            </div>
                        </div>
                        <button @click="login()" type="submit" class="btn btn-lg btn-primary btn-block">Log in</button>
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
                    email:"",
                    password:""
                }
            }
        },
        methods:{
            login(){
                let _this=this;
                let info=_this.users;
                if(info.email=="admin@qq.com"&&info.password=="admin"){
                    _this.$router.push({
                        path:"/home"
                    });
                }else{
                    alert("請輸入用戶名和密碼");
                }
            }
        }
    }
</script>

<style>
</style>
