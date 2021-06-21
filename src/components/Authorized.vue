<!-- 权限校验组件  -->
<script>
import { check } from '@/utils/auth'
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  render: (h, ctx) => {
    const { props, scopedSlots } = ctx
    console.log(ctx)
    return check(props.authority) ? scopedSlots.default() : null
  }
}

</script>
<style scoped>
</style>
