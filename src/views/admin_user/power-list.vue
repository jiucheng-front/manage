<template>
    <div id="content" class="app-content" role="main">
        <div class="app-content-body">
            <div class="bg-light lter b-b wrapper-md">
                <h1 class="m-n font-thin h3">权限管理</h1>
            </div>

            <!--中间内容开始-->
            <div class="wrapper-md" ng-controller="FormDemoCtrl">
                <!--form开始-->
                <div class="panel panel-default">
                    <div class="panel-heading font-bold">
                        Search form
                    </div>
                </div>
                <!--form结束-->

                <!--table列表开始-->
                <div class="panel panel-default">
                    <div class="panel-heading">DataTables</div>
                    <div class="table-responsive">

                        <el-table :data="tableData" @row-dblclick="handleEdit" border style="width: 100%">
                            <el-table-column prop="id"            label="ID"></el-table-column>
                            <el-table-column prop="name"          label="标识"></el-table-column>
                            <el-table-column prop="display_name"  label="角色名"></el-table-column>
                            <el-table-column prop="description"   label="说明"></el-table-column>
                            <el-table-column prop="created_at"    label="创建时间"></el-table-column>
                        </el-table>
                    </div>
                    <!--分页开始-->
                    <div class="block">
                        <el-pagination   @current-change="handleCurrentChange"
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
                        <button type="submit" @click="addContent($event)" class="btn btn-sm btn-info ypp-btn-add" request-url="/admin/add_role">添加
                        </button>
                        <!--<button type="submit" @click="lookContent" class="btn btn-sm btn-info ypp-btn-look"  request-url="/web/look">查看
                        </button>-->
                        <button type="submit" @click="editContent($event)" class="btn btn-sm btn-info ypp-btn-edit" request-url="/admin/edit_role">编辑
                        </button>
                        <button type="submit" @click="editPowerContent($event)" class="btn btn-sm btn-info ypp-btn-edit" request-url="/admin/edit_role_power">权限
                        </button>
                        <!--<button type="submit" @click="updateContent" class="btn btn-sm btn-info ypp-btn-update" request-url="/web/update">更新-->
                        <!--</button>-->
                        <!-- <button type="submit" @click="delContent($event)" class="btn btn-sm btn-info ypp-btn-del" request-url="/basesys/del-biz-cat">刪除
                        </button> -->
                    </el-dialog>
                </div>
                <!--功能按鈕彈出结束-->
            </div>
            <!--中间内容结束-->

            <!--查看内容开始-->
            <el-dialog :title="dialog_title" v-model="dialogVisible1Add" size="tiny" custom-class="sendConentBoder">
                <el-form ref="form" :model="form" label-width="80px" id="sendContent">
                    <el-form-item label="标识*">
                        <el-input v-model="form.name" name="name"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名*">
                        <el-input v-model="form.display_name" name="display_name"></el-input>
                    </el-form-item>
                    <el-form-item label="说明*">
                        <el-input v-model="form.description" name="description"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <input type="hidden" name="id" v-model="form.id"  id="post_id" />
                    <el-button @click="dialogVisible1Add = false">取 消</el-button>
                    <el-button type="primary" @click="sendFormRequest">确 定</el-button>
                </span>
            </el-dialog>
            <!--查看内容结束-->
            <!--权限开始-->
            <el-dialog :title="dialog_title" v-model="dialogVisible2Add" size="tiny" custom-class="sendConentBoder">
                <el-form ref="form" :model="form" label-width="80px" >
                    <el-tree 
                    :data="powers" 
                    show-checkbox 
                    node-key="id" 
                    :default-expanded-keys="default_expanded_keys" 
                    :default-checked-keys="[]" 
                    ref="tree" 
                    highlight-current
                    :props="defaultProps">
                    </el-tree>  
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <input type="hidden" name="id" v-model="form.id"  id="post_id" />
                    <el-button @click="dialogVisible2Add = false">取 消</el-button>
                    <el-button type="primary" @click="sendFormRequest">确 定</el-button>
                </span>
            </el-dialog>
            <!--权限结束-->

        </div>
    </div>
</template>

