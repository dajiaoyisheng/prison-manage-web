<template>
  <div>
    <v-tree :tree-data="Prisonareatree" v-on:handle-node-click="handleNodeClick"></v-tree>
  </div>
</template>

<script>
  import vTree from '@/components/commons/tree.vue';
  export default {
    name: 'tvmonitor',
    components: {
			vTree
    },
    data() {
      return {
        Prisonareatree: []
      }
    },
    created: function() {
      var _this = this;
      // 犯人总数
      this.$ajxj.get('/getPrisonareatree')
        .then(function (res) {
          _this.Prisonareatree = res.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    }
  }

</script>
