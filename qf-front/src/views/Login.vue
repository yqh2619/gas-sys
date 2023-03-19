<template>
  <div>
    <Particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" :options="options" />
    <div class="fromContainer">
      <h3>加油站安全法规后台管理系统</h3>
      <el-form ref="loginFormRef" :model="loginFrom" status-icon :rules="loginRules" label-width="80px" class="loginform">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginFrom.username" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginFrom.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
      </el-form>
      <h5>用户注册系统可联系管理员，仅浏览下载请使用: root56  123456</h5>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { loadFull } from 'tsparticles';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter();
//表单的响应式对象
const loginFrom = reactive({
  username: '',
  password: '',
});
//表单的引入对象
const loginFormRef = ref();
//校验
const loginRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 ~ 10', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 ~ 10', trigger: 'blur' },
  ],
});

const submitForm = () => {
  // 1、校验表单
  loginFormRef.value.validate((params) => {
    // console.log(params);
    if (params)
    {
      axios.post('/frontapi/user/login', loginFrom).then((res) => {
        if (res.data.ActionType === 'OK')
        {
          store.commit('changeUserInfo', res.data.data);
          store.commit('changeGetterRouter', false);
          router.push('/index');
        } else
        {
          ElMessage.error('用户名和密码不匹配！请重新输入！');
        }
      });
    }
  });
};

//背景动效插件
const particlesInit = async (engine) => {
  await loadFull(engine);
};

const particlesLoaded = async (container) => {
  console.log('Particles container loaded', container);
};
const options = reactive({
  background: {
    color: {
      value: '#2d3a4b', // 粒子颜色
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push', // 可用的click模式有: "push", "remove", "repulse", "bubble"。
      },
      onHover: {
        enable: true,
        mode: 'repulse', // 可用的hover模式有: "grab", "repulse", "bubble"。
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 8,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#dedede',
    },
    links: {
      color: '#ffffff', // '#dedede'。线条颜色。
      distance: 150, // 线条长度
      enable: true, // 是否有线条
      opacity: 0.5, // 线条透明度。
      width: 1, // 线条宽度。
    },
    collisions: {
      enable: false,
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 4, // 粒子运动速度。
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80, // 粒子数量。
    },
    opacity: {
      value: 0.5, // 粒子透明度。
    },
    shape: {
      type: 'circle', // 可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
});
</script>

<style lang="scss" scoped>
.fromContainer {
  width: 600px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba($color: #0b0404, $alpha: 0.5);
  color: white;
  text-align: center;
  padding: 20px;
  border-radius: 16px;
  h3 {
    font-size: 30px;
  }
  h5{
    margin-top:10px;
    font-size: 10px;
    color:gray
  }

  .loginform {
    margin-top: 30px;
  }
}

.el-button {
  width: 300px;
  height: 40px;
  margin-top: 30px;
}

:deep(.el-form-item__label) {
  color: white;
}
</style>
