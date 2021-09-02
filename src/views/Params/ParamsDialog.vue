<template>
  <div>
    <el-dialog
      title="商品规格参数类目选择"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <GoodTree @getTreeData="getTreeData" />

      <!------------------------ 内弹框 ------------------>
      <el-dialog width="45%" title="商品规格参数配置" :visible.sync="innerVisible" append-to-body>
        <el-form
          :model="dynamicValidateForm"
          ref="dynamicValidateForm"
          label-width="100px"
          class="demo-dynamic"
        >
          <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="'域名' + index"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            >
            <el-input v-model="domain.value"></el-input>
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
            <el-button @click="addDomain">新增域名</el-button>
            <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="isShow" @click="innerVisible = true">确 定并添加分组</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GoodTree from "../Goods/GoodTree";
export default {
  components: {
    GoodTree
  },
  data() {
    return {
      dialogVisible: false,
      isShow: true, //禁止
      innerVisible: false,
      dynamicValidateForm: {
        //动态表单数据
        domains: [{
            value: ""
          },{
            value:""
          }]
      } 
    }
  },
  methods: {
    //关闭按钮
    handleClose() {
      this.dialogVisible = false;
    },
    /**
     * 点击tree传递tree数据
     */
    getTreeData(val) {
      //  console.log("======", val);
      //按钮可以点击
      this.isShow = false;
    },
    //动态表单事件------------------------------
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now()
      });
    }
  }
};
</script>

<style>
</style>