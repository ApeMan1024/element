<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书借阅</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 展示数据 -->
      <el-table :data="SelectTableData" style="width: 100%" stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="book_id" label="图书编号"></el-table-column>
        <el-table-column prop="name" label="图书名称" width="200px"></el-table-column>
        <el-table-column prop="author" label="图书作者"></el-table-column>
        <el-table-column prop="publish" label="图书出版社" width="200px"></el-table-column>
        <el-table-column prop="language" label="语言类型"></el-table-column>
        <el-table-column prop="price" label="图书价格"></el-table-column>
        <el-table-column prop="pubdate" label="出版日期">
          <template slot-scope="{row}">{{row.pubdate|format}}</template>
        </el-table-column>
        <el-table-column prop="lend_date" label="借阅时间">
          <template slot-scope="{row}">{{row.pubdate|format}}</template>
        </el-table-column>
        <el-table-column label="图书归还">
          <template v-slot="{row}">
            <el-button type="primary" @click="backbook(row)">归还</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      SelectTableData: []
    };
  },
  created() {
    this.getLendBook();
  },
  methods: {
    //获取借阅图书信息
    async getLendBook() {
      let { data: res } = await this.$http.get("back");
      if (res.status === 200) {
        if (res.data.length != 0) {
          this.SelectTableData = [...res.data];
        } else {
          this.$message.info("欢迎借阅图书");
        }
      }
    },

    async backbook(bookinfo) {
      let { data: res } = await this.$http.get("/backbook", {
        params: { bookinfo: bookinfo.book_id }
      });
      if (res.status === 200) {
        if (res.success) {
          this.getLendBook();
          return this.$message.success("归还成功");
        }
      }
      this.$message.error("归还失败");
    }
  },
  filters: {
    // 格式化时间
    format(s) {
      let date = new Date(s);
      let year = (date.getFullYear() + "").padStart("0", 4);
      let month = (date.getMonth() + 1 + "").padStart("0", 2);
      let data = (date.getDate() + "").padStart("0", 2);
      return `${year}-${month}-${data}`;
    }
  }
};
</script>
<style lang="less">
</style>