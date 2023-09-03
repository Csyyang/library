<template>
  <el-dialog
    :title="type === 'edit' ? '修改图书' : '新增图书'"
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
        label="书籍标题"
        prop="title"
      >
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item
        label="作者"
        prop="author"
      >
        <el-input v-model="form.author" />
      </el-form-item>
      <el-form-item
        label="出版社"
        prop="publisher"
      >
        <el-input v-model="form.publisher" />
      </el-form-item>
      <el-form-item
        label="出版日期"
        prop="publish_date"
      >
        <el-date-picker
          v-model="form.publish_date"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item
        label="国际标准书号"
        prop="ISBN"
      >
        <el-input v-model="form.ISBN" />
      </el-form-item>
      <el-form-item
        label="图书分类"
        prop="category"
      >
        <el-input v-model="form.category" />
      </el-form-item>
      <el-form-item
        label="书籍描述"
        prop="description"
      >
        <el-input v-model="form.description" />
      </el-form-item>

      <el-form-item
        v-if="type === 'edit'"
        label="书籍状态"
        prop="status"
      >
        <el-select
          v-model="form.status"
          placeholder="请选择"
        >
          <el-option
            label="借出"
            value="借出"
          /> <el-option
            label="在库"
            value="在库"
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
import { addBook, updateBook } from '@/api/library'

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
        publish_date: null,
        ISBN: '',
        category: '',
        description: '',
        status: ''
      },
      rules: {
        title: [{ required: true, message: '请输入', trigger: 'blur' }],
        author: [{ required: true, message: '请输入', trigger: 'blur' }],
        publisher: [{ required: true, message: '请输入', trigger: 'blur' }],
        publish_date: [{ required: true, message: '请选择', trigger: 'change' }],
        ISBN: [{ required: true, message: '请输入', trigger: 'blur' }],
        category: [{ required: true, message: '请输入', trigger: 'blur' }],
        description: [{ required: true, message: '请输入', trigger: 'blur' }],
        status: [{ required: true, message: '请选择', trigger: 'change' }]
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
    if (this.data.title) {
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
