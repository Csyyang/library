<template>
  <div class="app-container">
    <el-button type="primary" @click="onAddBook">添加分类</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="category_name" label="分类名称" width="180" />
      <el-table-column prop="description" label="描述" width="180" />
      <el-table-column label="操作" width="240" fixed="right">
        <template slot-scope="scope">
          <el-button class="btn" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确认删除" @onConfirm="onDelect(scope.row.category_id)">
            <el-button slot="reference" size="mini" type="danger">删除</el-button>
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

    <addBook v-if="dialogVisible" :visible.sync="dialogVisible" :data="data" @refesh="getData" />

  </div>
</template>

<script>
import { allCategory, delCategory as delBook } from '@/api/category'
import { upBorrowing } from '@/api/borrowing'
import addBook from './components/add.vue'

export default {
  components: { addBook },
  data() {
    return {
      tableData: [],
      lendData: null,
      searchForm: {
        size: 10,
        page: 1
      },
      all: 0,
      dialogVisible: false,
      LendVisible: false,
      data: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await allCategory(this.searchForm)
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
    async onDelect(category_id) {
      await delBook({
        category_id
      })

      this.$message({
        message: '删除成功',
        type: 'success'
      })

      this.getData()
    },
    // 借出、归还
    lend(row) {
      this.LendVisible = true
      this.lendData = row
    },
    async returnBook(row) {
      await upBorrowing({
        book_id: row.book_id
      })
      this.$message({
        message: '归还成功',
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

