<template>
    <div class="container-v">
      <form id="#form1">
        <table class="new-manage-table">
          <tbody>
          <tr v-for="(i,index) in configData">
            <td style="width: 25%">{{i.displayName}}</td>
            <td style="width: 10%">{{i.defaultValue}}</td>
            <td style="width: 10%">
              <input data-rule="required" class="input edit-input" v-bind:id="'config-'+index" type="text" v-model="i.value"/>
            </td>
            <td style="width: 50%">{{i.decription}}</td>
          </tr>
          </tbody>
        </table>
      </form>
      <button @click="saveIt()">保存</button>
    </div>
</template>

<script>
export default {
  name: "validate",
  data () {
    return {
      configData: []
    }
  },
  mounted () {
    console.log(provider)
    provider.getConfig(this, {}).then(data => {
      console.log(data)
    })
  }
}
</script>

