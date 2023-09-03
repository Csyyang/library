<template>
  <el-dialog
    title="借出"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose"
    :destroy-on-close="true"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item
        label="选择读者"
        prop="reader_id"
      >
        <el-select
          v-model="form.reader_id"
          placeholder="请选择"
        >
          <el-option
            v-for="item in tableData"
            :key="item.reader_id"
            :label="item.name"
            :value="item.reader_id"
          />
        </el-select>
      </el-form-item>

    </el-form>

    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="onSubmit"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { allReader } from '@/api/reader'
import { addBorrowing } from '@/api/borrowing'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      searchForm: {
        size: 1000,
        page: 1
      },
      tableData: [],
      type: '',
      form: {
        reader_id: ''
      },
      rules: {
        reader_id: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    dataCom() {
      return this.data
    }
  },
  created() { this.getData() },
  methods: {
    async getData() {
      const res = await allReader(this.searchForm)
      this.tableData = res.data.list
    },
    async onSubmit() {
      await this.$refs.form.validate()
      await addBorrowing(this.form)

      this.$message({
        message: '借出成功',
        type: 'success'
      })
      this.$emit('refesh')
      this.dialogVisible = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
  }
}
</script>

