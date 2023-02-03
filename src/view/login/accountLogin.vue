<template>
  <div>
    <div class="mb-12 h-4 w-20 bg-bgSelect" />
    <span class="text-24 font-medium">账户登录</span>
  </div>
  <n-form
    ref="formRef"
    inline
    :model="formValue"
    :rules="rules"
    class="form flex flex-col pt-32"
  >
    <n-form-item path="username" :show-label="false">
      <n-input
        v-model:value="formValue.username"
        placeholder="请输入用户名称/手机号"
        :input-props="{ autocomplete: 'on' }"
        class="autocomplete-style"
        :class="{ 'none-placeholder': formValue.username }"
        :maxlength="18"
        @keydown.enter="handleValidateClick"
      >
        <template #prefix>
          <span class="iconfont icon-denglu_zhanghao" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item path="password" :show-label="false">
      <n-input
        v-model:value="formValue.password"
        placeholder="请输入用户密码"
        :input-props="{ autocomplete: 'on' }"
        type="password"
        class="autocomplete-style"
        :maxlength="15"
        :class="{ 'none-placeholder': formValue.username }"
        @keydown.enter="handleValidateClick"
      >
        <template #prefix>
          <span class="iconfont icon-denglu_mima" />
        </template>
      </n-input>
    </n-form-item>
    <n-button
      type="primary"
      class="mt-100 h-48 w-364"
      @click="handleValidateClick"
    >
      登录
    </n-button>
    <div class="mt-20 flex w-full justify-between">
      <n-popover trigger="click">
        <template #trigger>
          <div class="cursor-pointer text-clickColor">账号申请</div>
        </template>
        <div class="p-4">
          <span class="iconfont icon-tishi mr-6 text-imgPopover" />
          如果您需要申请账号，请致电：(010)56640807
        </div>
      </n-popover>
      <div class="cursor-pointer text-clickColor" @click="changeType">
        忘记密码
      </div>
    </div>
  </n-form>
</template>
<script lang="ts" setup>
import { NForm, NFormItem, NInput, NButton, NPopover } from 'naive-ui'
import { ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/request'
import * as util from '@/util'

const formValue = ref({ username: '', password: '' })

const rules: {} = {
  username: {
    required: true,
    trigger: 'input',
    validator(_: string, value: string) {
      if (!value) {
        return new Error('请输入姓名')
      }
      if (value.length < 5 || value.length > 18) {
        return new Error('长度在 5 到 18 个字符')
      }
      return true
    }
  },
  password: {
    required: true,
    trigger: ['input'],
    validator(_: string, value: string) {
      if (!value) {
        return new Error('请输入密码')
      }
      if (value.length < 6 || value.length > 15) {
        return new Error('长度在 6 到 15 个字符')
      }
      return true
    }
  }
}

const router = useRouter()
const getInfo = () => {
  axios.get('/api/v1/customer/get_customer_info').then((res: any) => {
    if (!res.error_code) {
      const { menu, search } = res.data
      const menuList = util.findPriority(menu)
      util.setUserInfo({
        ...res.data,
        menu: menuList,
        searchList: search
      })
      router.push(menuList[0])
    }
  })
}

const formRef: Ref = ref(null)
const login = (geetestActionParams = {}) => {
  const obj = { ...formValue.value, ...geetestActionParams }
  axios
    .post('/api/v1/login', JSON.stringify(obj), {
      headers: { 'Content-Type': 'application/json' }
    })
    .then((res: any) => {
      if (!res.error_code) {
        util.setToken(res.data.token)
        getInfo()
      }
    })
}

const disLogin = ref(false)
const handleValidateClick = () => {
  if (!formValue.value.password) return
  if (!formValue.value.username) return
  // 防止重复点击
  if (disLogin.value) return
  disLogin.value = true
  util
    .geetestAction()
    .then((res: any) => login(res))
    .finally(() => (disLogin.value = false))
}

// 内部账号
const internal = () => {
  // url中有code直接登录
  if (util.getQueryVariable('access_token')) {
    axios
      .get('/api/v1/authorization/get_token_by_ins', {
        params: { access_token: util.getQueryVariable('access_token') }
      })
      .then((res: any) => {
        if (!res.error_code) {
          util.setToken(res.data.token)
          getInfo()
        }
      })
  }
}
internal()

const emit = defineEmits(['changeType'])
const changeType = () => {
  emit('changeType', 2)
}
</script>
<style lang="scss">
.autocomplete-style {
  .n-input-wrapper {
    padding: 0 !important;
    position: relative;
  }
  .n-input__prefix {
    position: absolute;
    left: 16px;
    z-index: 1;
  }
  input {
    padding-left: 40px !important;
    padding-right: 40px !important;
  }
  .n-input__placeholder {
    display: none !important;
  }
  .n-input__input-el::-webkit-input-placeholder {
    color: #b4b7bf !important;
  }
}
</style>
