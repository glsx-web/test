<!--  -->
<template functional>
  <el-submenu :index="props.menuInfo.path">
    <template slot="title">
      <i
        v-if="props.menuInfo.meta.icon"
        :class="'el-icon-' + props.menuInfo.meta.icon"
      ></i>
      <span>{{props.menuInfo.meta.title}}</span>
    </template>
    <template v-for="subItem in props.menuInfo.children">
      <el-menu-item
        v-if="!subItem.children"
        :key="subItem.path"
        :index="subItem.path"
      >
        <i
          v-if="subItem.meta.icon"
          :class="'el-icon-' + subItem.meta.icon"
        ></i>
        <span slot="title">{{subItem.meta.title}}</span>
      </el-menu-item>
      <sub-menu
        v-else
        :key="subItem.path"
        :menuInfo="subItem"
      ></sub-menu>
    </template>
  </el-submenu>
</template>

<script>
export default {
  props: ['menuInfo']
  // functional: true,
  // render: (h, ctx) => {
  //   console.log(ctx)
  //   return h('el-button', {
  //     props: {
  //       type: 'primary'
  //     },
  //     style: {
  //       fontSize: '14px',
  //       color: 'pink'
  //     },
  //     on: {
  //       click: () => { console.log('++++') }
  //     }
  //   }, ['啦啦啦'])
  // }
}

</script>
