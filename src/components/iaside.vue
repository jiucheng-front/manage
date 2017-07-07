<template>
    <aside id="aside" class="app-aside hidden-xs bg-dark">
        <div class="aside-wrap">
            <div class="navi-wrap">
                <!-- user -->
                <div class="clearfix hidden-xs text-center hide" id="aside-user">
                    <div class="dropdown wrapper">
                        <a href="app.page.profile">
                        <span class="thumb-lg w-auto-folded avatar m-t-sm">
                            <img src="../angulr/img/a0.jpg" class="img-full" alt="...">
                        </span>
                        </a>
                        <a href="#" data-toggle="dropdown" class="dropdown-toggle hidden-folded">
                        <span class="clear">
                            <span class="block m-t-sm">
                                <strong class="font-bold text-lt">John.Smith</strong>
                                <b class="caret"></b>
                            </span>
                            <span class="text-muted text-xs block">Art Director</span>
                        </span>
                        </a>
                        <!-- dropdown -->
                        <ul class="dropdown-menu animated fadeInRight w hidden-folded">
                            <li class="wrapper b-b m-b-sm bg-info m-t-n-xs">
                                <span class="arrow top hidden-folded arrow-info"></span>
                                <div>
                                    <p>300mb of 500mb used</p>
                                </div>
                                <div class="progress progress-xs m-b-none dker">
                                    <div class="progress-bar bg-white" data-toggle="tooltip" data-original-title="50%"
                                         style="width: 50%"></div>
                                </div>
                            </li>
                            <li>
                                <a href>Settings</a>
                            </li>
                            <li>
                                <a href="page_profile.html">Profile</a>
                            </li>
                            <li>
                                <a href>
                                    <span class="badge bg-danger pull-right">3</span>
                                    Notifications
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="page_signin.html">Logout</a>
                            </li>
                        </ul>
                        <!-- / dropdown -->
                    </div>
                    <div class="line dk hidden-folded"></div>
                </div>
                <!-- / user -->
                <!-- nav -->
                <nav ui-nav class="navi clearfix">
                    <ul class="nav">
                        <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                            <span>Components</span>
                        </li>
                        <li>
                            <a href class="auto">
                            <span class="pull-right text-muted">
                                <i class="fa fa-fw fa-angle-right text"></i>
                                <i class="fa fa-fw fa-angle-down text-active"></i>
                            </span>
                                <i class="icon-users"></i>
                                <span>主播數據</span>
                            </a>
                            <ul class="nav nav-sub dk">
                                <li>
                                    <a href="#/adminUserList" >
                                        <i class="icon-list" style="margin: -10px 2px;"></i>
                                        <span >用户管理</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#/adminRoleList" >
                                        <i class="icon-list" style="margin: -10px 2px;"></i>
                                        <span >角色管理</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#/adminPowerList" >
                                        <i class="icon-list" style="margin: -10px 2px;"></i>
                                        <span >权限管理</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href class="auto">
                            <span class="pull-right text-muted">
                                <i class="fa fa-fw fa-angle-right text"></i>
                                <i class="fa fa-fw fa-angle-down text-active"></i>
                            </span>
                                <i class="icon-users"></i>
                                <span>主播管理</span>
                            </a>
                            <ul class="nav nav-sub dk">
                                <li>
                                    <a href="#/userList" >
                                        <i class="icon-list" style="margin: -10px 2px;"></i>
                                        <span >用户列表</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#/user/user-report">
                                        <i class="icon-list" style="margin: -10px 2px;"></i>
                                        <span>用户举报</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#/user/user-freeze-list">
                                        <i class="icon-list" style="margin: -10px 2px;"></i>
                                        <span>冻结列表</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href class="auto">
                            <span class="pull-right text-muted">
                                <i class="fa fa-fw fa-angle-right text"></i>
                                <i class="fa fa-fw fa-angle-down text-active"></i>
                            </span>
                                <i class="glyphicon glyphicon-briefcase icon"></i>
                                <span>公司管理(需要admin權限)</span>
                            </a>
                            <ul class="nav nav-sub dk">
                                <li>
                                    <a href="#/basesys/biz-cert">
                                        <i class="icon-tag" style="margin: -10px 2px;"></i>
                                        <span>资质列表</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#/basesys/biz-cat">
                                        <i class="icon-credit-card" style="margin: -10px 2px;"></i>
                                        <span>品类列表</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#/basesys/hobby-word">
                                        <i class="icon-like" style="margin: -10px 2px;"></i>
                                        <span>用户兴趣</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#/basesys/god-city-list">
                                        <i class="icon-pointer" style="margin: -10px 2px;"></i>
                                        <span>大神城市</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#/basesys/city-bizcat-list">
                                        <i class="icon-direction" style="margin: -10px 2px;"></i>
                                        <span>城市品类</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="line dk"></li>
                        <li>
                            <a href class="auto">
                            <span class="pull-right text-muted">
                                <i class="fa fa-fw fa-angle-right text"></i>
                                <i class="fa fa-fw fa-angle-down text-active"></i>
                            </span>
                                <i class="glyphicon glyphicon-briefcase icon"></i>
                                <span>大神管理</span>
                            </a>
                            <ul class="nav nav-sub dk">
                                <li>
                                    <a href="#/godList">
                                        <span>大神列表</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="ui_grid.html">
                                        <span>大神资质列表</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <!-- nav -->

            </div>
        </div>
    </aside>
</template>

<script>
    export default {
        name: 'iaside',
        data () {
            return {}
        }
    }
</script>

<style>
    .nav-childs{

    }
</style>
