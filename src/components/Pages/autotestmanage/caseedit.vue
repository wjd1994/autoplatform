<template>
<div>
<div class="main">
  
  <div id="left" ref="left">
      <div id="suiteinfo">
        <div>
          <span>套件名称：{{suitedata.name}}</span>
          
        </div>
        <div>
          <span>套件负责人：张三</span>
          <span>套件等级：P0</span>
        </div>
        <div>
          <span>用例总数：{{suitedata.casenum}}</span>
          <el-checkbox :checked="naturecheck">性能模式</el-checkbox>
        </div>
        
        <div>
          
          <el-button type="info" size="mini" style="width:80px;">前置/后置</el-button>
          <el-button type="primary" size="mini" style="width:80px;">用例变量</el-button>
          
        </div>
        <div>
          <el-button type="danger" size="mini" style="width:80px;" @click="runcase">运行</el-button>
          <el-button type="warning" size="mini" style="width:80px;">日志</el-button>
          <el-button type="success" size="mini" style="width:80px;">报告</el-button>
        </div>
        
        
      </div>
    <!-- 用例目录 -->
      <div class="custom-tree-container">
        <div>
          <i class="el-icon-s-grid" v-if="!expand_all" @click="setAllExpand" style="font-size:14px">全部展开</i>
          <i class="el-icon-menu" v-else @click="setAllFold" style="font-size:14px">全部折叠</i>
        </div>
        <div class="block" >
          <!-- <p>使用 scoped slot</p> -->
          <!-- <div class="allC" @click="handleAllCase">
            <i class="el-icon-link"></i><span class="allCase">所有用例</span>
          </div> -->
          <div style="margin-top:10px;margin-bottom:15px">
          <el-input size="mini" clearable placeholder="输入关键字进行过滤" v-model="filterText" ><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
          </div>
          <el-tree
            :data="data"

            node-key="key"
            :expand-on-click-node="false"
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            @node-click="myEvent"
            draggable
            :allow-drop="allowDrop"
            :allow-drag="allowDrag"
            :filter-node-method="filterNode"
            :highlight-current="true"
            :default-expand-all="expand_all"
            ref="tree"
          >
            <!-- <span
              class="custom-tree-node"
              slot-scope="{ node, data }"
              @mouseenter="onMouseOver($event)"
              @mouseleave="onMouseOut($event)"
            > -->
            <span
              class="custom-tree-node"
              slot-scope="{ node, data }"
            >
            <el-tooltip v-if="!data.isEdit" class="item" effect="dark" :content="node.label" placement="top-start">
              <span @dblclick="handleEdit(node, data)">{{ node.label|ellipsis(13)}}</span>
              </el-tooltip>
              <span class="isEdit">
                <!-- 编辑状态 -->
                
                <div v-if="data.isEdit">
                  <el-input
                    class="editinput"
                    v-model="data.label"
                    autofocus
                    size="mini"
                    :ref="'slotTreeInput' + data[id]"
                    @blur.stop="handleInput(node, data)"
                    @keyup.enter.native="handleInput(node, data)"
                  ></el-input>
                </div>
              
                <!-- 非编辑状态 -->
                <div v-else>
                  <!-- 名称： 新增节点增加class（is-new） -->
                  
                  <span
                    :class="[
                      data[id] < NODE_ID_START ? 'is-new' : '',
                      'comp-tr-node--name',
                    ]"
                  >
                  </span>
                </div>
  
                <span class="comp-tr-node--btns" v-show="dropflag">
                  <el-dropdown trigger="click" @visible-change="handleDropdown">
                    <i class="el-icon-more"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="() => append(node, data)">
                        <i class="el-icon-circle-plus-outline"></i
                        >新增</el-dropdown-item
                      >
                      <el-dropdown-item @click.native="handleEdit(node, data)"
                        ><i class="el-icon-edit"></i>编辑</el-dropdown-item
                      >
                      <el-dropdown-item @click.native="() => remove(node, data)"
                        ><li class="el-icon-delete"></li>
                        删除</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
              </span>
            </span>
          </el-tree>
          <i class="el-icon-plus" @click="handleNewMoudle"
            ><span >新增用例</span></i
          >
        </div>
      </div>
    </div>
    <el-card v-if="content.type=='case'" class="content">
      <div slot="header" class="header">
        <span>用例名称: {{content.data.name}}</span>
        <span>步骤总数: {{content.data.stepnum}}</span>
        <span>用例描述: {{content.data.detail}}</span>
        
      </div>
      <div class="casecontent">
        <div class="casecontent-header">
          <span>用例详情</span>
          <div>
            <div class="savebtn">
          <el-button type="primary" size="small">保存</el-button>
          </div>
          </div>

        </div>
      </div>
    </el-card>
    <el-card v-else class="content">
      <div slot="header" class="header">步骤</div>
      <div class="textitem">步骤内容</div>
    </el-card>


    
  </div>
  <el-dialog title="步骤信息" width="40%" :visible.sync="stepdialogFormVisible" :close-on-click-modal="false">
          <el-form :model="stepform">
            <el-form-item label="步骤名称" :label-width="stepformLabelWidth">
              <el-input v-model="stepform.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="操作类型" :label-width="stepformLabelWidth">
              <el-select v-model="stepform.type" placeholder="请选择操作类型">
                <el-option label="浏览器操作" value="browseroperation"></el-option>
                <el-option label="键盘操作" value="keyoperation"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="stepdialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmstep">确 定</el-button>
          </div>
  </el-dialog>
  <el-dialog title="选择运行用例" width="50%" :visible.sync="runcasedialogVisible" :close-on-click-modal="false">

    <el-transfer
      class="selectcase"
      filterable
      filter-placeholder="请输入用例"
      v-model="selectruncase"
      :data="data"
      :titles="['未选用例', '已选用例']"
      target-order="push">
    </el-transfer>
  
    <div slot="footer" class="dialog-footer">
      <el-button @click="runcasedialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmrun">确 定</el-button>
    </div>
  </el-dialog>
