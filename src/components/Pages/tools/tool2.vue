
<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">编辑</el-button>
 
    <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="30%">
        <!-- <span>这是一个信息填框</span> -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="号码">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default{
    name: 'ToolPage2',
    data() {
      return {
        dialogVisible:false,
        form: {
          name: '',
          number:''
        }
      }
    }
}
</script>