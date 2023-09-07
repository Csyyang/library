<template>
  <el-dialog
    :title="type === 'edit' ? '修改图书' : '新增图书'"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose"
    :destroy-on-close="true"
  >
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="书籍标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>

      <el-form-item label="作者" prop="author">
        <el-input v-model="form.author" />
      </el-form-item>

      <el-form-item label="出版社" prop="publisher">
        <el-input v-model="form.publisher" />
      </el-form-item>

      <el-form-item label="出版日期" prop="publication_date">
        <el-date-picker v-model="form.publication_date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" />
      </el-form-item>

      <el-form-item label="国际标准书号" prop="isbn">
        <el-input v-model="form.isbn" />
      </el-form-item>
      <el-form-item label="call_number" prop="call_number">
        <el-input v-model="form.call_number" />
      </el-form-item>

      <el-form-item label="图书分类" prop="category_id">
        <el-select v-model="form.category_id" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.category_id"
            :label="item.category_name"
            :value="item.category_id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="可借阅数" prop="copies_available">
        <el-input v-model="form.copies_available" />
      </el-form-item>

      <el-form-item label="库存" prop="copies_total">
        <el-input v-model="form.copies_total" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addBook, updateBook } from '@/api/library'
import { allCategory } from '@/api/category'

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
        title: '',
        author: '',
        publisher: '',
        publication_date: null,
        isbn: '',
        call_number: '',
        category_id: '',
        copies_available: '',
        copies_total: ''
      },
      rules: {
        title: [{ required: true, message: '请输入', trigger: 'blur' }],
        author: [{ required: true, message: '请输入', trigger: 'blur' }],
        publisher: [{ required: true, message: '请输入', trigger: 'blur' }],
        publication_date: [{ required: true, message: '请选择', trigger: 'change' }],
        isbn: [{ required: true, message: '请输入', trigger: 'blur' }],
        category_id: [{ required: true, message: '请选择', trigger: 'change' }],
        copies_available: [{ required: true, message: '请输入', trigger: 'blur' }],
        copies_total: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      options: []
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
    this.getCarory()
    if (this.data.title) {
      this.form = Object.assign({}, this.form, this.data)
      this.type = 'edit'
    }
  },
  methods: {
    async getCarory() {
      const res = await allCategory({
        size: 100000,
        page: 1
      })
      this.options = res.data.list
    },
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
