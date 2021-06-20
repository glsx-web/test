<!--  -->
<template>
  <div>
    <slot></slot>
    <!-- <slot style="color:blue;">这是在slot上添加了样式</slot> -->
    <slot name="mySlot" scope="mySlot">这是拥有命名的slot的默认内容</slot>
    <slot name="header" :value="value" :value2="value2">kkk</slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [{
        id: 1
      }, {
        id: 2
      }],
      value2: {
        name: 'ccc'
      }
    }
  },

  // 依赖注入
  inject: ['msg', 'getMsg'],

  components: {},

  computed: {},

  mounted() {
    // console.log(this.msg)
    this.getMsg()
  },

  methods: {}
}

</script>
<style scoped>
</style>