<script>


    var vue_this = '';
    export default {
        data () {
            return {
                URL                 : window.getConfig.URL,
                action              : window.getConfig.URL+'/admin/permission.list',
                get_rule_url        : window.getConfig.URL+'/admin/admin_role',
                tableData           : [],                   // 列表数据
                selectRow           : {},                   // 选中的行数据
                dialog_title        : "添加",
                curpage             : {size:0, total:0},
                dialogVisible1Add   : false,                // 表单弹框-是否显示
                dialogVisible2Add   : false,                // 表单权限弹框-是否显示
                dialogVisible       : false,                // 功能框-是否显示
                handleRequestUrl    : '',
                searchAndCurpageData: '',                   // 搜索、分页请求数据
                searchAndCurpageUrl : '',                   // 搜索、分页请求url
                search:{                                    // 搜索内容
                },
                form:{                                      // 弹框内容
                    
                },
                //权限列表
                default_expanded_keys: [],
                powers: [
                    {
                        id      : 2,
                        label   : '用户管理',
                        children: [
                            {
                                id: 8,
                                label: '用户列表'
                            }, 
                            {
                                id: 9,
                                label: '用户详情'
                            }
                        ]
                    },
                    {
                        id      : 7,
                        label   : '财务管理',
                        children: [
                            {
                                id: 19,
                                label: '收入列表'
                            }, 
                            {
                                id: 9,
                                label: '打赏列表'
                            }
                        ]
                    }
                ],
                defaultProps: {
                  children: 'children',
                  label   : 'label'
                }
            }
        },
        methods: {
            //列表点击-弹出功能框
            handleEdit: function (row, event, column) {
                vue_this.dialogVisible = true;
                vue_this.selectRow     = row;
            },
            // 分页
            handleCurrentChange(page) {
                vue_this.search.page          = page;
                vue_this.searchAndCurpageUrl  = vue_this.action;
                vue_this.searchAndCurpageData = vue_this.search;
                vue_this.getTableData(vue_this.searchAndCurpageUrl, vue_this.search);
            },
            // 表单弹框发送地址设置（添加、编辑）
            setPostUrl(event){
                vue_this.handleRequestUrl = vue_this.URL+event.target.getAttribute('request-url');
                
            },
            // 搜索提交
            sendSearchForm(){
                vue_this.searchAndCurpageUrl  = vue_this.action;
                vue_this.searchAndCurpageData = vue_this.search;
                vue_this.getTableData(vue_this.searchAndCurpageUrl, vue_this.searchAndCurpageData);
            },
            // 表单弹框-添加
            addContent(event){
                vue_this.setPostUrl(event);
                vue_this.dialog_title      = '添加';
                vue_this.dialogVisible1Add = true;
            },
            // 表单弹框-编辑
            editContent(event){
                vue_this.setPostUrl(event);
                vue_this.dialog_title      = '编辑';
                vue_this.dialogVisible1Add = true;
                vue_this.form              = vue_this.selectRow;
            },
            // 表单弹框-编辑权限
            editPowerContent(event){
                vue_this.setPostUrl(event);
                vue_this.dialog_title      = '编辑权限';
                vue_this.dialogVisible2Add = true;
                vue_this.form              = vue_this.selectRow;
            },
            getCheckedNodes() {
                console.log(vue_this.$refs.tree.getCheckedNodes());
            },
            getCheckedKeys() {
                return vue_this.$refs.tree.getCheckedKeys();
            },
            // 表单弹框-删除
            delContent(event){
                
            },
            // 表单弹框-发送数据
            sendFormRequest: function(){
                vue_this.form.powers = vue_this.getCheckedKeys();
                this.$ajax(vue_this, vue_this.handleRequestUrl, vue_this.form, function (data, back_vue_this) {
                    if(data.status == false) {
                        vue_this.$message.error(data.msg);
                    }else{
                        vue_this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        //重新加载数据
                        vue_this.getTableData(vue_this.searchAndCurpageUrl, vue_this.searchAndCurpageData);
                        vue_this.dialogVisible     = false;
                        vue_this.dialogVisible1Add = false;
                        vue_this.dialogVisible2Add = false;
                    }
                })
            },
            //获取列表数据统一方法
            getTableData(Url, data){
                this.$ajax(vue_this, Url, data, function (data, vue_this) {
                    if(data.status == false) {
                        vue_this.$message.error(data.msg);
                    }else{
                        vue_this.tableData  = vue_this.handleDataList(data.data);
                        vue_this.curpage    = {
                            size:  data.curpage.size,           // 每页条数
                            total: data.curpage.total           // 数据总条数
                        }
                    }
                });
            },
            // 列表数据处理
            handleDataList(data){
                return data;
            },
            
        },
        mounted () {
            vue_this = this;
            this.$nextTick(function () {
                // 初始化表单数据
                vue_this.searchAndCurpageUrl  = vue_this.action;
                vue_this.searchAndCurpageData = vue_this.search;
                vue_this.getTableData(vue_this.searchAndCurpageUrl, vue_this.searchAndCurpageData);

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
