<template>
    <div id="content" class="app-content" role="main">
        <div class="app-content-body">
            <div class="bg-light lter b-b wrapper-md">
                <h1 class="m-n font-thin h3">Form Elements</h1>
            </div>
            <slot :data="data">
            </slot>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'layout',
        data () {
            return {
                data: {
                    tableData: ['112']
                }
            }
        },
        methods: {
            //列表

        },
        mounted () {


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
