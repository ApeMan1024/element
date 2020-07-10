<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书借阅</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 表单 -->
      <el-row type="flex" justify="center">
        <el-form :inline="true">
          <el-form-item>
            <el-input
              placeholder="图书信息"
              autocomplete
              v-model="bookinfo"
              @keydown.native.enter="searchbook"
            >
              <el-button slot="append" icon="el-icon-search" @click="searchbook"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </el-row>

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
        <el-table-column prop="pressmark" label="图书数量"></el-table-column>
        <el-table-column prop="state" label="允许借出">
          <template v-slot="{ row }">
            <el-button v-if="row.state===1" type="primary" @click="borrowbook(row.book_id)">借阅</el-button>
            <el-button v-else type="primary" disabled>借阅</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页  -->
      <!-- 
        total:总条数
        page-size：每一页显示的条目
        page-size：当前页数

      -->
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="currentChange"
        @size-change="sizeChange"
        v-show="bool"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      SelectTableData: [],
      //当前页面
      currentPage4: 1,
      //页面显示的条数
      pageSize: 10,
      //总共的条目数
      total: 18,

      //图书信息
      bookinfo: "",

      //控制是否显示分页
      bool: true
    };
  },

  async created() {
    //获取图书信息
    this.getBookInfo();

    console.log(123)
  },
  methods: {
    //监听页码改变
    currentChange(num) {
      this.currentPage4 = num;
      this.getBookInfo();
    },
    //监听页面显示条数改变
    sizeChange(num) {
      this.pageSize = num;
      this.getBookInfo();
    },

    //获取图书信息
    async getBookInfo() {
      let { data: res } = await this.$http.get("bookinfo", {
        params: { currentPage: this.currentPage4, pageSize: this.pageSize }
      });
      if (res.status === 200) {
        this.total = res.total;
        this.SelectTableData = res.data.map(item => item);
      } else {
        this.$message.error("请求数据失败");
      }
    },

    //查询图书信息
    async searchbook() {
      if (this.bookinfo.length !== 0) {
        let { data: res } = await this.$http.get(
          `searchbook?bookinfo=${this.bookinfo}`
        );
        if (res.status === 200) {
          if (res.data.length === 0) return this.$message.info("图书不存在");
          else {
            this.SelectTableData = [...res.data];
            this.bool = false;
          }
        }
      } else {
        this.$message.info("请输入内容");
      }
    },

    //借阅图书
    async borrowbook(book_id) {
      let {data:res} = await this.$http.get("/borrowbook", {
        params: { book_id }
      });

      if(res.status===200){
        if(res.data)return this.$message.success("借阅成功")
      }
      this.$message.error("借阅失败")
      
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
  },

  watch: {
    bookinfo(newData, worn) {
      if (newData.length === 0) {
        this.getBookInfo();
        this.bool = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-input {
  width: 400px;
}
</style>