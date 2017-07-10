<template>
    <div id="content" class="app-content" role="main">
        <div class="app-content-body">
            <div class="bg-light lter b-b wrapper-md">
                <h1 class="m-n font-thin h3">资质列表</h1>
            </div>

            <!--中间内容开始-->
            <div class="wrapper-md" ng-controller="FormDemoCtrl">
                <!--form开始-->
                <div class="panel panel-default">
                    <div class="panel-heading font-bold">
                        Search form
                    </div>
                    <div class="panel-body">
                        <form class="form-inline" id="on-html-form" role="form" action="/basesys/biz-cert"  method="post">
                            <div class="form-group">
                                <el-input placeholder="资质名称" v-model="search.cert_name" name="cert_name" ></el-input>
                            </div>
                            <div class="form-group">
                                <el-select v-model="search.status" placeholder="状态">
                                    <el-option v-for="item in status_options" :label="item.label" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="form-group">
                                <el-select  v-model="search.cat_parent_id" filterable clearable placeholder="一级分类" name="cat_parent_id">
                                    <el-option
                                            v-for="(value,index) in cat_list"
                                            :key="index"
                                            :label="value"
                                            :value="index">
                                    </el-option>
                                </el-select>
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
                            <el-table-column prop="cert_name"       label="资质名称"></el-table-column>
                            <el-table-column prop="id"       label="id"></el-table-column>
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
                        <button type="submit" @click="addContent($event)" class="btn btn-sm btn-info ypp-btn-add" request-url="/basesys/add-biz-cert">添加
                        </button>
                        <!--<button type="submit" @click="lookContent" class="btn btn-sm btn-info ypp-btn-look"  request-url="/web/look">查看
                        </button>-->
                        <button type="submit" @click="editContent($event)" class="btn btn-sm btn-info ypp-btn-edit" request-url="/basesys/edit-biz-cert">编辑
                        </button>
                        <!--<button type="submit" @click="updateContent" class="btn btn-sm btn-info ypp-btn-update" request-url="/web/update">更新-->
                        <!--</button>-->
                        <button type="submit" @click="delContent($event)" class="btn btn-sm btn-info ypp-btn-del" request-url="/basesys/del-biz-cert">刪除
                        </button>
                    </el-dialog>
                </div>
                <!--功能按鈕彈出结束-->
            </div>
            <!--中间内容结束-->

            <!--查看内容开始-->
            <el-dialog title="添加" v-model="dialogVisible1Add" size="tiny" custom-class="sendConentBoder">
                <el-form ref="form"  label-width="125px" id="sendContent"  >
                    <el-form-item label="资质名称">
                        <el-input v-model="cert_info.cert_name" name="cert_name"></el-input>
                    </el-form-item>
                    <el-form-item label="ICON">
                        <el-input v-model="cert_info.cert_icon" name="cert_icon"></el-input>
                    </el-form-item>
                    <el-form-item label="LOGO">
                        <el-input v-model="cert_info.cert_logo" name="cert_logo"></el-input>
                    </el-form-item>
                    <el-form-item label="默认图">
                        <el-input v-model="cert_info.default_img" name="default_img"></el-input>
                    </el-form-item>
                    <el-form-item label="默认灰图">
                        <el-input v-model="cert_info.yue_cat_logo_normal" name="yue_cat_logo_normal"></el-input>
                    </el-form-item>
                    <el-form-item label="资质示例图">
                        <el-input v-model="cert_info.example_img" name="example_img"></el-input>
                    </el-form-item>
                    <el-form-item label="一级分类" >
                        <el-select  v-model="cert_info.cat_parent_id" filterable placeholder="请选择" name="cat_parent_id">
                            <el-option
                                    v-for="(value,index) in cat_list"
                                    :key="index"
                                    :label="value"
                                    :value="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标签选项">
                        <el-input v-model="cert_info.level_options" name="level_options"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片描述">
                        <el-input v-model="cert_info.upload_des" name="upload_des"></el-input>
                    </el-form-item>
                    <el-form-item label="考官token">
                        <el-input v-model="cert_info.examiner_token" name="examiner_token"></el-input>
                    </el-form-item>
                    <el-form-item label="考官账号名">
                        <el-input v-model="cert_info.examiner_name" name="examiner_name"></el-input>
                    </el-form-item>
                    <el-form-item label="自动回复">
                        <el-input v-model="cert_info.reply" name="reply"></el-input>
                    </el-form-item>
                    <el-form-item label="是否需要资质审核">
                        <select class="el-input__inner" name="is_check" v-model="cert_info.is_check" >
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </el-form-item>
                    <el-form-item label="资质状态">
                        <select class="el-input__inner" name="status" v-model="cert_info.status" >
                            <option value="1">正常</option>
                            <option value="0">删除</option>
                        </select>
                    </el-form-item>

                    <el-form-item label="图片">
                        <el-row>
                            <el-col :span="24">
                                <el-radio  v-model="cert_review.pics.is_required" name="pics[is_required]" label="1">备选项</el-radio>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="图片说明">
                        <el-input v-model="cert_review.pics.prompt" name=""></el-input>
                    </el-form-item>
                    <el-form-item label="图片地址">
                        <el-input v-model="cert_review.pics.case_content" name=""></el-input>
                    </el-form-item>

                    <el-form-item label="音频">
                        <el-row>
                            <el-col :span="8">
                                <el-radio  v-model="cert_review.audio.is_required" name="audio[is_required]" label="1">选填</el-radio>
                            </el-col>
                            <el-col :span="8">
                                <el-radio  v-model="cert_review.audio.is_required" name="audio[is_required]" label="2">必填</el-radio>
                            </el-col>
                            <el-col :span="8">
                                <el-radio  v-model="cert_review.audio.is_required" name="audio[is_required]" label="3">不需要</el-radio>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="音频说明">
                        <el-input v-model="cert_review.audio.prompt" name=""></el-input>
                    </el-form-item>
                    <el-form-item label="音频地址">
                        <el-input v-model="cert_review.audio.case_content" name=""></el-input>
                    </el-form-item>

                    <el-form-item label="视频">
                        <el-row>
                            <el-col :span="8">
                                <el-radio  v-model="cert_review.video.is_required" name="video[is_required]" label="1">选填</el-radio>
                            </el-col>
                            <el-col :span="8">
                                <el-radio  v-model="cert_review.video.is_required" name="video[is_required]" label="2">必填</el-radio>
                            </el-col>
                            <el-col :span="8">
                                <el-radio  v-model="cert_review.video.is_required" name="video[is_required]" label="3">不需要</el-radio>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="视频说明">
                        <el-input v-model="cert_review.video.prompt" name=""></el-input>
                    </el-form-item>
                    <el-form-item label="视频地址">
                        <el-input v-model="cert_review.video.case_content" name=""></el-input>
                    </el-form-item>

                    <el-form-item label="技能等级">
                        <el-row>
                            <el-col :span="12">
                                <el-radio  v-model="cert_review.level.is_required" name="level[is_required]" label="2">必填</el-radio>
                            </el-col>
                            <el-col :span="12">
                                <el-radio  v-model="cert_review.level.is_required" name="level[is_required]" label="3">不需要</el-radio>
                            </el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item label="说明">
                        <el-row>
                            <el-col :span="8">
                                <el-radio  v-model="cert_review.memo.is_required" name="memo[is_required]" label="1">选填</el-radio>
                            </el-col>
                            <el-col :span="8">
                                <el-radio  v-model="cert_review.memo.is_required" name="memo[is_required]" label="2">必填</el-radio>
                            </el-col>
                            <el-col :span="8">
                                <el-radio  v-model="cert_review.memo.is_required" name="memo[is_required]" label="3">不需要</el-radio>
                            </el-col>
                        </el-row>
                    </el-form-item>


                </el-form>
                <span slot="footer" class="dialog-footer">
                    <input type="hidden" name="id" v-model="cert_info.id"  id="post_id" />
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
                action : 'http://localhost:8080/basesys/biz-cert',
                tableData: [],
                selectRow: {},
                cat_list:  {},
                curpage: {size:0, total:0},
                dialogVisible1Add: false,
                dialogVisible: false,
                handleRequestUrl: '',
                search:{
                    status:"",
                    cert_name:"",
                    cat_parent_id:""
                },
                status_options : [{
                    value: '',
                    label: '全部状态'
                }, {
                    value: '1',
                    label: '正常'
                }, {
                    value: '0',
                    label: '删除'
                }],
                cert_info:{
                },
                cert_review:{
                    pics: {
                        is_required: "1",
                        prompt: "",
                        case_content: ""
                    },
                    audio: {
                        is_required: "",
                        prompt: "",
                        case_content: ""
                    },
                    video: {
                        is_required: "",
                        prompt: "",
                        case_content: ""
                    },
                    level: {
                        is_required: "",
                        prompt: "",
                        case_content: ""
                    },
                    memo: {
                        is_required: "",
                        prompt: "",
                        case_content: ""
                    }
                }
            }
        },
        methods: {
            //列表点击按钮
            handleEdit: function (row, event, column) {
                vue_this.dialogVisible = true;
                vue_this.selectRow     = row;
            },
            // 弹框 发送数据
            sendFormRequest: function(){
                var data = {
                    cert_info: vue_this.cert_info,
                    cert_review: vue_this.cert_review
                };
                this.$ajax(vue_this, vue_this.handleRequestUrl, data, function (data, vue_this) {
                    if(data.status == false) {
                        self.$message.error(data.msg);
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
                vue_this.handleRequestUrl = vue_this.URL+event.target.getAttribute('request-url');
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
                vue_this.cert_info   = vue_this.selectRow;

                var pics_type  = typeof vue_this.selectRow.cert_review.pics;
                var audio_type = typeof vue_this.selectRow.cert_review.audio;
                var video_type = typeof vue_this.selectRow.cert_review.video;
                var level_type = typeof vue_this.selectRow.cert_review.level;
                var memo_type  = typeof vue_this.selectRow.cert_review.memo;

                if(pics_type != 'undefined'){
                    vue_this.cert_review.pics    = vue_this.selectRow.cert_review.pics;
                }
                if(audio_type != 'undefined'){
                    vue_this.cert_review.audio   = vue_this.selectRow.cert_review.audio;
                }
                if(video_type != 'undefined'){
                    vue_this.cert_review.video   = vue_this.selectRow.cert_review.video;
                }
                if(level_type != 'undefined'){
                    vue_this.cert_review.level   = vue_this.selectRow.cert_review.level;
                }
                if(memo_type != 'undefined'){
                    vue_this.cert_review.memo   = vue_this.selectRow.cert_review.memo;
                }

                vue_this.dialogVisible1Add = true;
            },
            delContent(event){
                handleRequestUrl = event.target.getAttribute('request-url');
                vue_this.$confirm('确定要执行此操作吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$ajax(vue_this, vue_this.URL+handleRequestUrl, vue_this.selectRow, function (data, vue_this) {
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
            // 列表数据处理
            handleDataList(data){
                var status_desc = {"1":"正常","0":"删除"};
                for(var i in data){
                    data[i].status_desc = status_desc[data[i].status];
                    for (var j in data[i]){
                        if(typeof data[i][j] == 'number'){
                            if(data[i][j] == 0){
                                data[i][j] = "";
                            }else{
                                data[i][j] = data[i][j].toString();
                            }
                        }
                    }
                }
                return data;
            }

        },
        mounted () {
            vue_this = self = this;
            this.$nextTick(function () {

                requestSearchAndCurpageUrl  = vue_this.action;
                requestSearchAndCurpageData = vue_this.search;

                vue_this.tableData = {"0":{"cert_name":1, "id":12356},"2":{"cert_name":'面车子', "id":123}};
                
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
