<template>
  <div class="app-container">
    <el-button
      type="primary"
      @click="onAddBook"
    >添加读者</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="读者姓名"
        width="180"
      />
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
      />
      <el-table-column
        prop="phone"
        label="联系电话"
        width="180"
      />
      <el-table-column
        prop="address"
        width="180"
        label="地址"
      />
      <el-table-column
        prop="join_date"
        label="注册日期"
        width="180"
      />

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
            @onConfirm="onDelect(scope.row.reader_id)"
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
import { allReader, delReader } from '@/api/reader'
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
      const res = await allReader(this.searchForm)
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
    async onDelect(reader_id) {
      await delReader({
        reader_id
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