</div>
 
</template>

<script>
let id = 1000;
export default {
    name: "CaseEdit",
  data() {
    const data = [
      {
        key: 1,
        label: "用例管理1",
        type: "case",
        children: [
          {
            key: 4,
            label: "用例first",
            type: "step",
            children: [
              {
                key: 5,
                label: "用例second",
                type: "step",
              },
              {
                key: 6,
                label: "用例three",
                type: "step",
              },
            ],
          },
        ],
      },
      {
        key: 2,
        label: "用例管理2",
        type: "case",
        children: [
          {
            key: 7,
            label: "用例first",
            type: "step",
          },
          {
            key: 8,
            label: "用例second",
            type: "step",
          },
        ],
      },
      {
        key: 3,
        label: "用例管理用例管理用例管理用例管理",
        type: "case",
        children: [
          {
            key: 9,
            label: "用例first12233455645645t长",
            type: "step",
          },
          {
            key: 10,
            label: "用例second",
            type: "step",
          },
        ],
      },
    ];
    return {
      suitedata:{
        name: '登录模块登录模块',
        casenum: 3,
      },
      naturecheck: false,//性能选择
      data: JSON.parse(JSON.stringify(data)),//用例数据
      expand_all: false,
      filterText: '',
      currentEle: null, //操作下拉列表 当前图表元素 省略号
      dropdownShow: false, //下拉列表当前显示状态
      setTree: [], // tree数据
      id: "id", // id对应字段
      MAX_LEVEL: 3, // 设定最大层级
      NODE_ID_START: 0, // 新增节点id，逐次递减
      startId: null,
      dropflag: true, //下拉框显示按钮
      //页面可拖拽
      defaultProps: {
        children: "children",
        label: "label",
      },
      stepdialogFormVisible: false,//新增步骤dialog
      stepform: {
          name: '未命名步骤',
          type: '',
      },//新增步骤dialog 的表单数据
      stepformLabelWidth: '120px',//新增步骤dialog的label宽度
      currentnode: null,//当前节点,用于新增,选中
      currentdata: null,//当前data,用于新增,选中
      content :{ //右边用例或步骤详情
        type: "case",
        data: {
          name: "正确密码登录用例",
          stepnum: 2,
          detail: "用户输入正确的登录密码,登录成功"
        }
      },
      runcasedialogVisible: false,//运行用例选择dialog
      allruncase :[], //所有待选择的用例
      selectruncase:[],//选择运行的用例
    };
  },
  props: {
    bool: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    // 初始值
    this.startId = this.NODE_ID_START;
    
  },
  mounted(){
    console.log(this.$refs.left)
    this.$refs.left.style.minHeight=window.innerHeight-125+"px";
  },
  filters: {
    ellipsis: function (value,len) {
      if (!value) return ''
    if (value.length > len) {
      return value.slice(0, len) + '...'
    }
    return value
    }
  },
  watch:{
    filterText(val) {
            this.$refs.tree.filter(val);
    }
  },
  methods: {
    showdata(){
        console.log()
    },
    runcase(){
      this.runcasedialogVisible = true;
    },
    confirmrun(){
      console.log(this.selectruncase);
      this.runcasedialogVisible = false;
    },
    //所有用例列表接口
    handleAllCase() {},
    //过滤查询
    filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
    },
    //el-tree点击事件
    myEvent(d1, d2, d3) {
      this.$emit("myEvent", d1.id,d2,d3);
      console.log(d2)
      this.content = {
        type: d2.data.type,
        data:{
          name: "正确密码登录用例"
        }
      }
      console.log(this.contentdata)
      // console.log(d1,d2,d3);
    }, //d1.label
    //下拉列表
    handleDropdown(v) {
      this.dropdownShow = v;
      if (v) return;
      // this.currentEle.style.cssText += "display:none";
    },
    //增删改鼠标移入移出隐藏显示
    //鼠标移入
    // onMouseOver: function (event) {
    //   console.log(event)
    //   this.dropflag = true;
    //   event.target.parentElement.querySelector(
    //     ".comp-tr-node--btns"
    //   ).style.cssText += "display:block";
    //   this.currentEle = event.target.parentElement.querySelector(
    //     ".comp-tr-node--btns"
    //   );
    // },
    //鼠标移出
    // onMouseOut: function (event) {
    //   console.log(event)
    //   if (this.dropdownShow) return;
    //   event.target.parentElement.querySelector(
    //     ".comp-tr-node--btns"
    //   ).style.cssText += "display:none";
    // },
    //新增一级目录模块点击事件
    handleNewMoudle() {
      this.data.push({
        id: id++,
        label: "未命名用例",
        type: "case",
        children: [],
        isEdit: true,
      });
    },
    //新增按钮
    append(node, data) {
      this.stepdialogFormVisible = true;
      this.currentnode = node;
      this.currentdata = data;
    },
    //提交步骤
    confirmstep(){

      var node = this.currentnode;
      var data = this.currentdata;
      this.stepdialogFormVisible = false;

      if (node.level >= this.MAX_LEVEL) {
        this.$message.warning(
          "当前目录已达到" + this.MAX_LEVEL + "级，无法新增！"
        );
        return false;
      }
      //新定义一个对象
      var stepname = this.stepform.name;
      this.stepform.name = '未命名步骤';
      const newChild = {
        id: id++,
        label: stepname,
        type: "step",
        children: [],
        isEdit: false,
      };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
      //新增子节点到3级
      console.log(node, data);
      // this.$refs.tree.setCheckedKeys([id])
      this.$refs.tree.store.nodesMap[data['key']].expanded = true;
      // this.refs.tree.setCurrentNode(node);
      // this.$nextTick(() => {
      //   if (this.$refs["slotTreeInput" + data[this.id]]) {
      //     this.$refs["slotTreeInput" + data[this.id]].$refs.input.focus();
      //   }
      // });
    },
    //删除按钮
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
       
    //编辑按钮
    handleInput(node, data) {
      // 修改节点
      console.log(node, data);
      // 退出编辑状态
      if (data.isEdit) {
        this.$set(data, "isEdit", false);
      }
    },
    handleEdit(node, data) {
      // 编辑节点
      console.log(node, data);
      // 设置编辑状态
      if (!data.isEdit) {
        this.$set(data, "isEdit", true);
      }
 
      // 输入框聚焦
      this.$nextTick(() => {
        if (this.$refs["slotTreeInput" + data[this.id]]) {
          this.$refs["slotTreeInput" + data[this.id]].$refs.input.focus();
        }
      });
    },
 
    //拖拽点击事件
    handleDragStart(node, ev) {
      console.log("drag start", node,ev);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label,ev);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: ", dropNode.label,ev);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label,ev);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType,ev);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType,ev);
    },
    //拖拽点击事件
    allowDrop(draggingNode, dropNode, type) {
        console.log(draggingNode, dropNode, type);
      // if (dropNode.data.label === "二级 3-1") {
      //   return type !== "inner";
      // } else {
      //   return true;
      // }
    },
    allowDrag(draggingNode) {
      console.log(draggingNode)
      // return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    },
    // 折叠所有节点
    setAllFold() {
      this.expand_all = false;
      for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
        this.$refs.tree.store._getAllNodes()[i].expanded = false;
      }
    },
    // 展开所有节点
    setAllExpand() {
      this.expand_all = true;
      for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
        this.$refs.tree.store._getAllNodes()[i].expanded = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.selectcase{
  display:flex;
  justify-content: center;
  align-items: center;
}
.main{
  display: flex;
  .content{
    margin-left:10px;
    width:100%;
    .header{
      span{
        font-size:13px;
        margin-right:40px;
      }
    }
  }
}
#left{
    width:300px;
    border:1px solid #c0c4cc;
    // min-height: 100px;
    #suiteinfo{
      font-size:9px;
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid #c0c4cc;
      div{
        padding:5px;
        display: flex;
        justify-content: space-between;
      }
    }
    .custom-tree-container{

      max-height: 300px;
      overflow: auto;
    }
}
.allC {
  margin-left: 21px;
  margin-bottom: 5px;
  i {
    color: #c0c4cc;
  }
  .allCase {
    margin-left: 8px;
    color: #606266;
    font-size: 14px;
  }
}
 
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-tree {
  height: 100%;
  .isEdit {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-input {
      width: 100px;
      height: 5px;
    }
  }
}
.el-icon-plus {
  margin: 10px 0 0 22px;
  color: #606266;
  font-size: 14px;
  span {
    margin-left: 10px;
    font-size: 14px;
  }
}
.casecontent{
  .casecontent-header{
    display:flex;
    flex-direction: row;
    justify-content: center;
    
    position: relative;
    span{
      font-weight: 900;
      font-size:20px;
    }
    .savebtn{
      position:absolute;
      right:0px;
    }
  }
}

</style>