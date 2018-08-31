<template>
  <div>
      <el-table :data='sourceData'>
          <slot></slot>
      </el-table>
      <div style="height:12px"></div>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleIndexChange"
          :page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          :current-page="pageIndex"
          layout="total,sizes, prev, pager, next,jumper"
          :total="sourceTotal">
      </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    url: String,
    params: Object
  },
  created: function() {
    this.fetch();
  },
  data: function() {
    return {
      sourceData: [],
      sourceTotal: 100,
      pageIndex: 1,
      pageSize: 20
    };
  },
  methods: {
    handleSizeChange: function(size) {
      this.pageSize = size;
      this.pageIndex = 1;
      this.fetch(this.pageIndex, size);
    },
    handleIndexChange: function(index) {
      this.pageIndex = index;
      this.fetch(index, this.pageSize);
    },
    fetch: function(index, size) {
      var send = this.params || {};
      send.pageIndex = index || 1;
      send.pageSize = size || 20;
      var vm = this;
      fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(send)
      })
        .then(function(res) {
          return res.json();
        })
        .then(function(res) {
          vm.sourceData = res.data;
          vm.sourceTotal = res.total;
        });
    }
  }
};
</script>

