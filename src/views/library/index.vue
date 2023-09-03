<template>
  <div class="app-container">
    <el-button
      type="primary"
      @click="onAddBook"
    >添加图书</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="title"
        label="书籍标题"
        width="180"
      />
      <el-table-column
        prop="author"
        label="作者"
        width="180"
      />
      <el-table-column
        prop="publisher"
        label="出版社"
        width="180"
      />
      <el-table-column
        prop="publish_date"
        width="180"
        label="出版日期"
      />
      <el-table-column
        prop="ISBN"
        label="国际标准书号"
        width="180"
      />
      <el-table-column
        prop="category"
        label="图书分类"
        width="180"
      />
      <el-table-column
        prop="description"
        label="书籍描述"
        width="180"
      />
      <el-table-column
        prop="status"
        label="借阅状态"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.status === '借出'"
            type="danger"
          >{{ scope.row.status }}</el-tag>
          <el-tag
            v-else-if="scope.row.status === '在库'"
            type="success"
          >{{ scope.row.status }}</el-tag>
          <el-tag v-else>{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="180"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            class="btn"
            size="mini"
            @click="handleEdit(scope.row)"
          >编辑</el-button>

          <el-popconfirm
            title="确认删除"
            @onConfirm="onDelect(scope.row.book_id)"
          >
            <el-button
              slot="reference"
              size="mini"
              type="danger"
            >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="searchForm.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="all"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <addBook
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :data="data"
      @refesh="getData"
    />
  </div>
</template>

<script>
import { getList, delBook } from '@/api/library'
import addBook from './components/add.vue'
export default {
  components: { addBook },
  data() {
    return {
      tableData: [],
      searchForm: {
        size: 10,
        page: 1
      },
      all: 0,
      dialogVisible: false,
      data: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await getList(this.searchForm)
      this.tableData = res.data.list
      this.all = res.data.all
    },
    // 分页
    handleSizeChange(val) {
      this.searchForm.pageSize = val

      this.getData()
    },
    handleCurrentChange() { },
    onAddBook() {
      this.data = {}
      this.openDialog()
    },
    openDialog() {
      this.dialogVisible = true
    },
    // 编辑
    handleEdit(row) {
      this.data = row

      this.openDialog()
    },
    async onDelect(book_id) {
      await delBook({
        book_id
      })

      this.$message({
        message: '删除成功',
        type: 'success'
      })

      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  margin-right: 12px;
}
</style>
