<template>
  <el-tree ref="tree" :data="treeData" node-key="id" @node-click="handleNodeClick" :default-expand-all="defaultExpandAll" :expand-on-click-node="false" :check-on-click-node="true" :check-strictly="true">
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
      },
      defaultExpandAll: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      handleNodeClick(data, checked, indeterminate) {
        this.$emit('handle-node-click', data, checked, indeterminate);
      },
      getCheckedKeys() {
        return this.$refs.tree.getCheckedKeys();
      },
      getCurrentNode() {
        return this.$refs.tree.getCurrentNode();
      },
      append(data, parentNode) {
        return this.$refs.tree.append(data, parentNode);
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


