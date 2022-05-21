<template>
    <div id="casemange">
        <div id="head">
            <el-select >
                <el-option>DCR</el-option>
                <el-option>SRM</el-option>
            </el-select>
            <el-button>查询</el-button>
            <el-button @click="add_case">添加用例</el-button>
        </div>
        <div id="content">
            <el-table
                stripe
                :data="caseData"
                style="width: 100%"
                :height="tableheight"
                >
                <el-table-column
                prop="id"
                label="用例ID"
                width="100"
                sortable>
                </el-table-column>
                <el-table-column
                prop="casename"
                label="用例名称"
                :width="casecolumnwidth"
                sortable
                >
                </el-table-column>
                <el-table-column
                prop="subject"
                label="项目"
                :width="columnwidth"
                sortable>
                </el-table-column>
                <el-table-column
                prop="datetime"
                label="创建时间"
                width="180"
                sortable>
                </el-table-column>
                <el-table-column
                prop="autor"
                label="创建人"
                :width="columnwidth"
                sortable>
                </el-table-column>
                <el-table-column
                label="操作"
                width="220">
                <template slot-scope="scope">
                    <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                    执行
                    </el-button>
                    <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                    修改
                    </el-button>
                    <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                    查看
                    </el-button>
                    <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                    移除
                    </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div id="page">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentpage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalsize">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import Plugin from 'v-fit-columns';
Vue.use(Plugin);


export default({
    name: 'CaseManage',
    data(){
        return{
            tableheight: window.innerHeight - 200+"px",
            pagesize: 100,
            currentpage: 1,
            totalsize: 600,
            caseData: [
                {
                    id: '1',
                    casename: 'DCR登录操作',
                    subject: 'DCR',
                    datetime: '2022-01-09 12:43:32',
                    autor: '王建东'
                },
                {
                    id: '2',
                    casename: '订单协同-订单管理-订单退回-填写退回原因为空，退回失败',
                    subject: 'SRM',
                    datetime: '2022-01-10 12:43:32',
                    autor: '王建东'
                },
                {
                    id: '3',
                    casename: '订单协同-订单管理-订单退回',
                    subject: 'SRM',
                    datetime: '2022-01-10 12:43:32',
                    autor: '王建东'
                },
                {
                    id: '4',
                    casename: '订单协同-订单管理-订单退回',
                    subject: 'SRM',
                    datetime: '2022-01-10 12:43:32',
                    autor: '王建东'
                },
                {
                    id: '5',
                    casename: '订单协同-订单管理-订单退回',
                    subject: 'SRM',
                    datetime: '2022-01-10 12:43:32',
                    autor: '王建东'
                },
                {
                    id: '6',
                    casename: '订单协同-订单管理-订单退回',
                    subject: 'SRM',
                    datetime: '2022-01-10 12:43:32',
                    autor: '王建东'
                },
                {
                    id: '7',
                    casename: '订单协同-订单管理-订单退回',
                    subject: 'SRM',
                    datetime: '2022-01-10 12:43:32',
                    autor: '王建东'
                },
            ],
            columnwidth:130,
            casecolumnwidth:window.innerWidth-230-130*4-180,
        }
    },
    methods:{
        get_case_data(){
            // var _this = this
            this.$axios.post("http://127.0.0.1:8082/getcasedata",
            {
                pageNum:1,
                pageSize:5
            }).then(function(res){
                console.log("casedata:",res.data)
            }).catch((err)=>{
                console.log(err)
            })
        },
        add_case(){
            this.$router.push("/autotestmanage/caseedit")
        },
        handleSizeChange(val){
            console.log(val)
            this.get_case_data();
        },
        handleCurrentChange(val){
            console.log(val)
            this.get_case_data();
        }
    }
})
</script>
