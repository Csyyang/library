<template>
  <el-dialog
    :title="type === 'edit' ? '修改管理员' : '新增管理员'"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose"
    :destroy-on-close="true"
  >
    <el-form v-if="type === 'edit'" ref="form" :model="loginForm" label-width="80px" :rules="rules">
      <el-form-item prop="username" label="用户名">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password_hash" label="密码">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password_hash"
          :type="passwordType"
          placeholder="请输入"
          name="password_hash"
          tabindex="2"
          auto-complete="on"
        >
          <span slot="suffix" class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password_hash' ? 'eye' : 'eye-open'" />
          </span>
        </el-input>

      </el-form-item>

      <el-form-item prop="first_name" label="姓氏">
        <el-input v-model="loginForm.first_name" palceholder="请输入" />
      </el-form-item>

      <el-form-item prop="last_name" label="名字">
        <el-input v-model="loginForm.last_name" palceholder="请输入" />
      </el-form-item>

      <el-form-item prop="email" label="邮件">
        <el-input v-model="loginForm.email" palceholder="请输入" />
      </el-form-item>

    </el-form>

    <el-form v-else ref="form" :model="loginForm" label-width="80px" :rules="rules">
      <el-form-item prop="user_id" label="用户名">
        <el-select v-model="loginForm.user_id" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.user_id"
            :label="`${item.first_name}${item.last_name}`"
            :value="item.user_id"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addAdmin, upAdmin, getUsers } from '@/api/administrators'

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
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      passwordType: 'password',
      type: '',
      loginForm: {
        username: '',
        password_hash: '',
        first_name: '',
        last_name: '',
        email: ''
      },
      rules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password_hash: [{ required: true, trigger: 'blur', validator: validatePassword }],
        first_name: [{ required: true, trigger: 'blur', message: '请输入' }],
        last_name: [{ required: true, trigger: 'blur', message: '请输入' }],
        user_id: [{ required: true, trigger: 'change', message: '请选择' }]
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
    if (this.data.user_id) {
      this.loginForm = Object.assign({}, this.loginForm, this.data)
      this.type = 'edit'
    }

    this.getOption()
  },
  methods: {
    async getOption() {
      const res = await getUsers({
        size: 10000,
        page: 1
      })

      this.options = res.data
    },
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
      await fn(this.loginForm)

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

