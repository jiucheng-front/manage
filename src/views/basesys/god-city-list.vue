<template>
    <div id="content" class="app-content" role="main">
        <div class="app-content-body">
            <div class="bg-light lter b-b wrapper-md">
                <h1 class="m-n font-thin h3">大神城市</h1>
            </div>

            <!--中间内容开始-->
            <div class="wrapper-md" ng-controller="FormDemoCtrl">
                <!--form开始-->
                <div class="panel panel-default">
                    <div class="panel-heading font-bold">
                        Search form
                    </div>
                    <div class="panel-body">
                        <form class="form-inline" id="on-html-form" role="form" action="/basesys/god-city-list" method="post">
                            <div class="form-group">
                                <el-input placeholder="城市名称" v-model="search.name" name="name" ></el-input>
                            </div>
                            <div class="form-group">
                                <select class="el-input__inner" v-model="search.status"  name="status"  placeholder="状态" style="width:150px">
                                    <option value="">全部状态</option>
                                    <option value="1">启用</option>
                                    <option value="2">禁用</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select class="el-input__inner" v-model="search.nav_group_no" name="nav_group_no" placeholder="导航分组" style="width:150px">
                                    <option value="">全部城市</option>
                                    <option value="1">全国</option>
                                    <option value="2">热门</option>
                                    <option value="3">其他</option>
                                    <option value="4">试点</option>
                                </select>
                            </div>

                            <button type="button" class="btn btn-default" id="on-html-form-submit" @click="sendSearchForm" >Search</button>
                        </form>
                    </div>
                </div>
                <!--form结束-->

                <!--table列表开始-->
                <div class="panel panel-default">
                    <div class="panel-heading">DataTables</div>
                    <div class="table-responsive">
                        <el-table :data="tableData" @row-dblclick="handleEdit" stripe style="width: 100%">
                            <el-table-column prop="name"            label="城市名称"></el-table-column>
                            <el-table-column prop="status_desc"     label="状态"></el-table-column>
                            <el-table-column prop="nav_group_no_desc" label="导航分组"></el-table-column>
                            <el-table-column prop="god_count"       label="大神数量"></el-table-column>
                            <el-table-column prop="hot_desc"        label="是否热门"></el-table-column>
                            <el-table-column prop="default_lat"     label="默认经度"></el-table-column>
                            <el-table-column prop="default_lng"     label="默认纬度"></el-table-column>
                            <el-table-column prop="orderno"         label="排序"></el-table-column>
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
                        <button type="submit" @click="addContent($event)" class="btn btn-sm btn-info ypp-btn-add" request-url="/basesys/add-god-city">添加
                        </button>
                        <!--<button type="submit" @click="lookContent" class="btn btn-sm btn-info ypp-btn-look"  request-url="/web/look">查看
                        </button>-->
                        <button type="submit" @click="editContent($event)" class="btn btn-sm btn-info ypp-btn-edit" request-url="/basesys/edit-god-city">编辑
                        </button>
                        <!--<button type="submit" @click="updateContent" class="btn btn-sm btn-info ypp-btn-update" request-url="/web/update">更新-->
                        <!--</button>-->
                        <button type="submit" @click="delContent($event)" class="btn btn-sm btn-info ypp-btn-del" request-url="/basesys/del-god-city">刪除
                        </button>
                    </el-dialog>
                </div>
                <!--功能按鈕彈出结束-->
            </div>
            <!--中间内容结束-->

            <!--查看内容开始-->
            <el-dialog title="添加" v-model="dialogVisible1Add" size="tiny" custom-class="sendConentBoder">
                <el-form ref="form" :model="form" label-width="80px" id="sendContent" :inline="true">
                    <el-form-item label="城市名称">
                        <el-input v-model="form.name" name="name"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <select class="el-input__inner" name="status" v-model="form.status" style="width:150px">
                            <option value="1">正常</option>
                            <option value="0">作废</option>
                        </select>
                    </el-form-item>
                    <el-form-item label="是否热门">
                        <select class="el-input__inner" name="hot" v-model="form.hot" style="width:150px">
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </el-form-item>
                    <el-form-item label="导航分组">
                        <select class="el-input__inner" name="nav_group_no" v-model="form.nav_group_no" style="width:150px">
                            <option value="1">全国</option>
                            <option value="2">热门</option>
                            <option value="3">其他</option>
                            <option value="4">试点</option>
                        </select>
                    </el-form-item>
                    <el-form-item label="大神数量">
                        <el-input v-model="form.god_count" name="god_count"></el-input>
                    </el-form-item>
                    <el-form-item label="排序序号">
                        <el-input v-model="form.orderno" name="orderno"></el-input>
                    </el-form-item>
                    <el-form-item label="默认经度">
                        <el-input v-model="form.default_lat" name="default_lat"></el-input>
                    </el-form-item>
                    <el-form-item label="默认纬度">
                        <el-input v-model="form.default_lng" name="default_lng"></el-input>
                    </el-form-item>

                    <el-form-item label="推荐品类">
                        <el-checkbox-group v-model="form.recommend_cert">
                            <el-row>
                                <el-col :span="6" v-for="(value, key) in cat_list" :key="value" >
                                    <div class="grid-content bg-purple-dark"><el-checkbox :label="value" name="recommend_cert[]" ></el-checkbox></div>
                                </el-col>
                            </el-row>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <input type="hidden" name="id" v-model="form.id"  id="post_id" />
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
    var requestSearchAndCurpageUrl  = ''; // 搜索、分页请求url
    var requestSearchAndCurpageData = ''; // 搜索、分页请求数据


    export default {
        data () {
            return {
                URL: window.getConfig.URL,
                action : window.getConfig.URL+'/basesys/god-city-list',
                tableData: [],
                selectRow: {},
                cat_list:  {},
                curpage: {size:0, total:0},
                dialogVisible1Add: false,
                dialogVisible: false,
                handleRequestUrl: '',
                search:{
                    name: "",
                    status:"",
                    nav_group_no:""
                },
                form: {
                    id:'',
                    name:'',
                    status:'',
                    god_count:'',
                    hot:'',
                    default_lat:'',
                    default_lng:'',
                    nav_group_no:'',
                    recommend_cert:[]
                }
            }
        },
        methods: {
            //列表点击按钮
            handleEdit: function (row, event, column) {
                vue_this.dialogVisible = true;
                vue_this.selectRow = row;
            },
            // 弹框 发送数据
            sendFormRequest: function(){
                var data = vue_this.form;
                this.$ajax(vue_this, this.handleRequestUrl, data, function (data, vue_this) {
                    if(data.status == false) {
                        vue_this.$message.error(data.msg);
                    }else{
                        vue_this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        //重新加载数据
                        vue_this.getTableData(requestSearchAndCurpageUrl, requestSearchAndCurpageData);
                        vue_this.dialogVisible     = false;
                        vue_this.dialogVisible1Add = false;
                    }
                })
            },
            // 每页 N 条
            handleSizeChange(val) {

            },
            // 当前页
            handleCurrentChange(val) {
                var page = val;
                vue_this.search.page = page;
                var data = vue_this.search;
                requestSearchAndCurpageUrl  = vue_this.action;
                requestSearchAndCurpageData = data;
                vue_this.getTableData(requestSearchAndCurpageUrl, data);
            },
            // 增删改设置post路由
            setPostUrl(event){
                this.handleRequestUrl = vue_this.URL+event.target.getAttribute('request-url');
            },
            // 搜索提交
            sendSearchForm(){
                requestSearchAndCurpageUrl  = vue_this.action;
                requestSearchAndCurpageData = vue_this.search;
                vue_this.getTableData(requestSearchAndCurpageUrl, requestSearchAndCurpageData);
            },
            addContent(event){
                this.setPostUrl(event);
                $(".sendConentBoder .el-dialog__title").html('添加');
                vue_this.dialogVisible1Add = true;
            },
            editContent(event){
                this.setPostUrl(event);
                $(".sendConentBoder .el-dialog__title").html('编辑');
                vue_this.form  = vue_this.selectRow;
                var cert_type  = typeof vue_this.selectRow.recommend_cert;
                if(vue_this.selectRow.recommend_cert != '' && cert_type == 'string'){
                    vue_this.form.recommend_cert  = vue_this.selectRow.recommend_cert.split(",");
                }
                if(vue_this.selectRow.recommend_cert == ''){
                    vue_this.selectRow.recommend_cert = [];
                }
                for(var i in vue_this.form.recommend_cert){
                    if(vue_this.form.recommend_cert[i] != ''){
                        vue_this.form.recommend_cert[i] = vue_this.cat_list[vue_this.form.recommend_cert[i]];
                    }
                }
                vue_this.dialogVisible1Add = true;
            },
            delContent(event){
                var handleRequestUrl = vue_this.URL+event.target.getAttribute('request-url');
                vue_this.$confirm('确定要执行此操作吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax(vue_this, handleRequestUrl, vue_this.selectRow, function (data, vue_this) {
                        if(data.status == false) {
                            vue_this.$message.error(data.msg);
                        }else{
                            vue_this.getTableData(requestSearchAndCurpageUrl, requestSearchAndCurpageData);
                            vue_this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                        }
                    });
                    vue_this.dialogVisible     = false
                    vue_this.dialogVisible1Add = false
                });
            },
            //获取列表数据统一方法
            getTableData(Url, Data){
                this.$ajax(vue_this, Url, Data, function (data, vue_this) {
                    if(data.status == false) {
                        vue_this.$message.error(data.msg);
                    }else{
                        vue_this.tableData = vue_this.handleDataList(data.data);
                        vue_this.curpage = {
                            size:  data.curpage.size,           // 每页条数
                            total: data.curpage.total           // 数据总条数
                        }
                    }
                });

            },
            handleDataList(data){
                var nav_group_no = {"1" : "全国", "2" : "热门", "3" : "其他", "4" : "试点"};
                var status = {"1" : "正常", "0" : "作废"};
                var hot = {"1" : "是", "0" : "否"};
                for(var i in data){
                    data[i].status_desc = status[data[i].status];
                    data[i].nav_group_no_desc = nav_group_no[data[i].nav_group_no];
                    data[i].hot_desc = hot[data[i].hot];
                }
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
