<template>
    <div id="content" class="app-content" role="main">
        <div class="app-content-body">
            <div class="bg-light lter b-b wrapper-md">
                <h1 class="m-n font-thin h3">Form Elements</h1>
            </div>

            <!--中间内容开始-->
            <div class="wrapper-md" ng-controller="FormDemoCtrl">
                <!--form开始-->
                <div class="panel panel-default">
                    <div class="panel-heading font-bold">
                        Search form
                    </div>
                    <div class="panel-body">
                        <form class="form-inline" id="on-html-form" role="form" action="http://192.168.25.23:8081/user/list" method="post">
                            <div class="form-group">
                                <el-input placeholder="用户名" name="username"></el-input>
                            </div>
                            <div class="form-group">
                                <el-input placeholder="用户昵称" name="nickname"></el-input>
                            </div>
                            <div class="form-group">
                                <el-date-picker name="start-time" v-model="startDate" type="datetime" placeholder="开始日期时间"></el-date-picker>
                            </div>
                            <div class="form-group">
                                <el-date-picker name="end-time" v-model="endDate" type="datetime" placeholder="结束日期时间"></el-date-picker>
                            </div>
                            <button type="button" class="btn btn-default" id="on-html-form-submit" >Search</button>
                        </form>
                    </div>
                </div>
                <!--form结束-->

                <!--table列表开始-->
                <div class="panel panel-default">
                    <div class="panel-heading">DataTables</div>
                    <div class="table-responsive">
                        <el-table :data="tableData" @row-dblclick="handleEdit" stripe style="width: 100%">
                            <el-table-column prop="ypp_no"      label="ID"></el-table-column>
                            <el-table-column prop="nickname"    label="昵称"></el-table-column>
                            <el-table-column prop="name"        label="姓名"></el-table-column>
                            <el-table-column prop="mobile"      label="手机号"></el-table-column>
                            <el-table-column prop="gender"      label="性别"></el-table-column>
                            <el-table-column prop="birthday"    label="年龄"></el-table-column>
                            <el-table-column prop="mobile_city" label="手机号城市"></el-table-column>
                            <el-table-column prop="status"      label="用户状态"></el-table-column>
                            <el-table-column prop="is_auth"     label="认证状态"></el-table-column>
                            <el-table-column prop="id_god"      label="是否大神"></el-table-column>
                            <el-table-column prop="last_login_time" label="最后登录时间"></el-table-column>
                            <el-table-column prop="update_time" label="最后消费时间"></el-table-column>
                        </el-table>
                    </div>
                    <!--分页开始-->
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                       :current-page="curpage.jumpPage"
                                       :page-sizes="curpage.sizes"
                                       :page-size="curpage.size"
                                       :total="curpage.total"
                                       layout="total, prev, pager, next">
                        </el-pagination>
                    </div>
                    <!--分页结束-->
                </div>
                <!--table列表结束-->
                <!--功能按鈕彈出開始-->
                <div id="app-alert-button">
                    <el-dialog title="数据操作" v-model="dialogVisible" size="tiny">
                        <button type="submit" class="btn btn-sm btn-info ypp-btn-add" request-url="/web/add">添加
                        </button>
                        <button type="submit" class="btn btn-sm btn-info ypp-btn-look"  request-url="/web/look">查看
                        </button>
                        <button type="submit" class="btn btn-sm btn-info ypp-btn-edit" request-url="/web/edit">编辑
                        </button>
                        <button type="submit" class="btn btn-sm btn-info ypp-btn-update" request-url="/web/update">更新
                        </button>
                        <button type="submit" class="btn btn-sm btn-info ypp-btn-del" request-url="/web/del">刪除
                        </button>
                    </el-dialog>
                </div>
                <!--功能按鈕彈出结束-->
            </div>
            <!--中间内容结束-->

            <!--查看内容开始-->
            <el-dialog title="添加" v-model="dialogVisible1Add" size="tiny" custom-class="sendConentBoder">
                <el-form ref="form" :model="form" label-width="80px" id="sendContent">
                    <el-form-item label="活动名称">
                        <el-input v-model="form.name" name="set-name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域">
                        <el-select v-model="form.region" placeholder="请选择活动区域" name="region">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" name="start-time"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" name="end-time" ></el-time-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="即时配送">
                        <el-switch on-text="" off-text v-model="form.delivery" name="delivery"></el-switch>
                    </el-form-item>
                    <el-form-item label="活动性质">
                        <el-checkbox-group v-model="form.type" >
                            <el-row>
                                <el-col :span="12"><div class="grid-content bg-purple-dark"><el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox></div></el-col>
                                <el-col :span="12"><div class="grid-content bg-purple-dark"><el-checkbox label="地推活动" name="type"></el-checkbox></div></el-col>
                                <el-col :span="12"><div class="grid-content bg-purple-dark"><el-checkbox label="线下主题活动" name="type"></el-checkbox></div></el-col>
                                <el-col :span="12"><div class="grid-content bg-purple-dark"><el-checkbox label="单纯品牌曝光" name="type"></el-checkbox></div></el-col>
                            </el-row>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="特殊资源">
                        <el-radio-group v-model="form.resource" name="resource">
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="活动形式">
                        <el-input type="textarea" v-model="form.desc" name="desc"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible1Add = false">取 消</el-button>
                    <el-button type="primary" @click="sendFormRequest">确 定</el-button>
                </span>
            </el-dialog>
            <!--查看内容结束-->

        </div>
    </div>
