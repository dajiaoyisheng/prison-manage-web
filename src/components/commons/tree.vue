<template>
  <el-tree :data="treeData" node-key="id" @node-click="handleNodeClick" default-expand-all :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span> <i :class="node.icon"></i>{{ node.label }}</span>
      </span>
    </el-tree>
</template>
<script>
export default {
    props: {
      treeData: {
        type: Array,
        default () {
          return {
            items: []
          }
        }
      }
    },
    methods: {
      handleNodeClick(data, checked, indeterminate) {
        this.$emit('handle-node-click', data, checked, indeterminate);
      }
    }
  };
</script>
<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>


