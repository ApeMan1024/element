<template>
  <el-container class="index-container">
    <el-header>
      <el-row>
        <el-col :span="1">
          <p class="head_img">
            <img src="../../assets/tushu.jpg" alt width="50" />
          </p>
        </el-col>
        <el-col :span="3">
          <p class="title">图书管理系统</p>
        </el-col>
      </el-row>
      <el-button type="primary" @click="quit">退出</el-button>
    </el-header>
    <el-container>
      <!-- 左侧菜单栏 -->
      <el-aside width="200px">
        <!-- 
            background-color菜单的背景颜色
            text-color菜单的字体颜色
            default-active被激活菜单的index
        -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          :default-active="activePath"
          router
          unique-opened
          v-for="(item,index) in menulist"
          :key="item.id"
          @select="select"
        >
          <el-menu-item :index="item.activePath">
            <i :class="menuCode[index]"></i>
            <span slot="title">{{item.menuname}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      // 菜单列表
      menulist: [
        { menuname: "图书信息查询", activePath: "/index/select", id: 1 },
        { menuname: "图书归还", activePath: "/index/back", id: 2 },
        { menuname: "图书借阅", activePath: "/index/borrow", id: 3 }
        
      ],
      menuCode: [
        "el-icon-menu",
        "el-icon-document",
        "el-icon-setting"
        
      ],
      //当前被激活的菜单选项
      activePath: ""
    };
  },
  methods:{
    // 用户退出
    quit(){
      sessionStorage.setItem("token","")
      this.$router.push("/login")
    },
    select(index,indexPath){
      this.activePath=index
    }
  }
};
</script>

<style lang="less" scoped>
.index-container {
  height: 100%;
}
.el-header {
  display: flex;
  align-items: center;
  background: rgba(53, 73, 94, 1);
  .head_img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0px;
    img {
      border-radius: 50%;
    }
  }
}
.el-row {
  width: 100%;
  .title {
    color: azure;
  }
}
.el-aside {
  background: #333744;
  .el-menu {
    border-right: none;
  }
}
</style>