</template>

<script>
    var vue_this  = '';
    var selectRow = '';
    var handleRequestUrl = ''; // 增删改查请求url
    var requestSearchAndCurpageUrl  = ''; // 搜索、分页请求url
    var requestSearchAndCurpageData = ''; // 搜索、分页请求数据

    export default {
        data () {
            return {
                tableData: [],
                curpage: {size:0, total:0},
                dialogVisible1Add: false,
                dialogVisible: false,
                startDate: '2017-04-06 20:39:20',
                endDate:   '2017-04-06 20:39:20',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            //列表
            handleEdit: function (row, event, column) {
                this.dialogVisible = true
                selectRow = row
                vue_this = this;
            },
            sendFormRequest: function(){

                var data = $("#sendContent").serialize();
                $.ajax({
                    type: 'POST',
                    url: handleRequestUrl,
                    data: data,
                    success: function(data) {
                        if(data.status == false) {
                            self.$message.error(data.msg);
                        }else{
                            vue_this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                            vue_this.dialogVisible     = false
                            vue_this.dialogVisible1Add = false
                        }
                    }
                });

            },
            // 每页 N 条
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            // 当前页
            handleCurrentChange(val) {
                var self = this;
                var page = val;
                var data = $("#on-html-form").serialize()+'&page='+page;
                requestSearchAndCurpageUrl  = $("#on-html-form").attr('action');
                requestSearchAndCurpageData = data;
                $.ajax({
                    type: 'POST',
                    url:  requestSearchAndCurpageUrl,
                    data: data,
                    dataType: "json",
                    success: function(data) {
                        if(data.status == false) {
                            self.$message.error(data.msg);
                        }else{
                            self.tableData = data.data;
                        }
                    }
                });
            },
        },
        mounted () {
            var self = this;
            this.$nextTick(function () {

                var getDataUrl = $("#on-html-form").attr('action');
                requestSearchAndCurpageUrl  = getDataUrl;
                requestSearchAndCurpageData = $('#on-html-form').serialize();
                // 首次进入根据form表单加载数据
                $.ajax({
                    type:"POST",
                    url:  getDataUrl,
                    data: requestSearchAndCurpageData,
                    //返回数据的格式
                    dataType: "json",
                    //在请求之前调用的函数
                    beforeSend:function(){
                    },
                    //成功返回之后调用的函数
                    success:function(data){
                        if(data.status == false){
                            self.$message.error(data.msg)
                        }else{
                            self.tableData = data.data;
                            self.curpage = {
                                size:  data.curpage.size,           // 每页条数
                                total: data.curpage.total           // 数据总条数
                                //sizes: [100, 200],                // 设置每页显示条数
                            }
                        }

                    },
                    //调用执行后调用的函数
                    complete: function(XMLHttpRequest, textStatus){
                    },
                    //调用出错执行的函数
                    error: function(){
                    }
                });

            });

            $(document).ready(function () {

                // form表单手动查询
                $('#on-html-form-submit').click(function(){
                    requestSearchAndCurpageUrl  = $("#on-html-form").attr('action');
                    requestSearchAndCurpageData = $("#on-html-form").serialize();
                    $.ajax({
                        type: 'POST',
                        url:  requestSearchAndCurpageUrl,
                        data: requestSearchAndCurpageData,
                        dataType: "json",
                        success: function(data) {
                            if(data.status == false){
                                self.$message.error(data.msg);
                            }else{
                                self.tableData = data.data
                            }
                        }
                    });
                });

                // 数据增、删、改、查
                $(document).on('click', '.ypp-btn-add', function () {
                    handleRequestUrl = $(this).attr('request-url');
                    $(".sendConentBoder .el-dialog__title").html('添加');
                    vue_this.dialogVisible1Add = true
                })
                .on('click', '.ypp-btn-look', function () {
                    handleRequestUrl = $(this).attr('request-url')
                    $(".sendConentBoder .el-dialog__title").html('查看');
                    vue_this.dialogVisible1Add = true
                })
                .on('click', '.ypp-btn-edit', function () {
                    handleRequestUrl = $(this).attr('request-url');
                    $(".sendConentBoder .el-dialog__title").html('编辑');
                    vue_this.dialogVisible1Add = true;
                })
                .on('click', '.ypp-btn-update', function () {
                    // 统一更新操作
                    var requestDelUrl = $(this).attr('request-url');
                    vue_this.$confirm('确定要执行此操作吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        $.ajax({
                            type: 'POST',
                            url: requestDelUrl,
                            data: selectRow,
                            dataType: "json",
                            success: function(data) {
                                if(data.status == false) {
                                    self.$message.error(data.msg);
                                }else{
                                    getTableData(requestSearchAndCurpageUrl, requestSearchAndCurpageData);
                                }
                            }
                        });
                        vue_this.dialogVisible     = false
                        vue_this.dialogVisible1Add = false
                    });
                })
                .on('click', '.ypp-btn-del', function () {
                    var requestDelUrl = $(this).attr('request-url');
                    vue_this.$confirm('确定要执行此操作吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        $.ajax({
                            type: 'POST',
                            url: requestDelUrl,
                            data: selectRow,
                            dataType: "json",
                            success: function(data) {
                                if(data.status == false) {
                                    self.$message.error(data.msg);
                                }else{
                                    getTableData(requestSearchAndCurpageUrl, requestSearchAndCurpageData);
                                }
                            }
                        });
                        vue_this.dialogVisible     = false
                        vue_this.dialogVisible1Add = false
                    });
                });

                //获取列表数据统一方法
                function getTableData($requestUrl, $requestData){
                    $.ajax({
                        type: 'POST',
                        url: $requestUrl,
                        data: $requestData,
                        dataType: "json",
                        success: function(data) {
                            if(data.status == false) {
                                self.$message.error(data.msg);
                            }else{
                                vue_this.tableData = data;
                            }
                        }
                    });
                }


            })
        }
    }
</script>

<style>
    .el-checkbox+.el-checkbox{
        margin-left:0px;
    }
    .el-checkbox-group .el-checkbox{
        margin-right: 15px;
        margin-left:0px;
    }
</style>
