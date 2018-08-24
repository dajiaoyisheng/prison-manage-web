<template>
  <div>
    <input type="password" style="position:absolute;left:-99999999999px">
    <div class="input-w">
      <label class="label">用户名：</label>
      <input class="input-item" type="text" v-model="formData.name" autocomplete="false">
    </div>
    <div class="input-w">
      <label class="label">密码：</label>
      <input class="input-item" type="password" v-model="formData.passwd" autocomplete="false">
    </div>
    <div class="input-w">
      <span class="opt-btn" @click="submit()">提交</span>
    </div>
    <vue-loading v-show="loading" type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loading: false,
      formData: {
        name: '',
        passwd: ''
      }
    }
  },
  methods: {
    submit () {
      this.loading = true
      provider.login(this, this.formData).then(data => {
      // provider.login(this, {UserPo: this.formData}).then(data => {
        this.loading = false
        if (data.body.header.status === 1) {
          localStorage.setItem('token', data.body.body.token)
          console.log(localStorage.getItem('token'))
          localStorage.setItem('userInfo', JSON.stringify(data.body.userInfo))
          this.$router.push({path: '/crud'})
        } else {
          // alert(data.body.errorMessage)
          alert(data.body.body.errorMessage)
        }
      })
    }
  }
}
</script>

