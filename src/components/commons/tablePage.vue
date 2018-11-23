<template>
  <div>
    <ul class="paging-ul" v-if="total">
      <!-- prev -->
      <li :class="['paging-item', 'paging-item--prev', {'paging-item--disabled' : index === 1}]" @click="prev">
        <img class="ver-align" :src="prevPage" alt="">
      </li>

      <!-- first -->
      <li :class="['paging-item', 'paging-item--first', {'paging-item--disabled' : index === 1}]" v-if="showPrevMore"
        @click="first">1</li>

      <li :class="['paging-item', 'paging-item--more']" v-if="showPrevMore">&middot;&middot;&middot;</li>

      <li :class="['paging-item', {'paging-item--current' : index === pager}]" v-for="pager in pagers" :key="pager"
        @click="go(pager)">{{
        pager }}</li>

      <li :class="['paging-item', 'paging-item--more']" v-if="showNextMore">&middot;&middot;&middot;</li>

      <!-- last -->
      <!-- <li :class="['paging-item', 'paging-item--last', {'paging-item--disabled' : index === pages}]" @click="last">last</li> -->

      <!-- next -->
      <li :class="['paging-item', 'paging-item--next', {'paging-item--disabled' : index === pages}]" @click="next">
        <img class="ver-align" :src="nextPage" alt="">
      </li>
      <li class="gotoPage">
        <input class="paging-item-input" v-model="gotoPage" @keyup.enter="go(gotoPage)" type="text">
        <span @click="go(gotoPage)">确定</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import prevPage from '@/assets/prev.png';
  import nextPage from '@/assets/next.png';
  export default {
    name: 'tablePagination',

    data() {
      return {
        index: this.pageIndex, //当前页码
        limit: this.pageSize, //每页显示条数
        size: this.total || 1, //总记录数
        showPrevMore: false,
        showNextMore: false,
        nextPage: nextPage,
        prevPage: prevPage,
        gotoPage: null
      }
    },
    //通过props来接受从父组件传递过来的值
    props: {

      //页面中的可见页码，其他的以...替代, 必须是奇数
      perPages: {
        type: Number,
        default: 5
      },

      //当前页码
      pageIndex: {
        type: Number,
        default: 1
      },

      //每页显示条数
      pageSize: {
        type: Number,
        default: 10
      },

      //总记录数
      total: {
        type: Number,
        default: 1
      },

    },
    methods: {
      prev() {
        if (this.index > 1) {
          this.go(this.index - 1)
        }
      },
      next() {
        if (this.index < this.pages) {
          this.go(this.index + 1)
        }
      },
      first() {
        if (this.index !== 1) {
          this.go(1)
        }
      },
      last() {
        if (this.index != this.pages) {
          this.go(this.pages)
        }
      },
      go(page) {
        let re = /^\d+$/;
        if (!re.test(page)) {
          this.$message.error('请输入有效页数');
          this.gotoPage = "";
          return
        }
        // page = Number(page);
        if (page > this.pages) {
          this.$message.error('超出最大页码数');
        } else if(page < 1){
          this.$message.error('请输入有效页数');
        } else {
          this.index = page;
          //父组件通过change方法来接受当前的页码
          this.$emit('change', this.index);
          this.gotoPage = null;
        }
      }
    },
    computed: {

      //计算总页码
      pages() {
        return Math.ceil(this.size / this.limit)
      },

      //计算页码，当count等变化时自动计算
      pagers() {
        const array = []
        const perPages = this.perPages
        const pageCount = this.pages
        let current = this.index
        const _offset = (perPages - 1) / 2
        const offset = {
          start: current - _offset,
          end: current + _offset
        }

        //-1, 3
        if (offset.start < 1) {
          offset.end = offset.end + (1 - offset.start)
          offset.start = 1
        }
        if (offset.end > pageCount) {
          offset.start = offset.start - (offset.end - pageCount)
          offset.end = pageCount
        }
        if (offset.start < 1) offset.start = 1

        this.showPrevMore = (offset.start > 1)
        this.showNextMore = (offset.end < pageCount)

        for (let i = offset.start; i <= offset.end; i++) {
          array.push(i)
        }

        return array
      }
    },
    watch: {
      pageIndex(val) {
        this.index = val || 1
      },
      pageSize(val) {
        this.limit = val || 10
      },
      total(val) {
        this.size = val || 1
      },
    }
  }

</script>
<style scoped>
  .paging-ul {
    display: inline-block;
    padding: 0;
    margin: 1rem 0;
    font-size: 0;
    list-style: none;
    user-select: none;
  }

  .ver-align {
    vertical-align: sub;
  }

  .paging-ul .paging-item {
    display: inline;
    font-size: 14px;
    position: relative;
    padding: 6px 12px;
    line-height: 1.42857143;
    text-decoration: none;
    background-color: #fff;
    margin-left: -1px;
    cursor: pointer;
  }

  .paging-ul .paging-item:first-child {
    margin-left: 0;
  }

  .paging-ul .paging-item:hover {
    background-color: #f0f0f0;
    color: #0275d8;
  }

  .paging-ul .paging-item.paging-item--disabled,
  .paging-ul .paging-item.paging-item--more {
    background-color: #fff;
    color: #505050;
  }

  /* //禁用 */
  .paging-ul .paging-item.paging-item--disabled {
    cursor: not-allowed;
    opacity: .75;
  }

  .paging-ul .paging-item.paging-item--more,
  .paging-ul .paging-item.paging-item--current {
    cursor: default;
  }

  /* //选中 */
  .paging-ul .paging-item.paging-item--current {
    /* background-color: #0275d8; */
    color: #0275d8;
    position: relative;
    z-index: 1;
    /* border-color: #0275d8; */
  }

  li.gotoPage {
    display: inline;
    font-size: 14px;
    position: relative;
    padding: 6px 12px;
    line-height: 1.42857143;
    text-decoration: none;
    /* border: 1px solid #ccc; */
    background-color: #fff;
    margin-left: -1px;
    cursor: pointer;
  }

  .paging-item-input {
    height: 32px;
    line-height: 32px;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    /* height: 40px; */
    /* line-height: 40px; */
    outline: 0;
    padding: 0 10px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 45px;
  }

</style>
