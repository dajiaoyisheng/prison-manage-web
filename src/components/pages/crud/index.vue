<template>
    <div class="crud-w">
      <div class="opt-w">
        <span class="opt-btn add-btn" @click="add()">增加</span>
        <div class="search-box">
          <input type="text" class="search-input">
          <span class="opt-btn">查找</span>
        </div>
      </div>
      <div class="opt-item">
        <div class="name">name</div>
        <div class="phone">phone</div>
      </div>
      <div class="opt-item" style="margin-top:0" v-for="item in infoList" :key="item.id">
        <!--<div class="name">{{item.username}}</div>-->
        <!--<div class="phone">{{item.phone}}</div> -->
        <div class="name">{{item.name}}</div>
        <div class="phone">{{item.passwd}}</div>
        <div class="modify">
          <span class="opt-btn" @click="modifyopt(item)">modify</span>
        </div>
        <div class="del">
          <span class="opt-btn" @click="del(item)">del</span>
        </div>
      </div>
      <div class="model-w" v-if="addDialog">
        <div class="model">
          <div class="input-w">
            <label class="label">name：</label>
            <input class="input-item" type="text" v-model="addData.username" autocomplete="false">
          </div>
          <div class="input-w">
            <label class="label">phone：</label>
            <input class="input-item" type="text" v-model="addData.phone" autocomplete="false">
          </div>
          <div class="input-w">
            <span v-if="!modify" class="opt-btn" @click="addRemote()">提交</span>
            <span v-if="modify" class="opt-btn" @click="modifyRemote()">提交</span>
          </div>
        </div>
      </div>
      <div class="model-w" v-show="loading" style="z-index:111">
        <vue-loading style="margin-top:120px" v-show="loading" type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
      </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      loading: false,
      infoList: [],
      addDialog: false,
      addData: {},
      modify: false
    }
  },
  mounted () {
    this.loading = true
    provider.getList(this).then(function (res) {
      console.log(res)
      this.loading = false
      if (res.body.header.status === 1) {
        this.infoList = res.body.body.data.content
      }
    })
  },
  methods: {
    add () {
      this.addDialog = true
      this.modify = false
    },
    addRemote () {
      this.loading = true
      provider.addList(this, '/add', this.addData).then(function (res) {
        console.log(res)
        this.loading = false
        if (res.body.header.status === 1) {
          this.addDialog = false
          this.addData = {}
          this.infoList = res.body.body
        }
      })
    },
    modifyopt (item) {
      this.addDialog = true
      this.addData = Object.assign({}, item)
      this.modify = true
    },
    modifyRemote () {
      this.loading = true
      provider.editList(this, '/edit', this.addData).then(function (res) {
        console.log(res)
        this.loading = false
        if (res.body.header.status === 1) {
          this.addDialog = false
          this.addData = {}
          this.infoList = res.body.body
        }
      })
    },
    del (item) {
      this.loading = true
      provider.deleteItem(this, '/delete', item).then(function (res) {
        console.log(res)
        this.loading = false
        if (res.body.header.status === 1) {
          this.addDialog = false
          this.addData = {}
          this.infoList = res.body.body
        }
      })
    }
  }
}
</script>
