<!--  -->
<template>
  <div>
    <el-container>
      <el-aside :class="{ 'side-close': isCollapse, 'side-all': !isCollapse }">
        <menu-side :isCollapse="isCollapse"></menu-side>
      </el-aside>
      <el-container>
        <el-header>
          <i v-auth="['admin']"
            :class="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
            style="cursor: pointer;"
            @click="isCollapse = !isCollapse"
          ></i>
          <Header></Header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
    <authorized :authority="['admin']">
      <el-button>测试权限</el-button>
    </authorized>
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
import menuSide from './menuSide'
export default {
  name: 'basicLayout',
  data () {
    return {
      isCollapse: false
    }
  },

  components: {
    Header,
    Footer,
    menuSide
  },

  mounted () { },

  methods: {}
}

</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  /* text-align: center; */
  line-height: 60px;
}
.el-footer {
  text-align: center;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  overflow: hidden;
}

.side-all {
  width: 200px !important;
  transition: width 0.5s;
}

.side-close {
  width: 64px !important;
  transition: width 0.5s;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
