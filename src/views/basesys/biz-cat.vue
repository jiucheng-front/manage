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
                        <form class="form-inline" id="on-html-form" role="form" action="/basesys/biz-cat"  method="post">
                            <div class="form-group">
                                <el-input placeholder="品类名称" v-model="search.cat_name" name="cat_name" ></el-input>
                            </div>
                            <div class="form-group">
                                <el-select v-model="search.status" placeholder="状态">
                                    <el-option v-for="item in status_options" :label="item.label" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="form-group">
                                <el-select v-model="search.cat_level" placeholder="分类级别">
                                    <el-option v-for="item in cat_level_options" :label="item.label" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="form-group">
                                <el-select  v-model="search.parent_id" filterable clearable placeholder="一级分类" name="parent_id">
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

                        <el-table :data="tableData" @row-dblclick="handleEdit" border style="width: 100%">
                            <el-table-column fixed prop="cat_name"      label="名称" width="120"></el-table-column>
                            <el-table-column prop="cat_code"            label="编码" width="120"></el-table-column>
                            <el-table-column                            label="ICON"  width="120">
                                <template scope="scope">
                                    <img :src="scope.row.cat_icon_url" width="50" height="50" />
                                </template>
                            </el-table-column>
                            <el-table-column                            label="LOGO"  width="120">
                                <template scope="scope">
                                    <img  :src="scope.row.cat_logo_url" width="50" height="50" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="status_desc"         label="状态"></el-table-column>
                            <el-table-column prop="is_new_desc"         label="新品类" width="100"></el-table-column>
                            <el-table-column prop="cat_level_desc"      label="级别" width="100"></el-table-column>
                            <el-table-column prop="is_dispatch_desc"    label="派单"></el-table-column>
                            <el-table-column prop="parent_desc"         label="上级分类" width="150"></el-table-column>
                            <el-table-column prop="order_no"            label="排序"></el-table-column>
                            <el-table-column prop="cat_property_name"   label="标签名" width="110"></el-table-column>
                            <el-table-column                            label="标签值" width="200">
                                <template scope="scope">
                                    <el-popover>
                                        <div slot="reference" class="name-wrapper">
                                            <el-tag>{{ scope.row.cat_property_values }}</el-tag>
                                        </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column                            label="默认地图关键词" width="140">
                                <template scope="scope">
                                    <el-popover>
                                        <div slot="reference" class="name-wrapper">
                                            <el-tag>{{ scope.row.poi_keyword }}</el-tag>
                                        </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column                            label="地图分类科目编号" width="150">
                                <template scope="scope">
                                    <el-popover>
                                        <div slot="reference" class="name-wrapper">
                                            <el-tag>{{ scope.row.poi_type_code }}</el-tag>
                                        </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column prop="tax_rate"            label="税率的维护" width="120"></el-table-column>
                            <el-table-column prop="unit"                label="单位"></el-table-column>
                            <el-table-column                            label="下单后自动回复语句" width="170">
                                <template scope="scope">
                                    <el-popover>
                                        <div slot="reference" class="name-wrapper">
                                            <el-tag>{{ scope.row.respon_word }}</el-tag>
                                        </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column prop="tuan_people_num"     label="参团人数(以#分隔)" width="160"></el-table-column>
                            <el-table-column prop="onecetime"           label="一次所需要的时间" width="160"></el-table-column>
                            <el-table-column prop="times"               label="单天允许接单的最大次数" width="200"></el-table-column>
                            <el-table-column prop="rank_type_desc"      label="榜单类型(周榜或月榜)" width="180"></el-table-column>
                            <el-table-column prop="max_orders_day"      label="可下单最长时间(天)" width="180"></el-table-column>
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
                        <button type="submit" @click="addContent($event)" class="btn btn-sm btn-info ypp-btn-add" request-url="/basesys/add-biz-cat">添加
                        </button>
                        <!--<button type="submit" @click="lookContent" class="btn btn-sm btn-info ypp-btn-look"  request-url="/web/look">查看
                        </button>-->
                        <button type="submit" @click="editContent($event)" class="btn btn-sm btn-info ypp-btn-edit" request-url="/basesys/edit-biz-cat">编辑
                        </button>
                        <!--<button type="submit" @click="updateContent" class="btn btn-sm btn-info ypp-btn-update" request-url="/web/update">更新-->
                        <!--</button>-->
                        <button type="submit" @click="delContent($event)" class="btn btn-sm btn-info ypp-btn-del" request-url="/basesys/del-biz-cat">刪除
                        </button>
                    </el-dialog>
                </div>
                <!--功能按鈕彈出结束-->
            </div>
            <!--中间内容结束-->

            <!--查看内容开始-->
            <el-dialog :title="dialog_title" v-model="dialogVisible1Add" size="tiny" custom-class="sendConentBoder">
                <el-form ref="form" :model="form" :label-position="labelPosition"   >
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item  label="名称">
                                <el-input v-model="form.cat_name"               name="cat_name"             ></el-input></el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item  label="编码">
                                <el-input v-model="form.cat_code"               name="cat_code"             ></el-input> </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-select v-model="form.is_dispatch" placeholder="派单">
                                <el-option v-for="item in is_dispatch_options" :label="item.label" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-select v-model="form.status" placeholder="状态">
                                <el-option v-for="item in status_options" :label="item.label" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-select v-model="form.is_new" placeholder="新品类">
                                <el-option v-for="item in is_new_options" :label="item.label" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" style="margin-top: 20px">
                        <el-col :span="8" >
                            父级分类:
                            <el-select v-model="form.parent_id" filterable clearable label="父级分类">
                            <el-option
                                    v-for="(value,index) in cat_list"
                                    :key="index"
                                    :label="value"
                                    :value="index">
                            </el-option>
                        </el-select>
                        </el-col>
                        <el-col :span="8" >
                            资质名称:
                            <el-select v-model="form.cert_id" filterable clearable label="资质名称">
                            <el-option
                                    v-for="(value,index) in cert_list"
                                    :key="index"
                                    :label="value"
                                    :value="index">
                            </el-option>
                        </el-select>
                        </el-col>
                        <el-col :span="8">
                            榜单类型(周榜或月榜):
                            <el-select label="榜单类型(周榜或月榜)" v-model="form.rank_type" >
                            <el-option v-for="item in rank_type_options" :label="item.label" :value="item.value" :key="item.value">
                            </el-option>
                        </el-select>
                        </el-col>
                    </el-row>

                    <el-form-item  label="ICON" style="margin-top: 20px">
                        <el-input v-model="form.cat_icon"               name="cat_icon"             ></el-input>
                    </el-form-item>
                    <el-form-item  label="LOGO">
                        <el-input v-model="form.cat_logo"               name="cat_logo"             ></el-input>
                    </el-form-item>



                    <el-row :gutter="20">

                        <el-col :span="12">
                            <el-form-item  label="排序">
                                <el-input v-model="form.order_no"               name="order_no"             ></el-input> </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item  label="标签名">
                                <el-input v-model="form.cat_property_name"      name="cat_property_name"    ></el-input> </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item  label="税率的维护">
                                <el-input v-model="form.tax_rate"               name="tax_rate"             ></el-input> </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item  label="单位">
                                <el-input v-model="form.unit"                   name="unit"                 ></el-input> </el-form-item>
                        </el-col>
                    </el-row>


                    <el-form-item  label="标签值">
                        <el-input v-model="form.cat_property_values"    name="cat_property_values"  ></el-input> </el-form-item>
                    <el-form-item  label="默认地图关键词">
                        <el-input v-model="form.poi_keyword"            name="poi_keyword"          ></el-input> </el-form-item>
                    <el-form-item  label="地图分类科目编号">
                        <el-input v-model="form.poi_type_code"          name="poi_type_code"        ></el-input> </el-form-item>

                    <el-form-item  label="下单后自动回复语句">
                        <el-input v-model="form.respon_word"            name="respon_word"          ></el-input> </el-form-item>
                    <el-form-item  label="参团人数(以#分隔)">
                        <el-input v-model="form.tuan_people_num"        name="tuan_people_num"      ></el-input> </el-form-item>

                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item  label="一次所需要的时间">
                                <el-input v-model="form.onecetime"              name="onecetime"            ></el-input> </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item  label="单天允许接单的最大次数">
                                <el-input v-model="form.times"                  name="times"                ></el-input> </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item  label="可下单最长时间(天)">
                                <el-input v-model="form.max_orders_day"         name="max_orders_day"       ></el-input>
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
    var requestSearchAndCurpageUrl  = ''; // 搜索、分页请求url
    var requestSearchAndCurpageData = ''; // 搜索、分页请求数据

    export default {
        data () {
            return {
                URL: window.getConfig.URL,
                action : window.getConfig.URL+'/basesys/biz-cat',
                tableData: [],  // 列表数据
                selectRow: {},  // 选中的行数据
                cert_list: {},  // 资质列表
                cat_list:  {},  // 品类列表
                dialog_title:"添加",
                curpage: {size:0, total:0},
                dialogVisible1Add: false, // 表单弹框-是否显示
                dialogVisible: false,     // 功能框-是否显示
                handleRequestUrl: '',
                labelPosition: 'top',
                search:{ // 搜索内容
                    status:"",
                    cat_name:"",
                    cat_level:"",
                    parent_id:"",
                },
                status_options : [{
                    value: '',
                    label: '全部状态'
                }, {
                    value: '1',
                    label: '正常'
                }, {
                    value: '2',
                    label: '删除'
                }],
                is_new_options : [{
                    value: '',
                    label: '是否新品'
                }, {
                    value: '1',
                    label: '新品-是'
                }, {
                    value: '0',
                    label: '新品-否'
                }],
                is_dispatch_options : [{
                    value: '',
                    label: '是否派单'
                }, {
                    value: '1',
                    label: '派单-是'
                }, {
                    value: '0',
                    label: '派单-否'
                }],
                rank_type_options : [{
                    value: '',
                    label: '榜单类型'
                }, {
                    value: "1",
                    label: '周榜'
                }, {
                    value: "2",
                    label: '月榜'
                }],
                cat_level_options : [{
                    value: '',
                    label: '全部分类级别'
                }, {
                    value: 1,
                    label: '一级分类'
                }, {
                    value: 2,
                    label: '二级分类'
                }],
                form:{ // 弹框内容
                    cert_id:"",
                    is_dispatch  : "",
                    status       : "",
                    is_new       : "",
                    parent_id    : "",
                    cert_id      : "",
                    rank_type    : "",
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
                vue_this.search.page = page;
                var data = vue_this.search;
                requestSearchAndCurpageUrl  = vue_this.action;
                requestSearchAndCurpageData = data;
                vue_this.getTableData(requestSearchAndCurpageUrl, data);
            },
            // 表单弹框发送地址设置（添加、编辑）
            setPostUrl(event){
                vue_this.handleRequestUrl = vue_this.URL+event.target.getAttribute('request-url');
            },
            // 搜索提交
            sendSearchForm(){
                requestSearchAndCurpageUrl  = vue_this.action;
                requestSearchAndCurpageData = vue_this.search;
                vue_this.getTableData(requestSearchAndCurpageUrl, requestSearchAndCurpageData);
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
                vue_this.form          = vue_this.selectRow;
            },
            // 表单弹框-删除
            delContent(event){
                var delUrl = vue_this.URL+event.target.getAttribute('request-url');
                vue_this.$confirm('确定要执行此操作吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$ajax(vue_this, delUrl, vue_this.selectRow, function (data, vue_this) {
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
            // 表单弹框-发送数据
            sendFormRequest: function(){
                var data = vue_this.form;
                requestSearchAndCurpageData.cat_name = data.cat_name;
                this.$ajax(vue_this, vue_this.handleRequestUrl, data, function (data, back_vue_this) {
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
            //获取列表数据统一方法
            getTableData(Url, data){
                this.$ajax(vue_this, Url, data, function (data, vue_this) {
                    if(data.status == false) {
                        vue_this.$message.error(data.msg);
                    }else{
                        vue_this.cat_list  = data.cat_list;
                        vue_this.cert_list  = data.cert_list;
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
                var status_desc      = {"1":"正常",   "2":"删除"};
                var is_new_desc      = {"1":"是",     "0":"否"};
                var rank_type_desc   = {"1":"周榜",   "2":"月榜"};
                var cat_level_desc   = {"1":"一级分类","2":"二级分类"};
                var is_dispatch_desc = {"1":"是","0":"否"};
                var pic_url = window.getConfig.pic_url;
                for(var i in data){
                    data[i].status_desc      = status_desc[data[i].status];
                    data[i].is_new_desc      = is_new_desc[data[i].is_new];
                    data[i].rank_type_desc   = rank_type_desc[data[i].rank_type];
                    data[i].cat_level_desc   = cat_level_desc[data[i].cat_level];
                    data[i].is_dispatch_desc = is_dispatch_desc[data[i].is_dispatch];
                    data[i].cat_icon_url     = pic_url+data[i].cat_icon;
                    data[i].cat_logo_url     = pic_url+data[i].cat_logo;
                    data[i].parent_desc      = vue_this.cat_list[data[i].parent_id];
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
            vue_this = this;
            this.$nextTick(function () {
                // 初始化表单数据
                requestSearchAndCurpageUrl  = vue_this.action;
                requestSearchAndCurpageData = vue_this.search;
                vue_this.getTableData(requestSearchAndCurpageUrl, requestSearchAndCurpageData);

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
