<template>
  <el-tree ref="tree" :data="treeData" node-key="id" @node-click="handleNodeClick" :default-expand-all="defaultExpandAll" :expand-on-click-node="false" :check-on-click-node="true" :check-strictly="true" @node-drag-end="handleDragEnd" @node-drag-enter="handleDragEnter" :draggable="draggable" :allow-drop="allowDrop" :allow-drag="allowDrag">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span> <i :class="node.icon"></i>{{ node.label }}</span>
      </span>
    </el-tree>
</template>
<script>
export default {
    props: {
      draggable: {
        type: Boolean,
        default: false
      },
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
      },
      allowDrop(draggingNode, dropNode, type) {
        this.$emit('allow-drop', draggingNode, dropNode, type);
      },
      allowDrag(draggingNode) {
        return this.$emit('allow-drag', draggingNode);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        this.$emit('handle-drag-end', draggingNode, dropNode, dropType, ev);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        this.$emit('handle-drag-enter', draggingNode, dropNode, ev);
      },
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


