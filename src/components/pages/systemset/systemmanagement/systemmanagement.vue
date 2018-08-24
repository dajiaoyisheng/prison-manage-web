<template>
  <div>
    <span>系统管理</span>
    <vue-loading v-show="loading" type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
  </div>
</template>

<script>
export default {
  name: 'systemmanagement',
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
          this.$router.push({path: '/systemmanagement'})
        } else {
          // alert(data.body.errorMessage)
          alert(data.body.body.errorMessage)
        }
      })
    }
  }
}
</script>


