<template>
  <el-dialog
    :title="type === 'edit' ? '修改分类' : '新增分类'"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose"
    :destroy-on-close="true"
  >
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="分类名称" prop="category_name">
        <el-input v-model="form.category_name" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addCategory as addBook, updateCategory as updateBook } from '@/api/category'

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
      type: '',
      form: {
        category_name: '',
        description: ''
      },
      rules: {
        category_name: [{ required: true, message: '请输入', trigger: 'blur' }],
        description: [{ required: true, message: '请输入', trigger: 'blur' }]
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
    }
  },
  created() {
    if (this.data.category_id) {
      this.form = Object.assign({}, this.form, this.data)
      this.type = 'edit'
    }
  },
  methods: {
    async onSubmit() {
      await this.$refs.form.validate()
      const fn = this.type === 'edit' ? updateBook : addBook
      await fn(this.form)

      this.$message({
        message: this.type === 'edit' ? '修改成功' : '新增成功',
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
