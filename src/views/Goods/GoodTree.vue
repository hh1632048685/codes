<template>
  <el-tree :props="props" :load="loadNode" lazy @node-click="handleNodeClick">
  </el-tree>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
    };
  },
  methods: {
      //获取点击的node的界面的数据--发送给弹框
    handleNodeClick(data) {
      // console.log(data);
      //吧点击的tree的数据添加到类目选择 --传值子组件传给父组件 1.自定义事件
      this.$emit('getTreeData', data);
    },
    //懒加载
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.selectCategory().then((res) => {
          // console.log(res);
          if (res.status === 200) {
            return resolve(res.result);
          }
        });
      } else {
        this.$api
          .selectCategory({
            id: node.data.cid,
          })
          .then((res) => {
            // console.log(res);
            if (res.status === 200) {
              return resolve(res.result);
            } else {
              return resolve([]);
            }
          });
      }
    },
  },
};
</script>

<style>
</style>