<template>
  <div id="home">
    <v-head></v-head>
    <div class="content-wrap clearfix">
      <router-view class="content clearfix" />
      <vue-loading class="fixed-center" v-show="this.$store.state.loading" type="bars" color="#0a74bb" :size="{ width: '50px', height: '50px' }"></vue-loading>
    </div>
  </div>
</template>

<script>
  import vHead from './header.vue';
  export default {
    name: 'Home',
    components: {
			vHead
		},
    methods: {

    }
  }
</script>
