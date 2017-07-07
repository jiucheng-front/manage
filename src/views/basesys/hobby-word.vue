<template>
    <div id="content" class="app-content" role="main">
        <div class="app-content-body">
            <div class="bg-light lter b-b wrapper-md">
                <h1 class="m-n font-thin h3">用户兴趣</h1>
            </div>

            <!--中间内容开始-->
            <div class="wrapper-md" ng-controller="FormDemoCtrl">
                <!--form开始-->
                <div class="panel panel-default">
                    <div class="panel-heading font-bold">
                        Search form
                    </div>
                    <div class="panel-body">
                        <form class="form-inline" id="on-html-form" role="form" action="/basesys/hobby-word" method="post">
                            <div class="form-group">
                                <el-input placeholder="兴趣" name="hobby_name" v-model="search.hobby_name"></el-input>
                            </div>
                            <div class="form-group">
                                <select class="el-input__inner" v-model="search.status"  name="status"  placeholder="状态" style="width:150px">
                                    <option value="">全部状态</option>
                                    <option value="1">启用</option>
                                    <option value="2">禁用</option>
                                </select>
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
                            <el-table-column prop="hobby_name"      label="兴趣"></el-table-column>
                            <el-table-column prop="cat_ids"         label="对应品类"></el-table-column>
                            <el-table-column prop="status_name"     label="状态"></el-table-column>
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
                        <button type="submit" class="btn btn-sm btn-info ypp-btn-add" request-url="/basesys/add-hobby-word">添加
                        </button>
                        <button type="submit" class="btn btn-sm btn-info ypp-btn-edit" request-url="/basesys/edit-hobby-word">编辑
                        </button>
                        <button type="submit" class="btn btn-sm btn-info ypp-btn-del" request-url="/basesys/del-hobby-word">刪除
                        </button>
                    </el-dialog>
                </div>
                <!--功能按鈕彈出结束-->
            </div>
            <!--中间内容结束-->

            <!--查看内容开始-->
            <el-dialog title="添加" v-model="dialogVisible1Add" size="tiny" custom-class="sendConentBoder">
                <el-form ref="form" :model="form" label-width="80px" id="sendContent">
                    <el-form-item label="兴趣名称">
                        <el-input v-model="hobby.hobby_name" name="hobby_name"></el-input>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-row>
                            <el-col :span="8" >
                                <el-input v-model="hobby.order_no" name="order_no"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="状态">
                        <select class="el-input__inner" name="status" v-model="hobby.status" style="width:150px">
                            <option value="1">启用</option>
                            <option value="2">禁用</option>
                        </select>
                    </el-form-item>

                    <el-form-item label="对应品类">
                        <el-checkbox-group v-model="hobby.cat_ids">
                            <el-row>
                                <el-col :span="8" v-for="(value, key) in cat_list" :key="value" >
                                    <div class="grid-content bg-purple-dark"><el-checkbox :label="value" name="catList[]" ></el-checkbox></div>
                                </el-col>

                            </el-row>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <input type="hidden" name="id" v-model="hobby.id"  id="post_id" />
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
                URL: window.getConfig.URL,
                action : window.getConfig.URL+'/basesys/hobby-word',
                tableData: [],
                cat_list : {},
                curpage: {size:0, total:0},
                dialogVisible1Add: false,
                dialogVisible: false,
                startDate: '2017-04-06 20:39:20',
                endDate:   '2017-04-06 20:39:20',
                search:{
                    hobby_name: "",
                    status:"",
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                hobby:{
                    id:'',
                    hobby_name:'',
                    cat_ids:[],
                    status:'',
                    order_no:'',
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
            // 弹框 发送数据
            sendFormRequest: function(){
                var data = $("#sendContent").serialize()+'&id='+$("#post_id").val();
                $.ajax({
                    type: 'POST',
                    url: vue_this.URL+handleRequestUrl,
                    data: data,
                    success: function(data) {
                        if(data.status == false) {
                            self.$message.error(data.msg);
                        }else{
                            vue_this.$message({
                                message: '操作成功',
                                type: 'success'
                            });

                            $.ajax({
                                type: 'POST',
                                url:  requestSearchAndCurpageUrl,
                                data: requestSearchAndCurpageData,
                                dataType: "json",
                                success: function(data) {
                                    if(data.status == false) {
                                        self.$message.error(data.msg);
                                    }else{
                                        self.tableData = data.data;
                                        self.curpage = {
                                            size:  data.curpage.size,           // 每页条数
                                            total: data.curpage.total           // 数据总条数
                                            //sizes: [100, 200],                // 设置每页显示条数
                                        }
                                    }
                                }
                            });
                            //重新加载数据
                            vue_this.dialogVisible     = false
                            vue_this.dialogVisible1Add = false
                        }
                    }
                });
            },
            // 每页 N 条
            handleSizeChange(val) {

            },
            // 当前页
            handleCurrentChange(val) {
                var self = this;
                var page = val;
                vue_this.search.page = page;
                var data = vue_this.search;
                requestSearchAndCurpageUrl  = vue_this.action;
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
                            self.curpage = {
                                size:  data.curpage.size,           // 每页条数
                                total: data.curpage.total           // 数据总条数
                                //sizes: [100, 200],                // 设置每页显示条数
                            }
                        }
                    }
                });
            },
            handleDataList(data){

                return data;
            }
        },
        mounted () {
            vue_this = self = this;

            this.$nextTick(function () {

                requestSearchAndCurpageUrl  = vue_this.action;
                requestSearchAndCurpageData = vue_this.search;

                this.$ajax(vue_this, requestSearchAndCurpageUrl, requestSearchAndCurpageData, function (data, vue) {

                    if(vue_this.status == false){
                        vue_this.$message.error(data.msg)
                    }else{
                        vue_this.tableData  = vue_this.handleDataList(data.data);
                        vue_this.cat_list   = data.cat_list;
                        vue_this.curpage = {
                            size:  data.curpage.size,           // 每页条数
                            total: data.curpage.total           // 数据总条数
                        }
                    }
                });

            });

            $(document).ready(function () {

                // form表单手动查询
                $('#on-html-form-submit').click(function(){
                    requestSearchAndCurpageUrl  = vue_this.action;
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
                                self.curpage = {
                                    size:  data.curpage.size,           // 每页条数
                                    total: data.curpage.total           // 数据总条数
                                    //sizes: [100, 200],                // 设置每页显示条数
                                }
                            }
                        }
                    });
                });

                // 数据增、删、改、查
                $(document).on('click', '.ypp-btn-add', function () {
                    handleRequestUrl = $(this).attr('request-url');
                    $(".sendConentBoder .el-dialog__title").html('添加');
                    vue_this.dialogVisible1Add = true;
                })
                .on('click', '.ypp-btn-look', function () {
                    handleRequestUrl = $(this).attr('request-url')
                    $(".sendConentBoder .el-dialog__title").html('查看');
                    vue_this.dialogVisible1Add = true;
                })
                .on('click', '.ypp-btn-edit', function () {
                    handleRequestUrl = $(this).attr('request-url');
                    $(".sendConentBoder .el-dialog__title").html('编辑');
                    vue_this.hobby.id          = selectRow.id;
                    vue_this.hobby.hobby_name  = selectRow.hobby_name;
                    var cat_type  = typeof selectRow.cat_ids;
                    if(selectRow.cat_ids != '' && cat_type == 'string'){
                        vue_this.hobby.cat_ids     = selectRow.cat_ids.split(",");
                    }
                    vue_this.hobby.status      = selectRow.status;
                    vue_this.hobby.order_no    = selectRow.order_no;
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
                            url: vue_this.URL+requestDelUrl,
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
                            url: vue_this.URL+requestDelUrl,
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
                                vue_this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                                vue_this.tableData = data.data;
                                self.curpage = {
                                    size:  data.curpage.size,           // 每页条数
                                    total: data.curpage.total           // 数据总条数
                                }
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
