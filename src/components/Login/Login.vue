<template>
  <div class="container">
    <div class="login">
      <p class="login_top">
        <img src="../../assets/logo.png" alt="登录" width="150" />
      </p>
      <div class="login_buttom">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
          <el-form-item prop="user">
            <el-input
              prefix-icon="iconfont icon-user"
              placeholder="请输入用户名"
              v-model="loginForm.user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              prefix-icon="iconfont icon-mima"
              placeholder="请输入密码"
              type="password"
              v-model="loginForm.pass"
            ></el-input>
          </el-form-item>

          <el-form-item class="login_item">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="primary" @click="registerDialog=true">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog title="用户注册" :visible.sync="registerDialog" width="30%" @close="resetDialog">
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules">
        <el-form-item prop="user">
          <el-input
            prefix-icon="iconfont icon-user"
            placeholder="请输入用户名"
            v-model="registerForm.user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            prefix-icon="iconfont icon-mima"
            placeholder="请输入密码"
            type="password"
            v-model="registerForm.pass"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            prefix-icon="iconfont icon-mima"
            placeholder="请输入手机号码"
            v-model="registerForm.phone"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="registerDialog = false">重 置</el-button>
        <el-button type="primary" @click="registerDialog = false">注 册</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    let phoneRule = (rule, value, callback) => {
      if (value.length!=11||!(/^1[3456789]\d{9}$/.test(value))) {
        return callback(new Error("手机号码格式不正确"));
      }
      callback()
    };

    return {
      //表单数据
      loginForm: {
        user: "",
        pass: ""
      },
      //表单验证数据规则
      loginFormRules: {
        //属性名一定要与表单数据中的属性名相同
        user: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 20, message: "用户名长度范围为6-20", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 20, message: "密码长度范围为8-20", trigger: "blur" }
        ]
      },
      //控制弹框的显示和隐藏
      registerDialog: false,

      //注册表单数据
      registerForm: {
        user: "",
        pass: "",
        phone: ""
      },

      //注册表单验证
      registerFormRules: {
        user: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 20, message: "用户名长度范围为6-20", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 20, message: "密码长度范围为8-20", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: phoneRule, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //登录方法
    login() {
      //验证所有的字段，是否符合规则
      this.$refs["loginFormRef"].validate(bool => {
        console.log(bool);
      });
    },
    //重置表单
    resetDialog(){
      this.$refs["registerFormRef"].resetFields()
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: rgba(53, 73, 94, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  .login {
    width: 400px;
    height: 300px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 1px 0 2px #ccc;
    position: relative;
    .login_top {
      display: inline-flex;
      border-radius: 50%;
      padding: 5px;
      border: 1px solid #ccc;
      align-items: center;
      justify-content: center;
      background: #ccc;
      position: absolute;
      margin: 0px;
      top: -80px;
      left: 110px;
      img {
        border-radius: 50%;
      }
    }
    .login_buttom {
      margin-top: 100px;
      padding: 0 20px;

      .login_item {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>