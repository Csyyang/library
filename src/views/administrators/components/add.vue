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
        label="账号"
        prop="username"
      >
        <el-input v-model="form.username" />
      </el-form-item>

      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          :key="passwordType"
          ref="password"
          v-model="form.password"
          :type="passwordType"
          placeholder="请输入"
          name="password"
          tabindex="2"
          auto-complete="on"
        >

          <span
            slot="suffix"
            class="show-pwd"
            @click="showPwd"
          >
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-input>

      </el-form-item>
      <el-form-item
        label="用户名"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="权限"
        prop="role"
      >

        <el-select
          v-model="form.role"
          placeholder="请选择"
        >
          <el-option
            label="超级管理员"
            value="0"
          /> <el-option
            label="普通管理员"
            value="1"
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
import { addAdmin, upAdmin } from '@/api/administrators'

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
      passwordType: 'password',
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
    if (this.data.name) {
      this.form = Object.assign({}, this.form, this.data)
      this.type = 'edit'
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async onSubmit() {
      await this.$refs.form.validate()
      const fn = this.type === 'edit' ? upAdmin : addAdmin
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

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

