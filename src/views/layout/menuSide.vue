<!--  -->
<template>
  <div>
    <el-menu
      :default-active="defaultActice"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :unique-opened="true"
      @select="handleSelect"
    >
      <template v-for="item in menuData">
        <el-menu-item
          v-if="!item.children"
          :key="item.path"
          :index="item.path"
        >
          <i
            v-if="item.meta.icon"
            :class="'el-icon-' + item.meta.icon"
          ></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
        <sub-menu
          v-else
          :key="item.path"
          :index="item.path"
          :menuInfo="item"
        ></sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {
  check
} from '@/utils/auth'
import subMenu from './subMenu'
export default {
  name: 'menuSide',
  data () {
    return {
      menuData: [],
      defaultActice: ''
    }
  },

  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    '$route.matched': {
      handler (val) {
        // console.log(val)
        this.defaultActice = val[val.length - 1].path
      },
      immediate: true
    }
  },

  components: {
    subMenu
  },

  mounted () {
    this.menuData = this.getMenuData(this.$router.options.routes)
  },

  methods: {
    getMenuData (routes) {
      const menuData = []
      for (let item of routes) {
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          break
        }
        // console.log(item)
        if (item.name && !item.hideMenu) {
          const newItem = { ...item }
          delete newItem.children
          if (!item.hideChildrenMenu && item.children) {
            newItem.children = this.getMenuData(item.children)
          }
          menuData.push(newItem)
        } else if (!item.hideMenu && !item.hideChildrenMenu && item.children) {
          menuData.push(...this.getMenuData(item.children))
        }
      }
      // console.log(menuData)
      return menuData
    },
    handleSelect (index, indexPath) {
      this.$router.push({ path: index })
      this.defaultActice = index
    }
  }
}

</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
