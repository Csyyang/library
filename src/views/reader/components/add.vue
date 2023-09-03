<template>
  <el-dialog
    :title="type === 'edit' ? '修改读者信息' : '新增读者'"
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
        label="读者姓名"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item
        label="邮箱"
        prop="email"
      >
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item
        label="联系电话"
        prop="phone"
      >
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item
        label="地址"
        prop="address"
      >
        <el-input v-model="form.address" />
      </el-form-item>

      <el-form-item
        label="注册日期"
        prop="join_date"
      >
        <el-date-picker
          v-model="form.join_date"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        />
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
import { addReader, upReader } from '@/api/reader'

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
        name: '',
        email: '',
        phone: '',
        address: null,
        join_date: null
      },
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        email: [{ required: true, message: '请输入', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入', trigger: 'blur' }],
        join_date: [{ required: true, message: '请输入', trigger: 'blur' }],
        address: [{ required: true, message: '请输入', trigger: 'blur' }]
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
    if (this.data.name) {
      this.form = Object.assign({}, this.form, this.data)
      this.type = 'edit'
    }
  },
  methods: {
    async onSubmit() {
      await this.$refs.form.validate()
      const fn = this.type === 'edit' ? upReader : addReader
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
