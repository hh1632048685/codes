<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="70%" :before-close="clearForm">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类目选择">
          <el-button type="primary" @click="showInnerVisible">类目选择</el-button>
          {{ ruleForm.category }}
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="ruleForm.num"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="ruleForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-button type="primary" @click="uploadImage">上传图片</el-button>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <WangEditor @getWangData="getWangData" ref="wangEditor" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="clearForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
    <!--1. 内弹框-----类目选择的-----  -->
    <el-dialog width="40%" title="类目选择" :visible.sync="innerVisible" append-to-body>
      <GoodTree @getTreeData="getTreeData" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="showTreeData">确 定</el-button>
      </span>
    </el-dialog>
    <!--2.内弹框------ 上传图片的   -->
    <el-dialog width="40%" title="上传图片" :visible.sync="imgInnerVisible" append-to-body>
      <GoodsUpload @showImage="showImage" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="imgInnerVisible=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GoodTree from "./GoodTree";
import GoodsUpload from "./GoodsUpload";
import WangEditor from "./WangEditor";
export default {
  components: {
    GoodTree,
    GoodsUpload,
    WangEditor
  },
  props: {
    title: {
      type: String,
      default: "添加商品"
    },
    rowData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  watch: {
    rowData(val) {
      //延迟加载  this.$nextTick()
      this.$nextTick(() => {
        console.log("监听数据修改了", val);
        this.ruleForm = val;
        //清空富文本编译器
        this.$refs.wangEditor.editor.txt.html(val.descs);
      });
    }
  },
  data() {
    return {
      dialogVisible: false, //外弹框
      innerVisible: false, //内弹框
      imgInnerVisible: false, //内弹框--上传图片的
      treeData: {}, //tree的类目
      ruleForm: {
        id: "",
        category: "", //类目的名称
        cid: "", //类目的标识
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        desc: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { min: 1, message: "至少一件商品", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    showInnerVisible() {
      this.innerVisible = true;
    },
    /**
     * 点击tree返回对应的类目数据
     */
    getTreeData(val) {
      // console.log(val);
      this.treeData = val;
    },
    /**
     * 显示tree数据
     */
    showTreeData() {
      //显示类目
      this.ruleForm.category = this.treeData.name;
      this.ruleForm.cid = this.treeData.cid;

      this.innerVisible = false; //关闭内弹框
    },
    /**
     * 点击按钮，显示上传图片
     */
    uploadImage() {
      this.imgInnerVisible = true;
    },
    /**
     * 回显照片
     */
    showImage(val) {
      this.ruleForm.image = val;
    },
    /**
     * 富文本编译数据
     */

    getWangData(val) {
      // console.log('富文本编译数据',val);
      this.ruleForm.desc = val;
    },
    /**
     * 提交按钮---添加商品
     * 参数： title cid  category sellPoint price num desc paramsInfo image
     */
    submitForm() {
      //参数赋值给ruleForm
      let {
        title,
        cid,
        category,
        sellPoint,
        price,
        num,
        desc,
        image,
        id,
      } = this.ruleForm;
      //判确定按钮功能：添加商品 --修改商品
      if (this.title == "添加商品") {
        this.$api
          .getAddProduct({
            title,
            cid,
            category,
            sellPoint,
            price,
            num,
            desc,
            image
          })
          .then(res => {
            console.log("-----", res);
            if (res.status === 200) {
              this.$message({
                message: "恭喜你，添加成功",
                type: "success"
              });
              //添加成功
              // this.dialogVisible = false; //隐藏弹框
              this.clearForm();
              //刷新商品列表--操作父元素里面方法
              this.$parent.http(1);
            } else {
              this.$message.error("错了哦，添加商品失败了");
            }
          });
      } else {
        console.log("编辑商品");
        this.$api
          .updateProduct({
            id,
            title,
            cid,
            category,
            sellPoint,
            price,
            num,
            desc,
            image
          })
          .then(res => {
            console.log(res, "99999999");
            if (res.status === 200) {
              this.$message({
                message: "恭喜你，修改成功消息",
                type: "success"
              });
              this.clearForm();
              //刷新商品列表--操作父元素里面方法
              this.$parent.http(1);
            } else {
              this.$message.error("错了哦，添加商品失败了");
            }
          });
      }
    },
    /**
     * 清空表单
     */
    clearForm() {
      console.log("------");
      this.dialogVisible = false; //隐藏弹框
      //清空表单数据 1.初始化ruleForm 2.element-ui提供的重置
      this.ruleForm = {
        category: "", //类目名称
        cid: "", //类目标识
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        desc: ""
      };
      //单独清空富文本编译器 editor.txt.clear() 清空编辑器内容
      this.$refs.wangEditor.editor.txt.clear();
    }
  }
};
</script>

<style>
</style>