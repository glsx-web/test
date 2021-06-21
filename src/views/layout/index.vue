<!-- 主页 -->
<template>
  <div>
    <child>
      <p style="color:red;">默认插槽111</p>
      <template v-slot="mySlot">父组件的mySlot1，未使用slot-scope</template>
      <template v-slot:header="{ value, value2 }">{{value}}{{value2}}</template>
      <!-- <p slot="mySlot">父组件的mySlot2，未使用slot-scope</p> -->
      <!-- <span
        slot="header"
        slot-scope="scope"
      >{{scope.value2}}</span> -->
      <!-- <span
        slot="header"
        slot-scope="scope"
      >
        <li
          v-for="(item, index) in scope.value"
          :key="index"
        >{{item.id}}</li>
      </span>
      <span slot="header">111</span> -->
      <!-- <span slot="header">222</span> -->
    </child>
    <p>{{userInfo.name}}</p>
    <button @click="updateName">修改userInfo</button>
  </div>
</template>

<script>
import child from './child'
export default {
  name: 'layout',
  data () {
    return {
      userInfo: { }
    }
  },

  components: {
    child
  },
  methods: {
    updateName () {
      // this.$set(this.userInfo, 'name', '小红')
      this.userInfo.name = '小红'
      console.log(this.userInfo)
      this.$forceUpdate()
    }
  }
}

</script>
<style scoped>
</style>
