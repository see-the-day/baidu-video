<template>
  <div>
    <div class="mb-12 h-4 w-20 bg-bgSelect" />
    <span class="text-24 font-medium">找回密码</span>
  </div>
  <n-form
    ref="formBack"
    inline
    :label-width="80"
    :model="formValue"
    :rules="rules"
    class="form flex flex-col pt-32"
  >
    <n-form-item path="phone" :show-label="false">
      <n-input
        v-model:value="formValue.phone"
        placeholder="请输入手机号"
        maxlength="11"
        @keydown.enter="handleValidateClick"
      >
        <template #prefix>
          <span class="iconfont icon-denglu_shouji" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item :show-label="false" path="code">
      <n-input
        v-model:value="formValue.code"
        placeholder="请输入验证码"
        @keydown.enter="handleValidateClick"
      />
      <n-button
        class="ml-12 h-48 w-127"
        :disabled="!!countdown"
        @click="getValidateCode"
      >
        {{ countdown ? `重发验证码(${countdown}s)` : '获取验证码' }}
      </n-button>
    </n-form-item>
    <n-button
      type="primary"
      class="mt-100 h-48 w-364"
      @click="handleValidateClick"
    >
      下一步
    </n-button>
    <div class="mt-20 flex w-full items-center justify-center">
      <div class="flex cursor-pointer text-clickColor" @click="changeType(1)">
        <div
          class="iconfont icon-xiangzuo mr-4 cursor-pointer text-clickColor"
        />
        <span>返回</span>
      </div>
    </div>
  </n-form>
</template>
<script lang="ts" setup>
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { ref, Ref } from 'vue'
import axios from '@/request'
import { useLogin } from '@/store/login'
import { geetestAction } from '@/util/index'

const rules: {} = {
  phone: {
    required: true,
    trigger: 'input',
    key: 'phone',
    validator(_: string, value: string) {
      const regTel =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (!value) {
        return new Error('请输入手机号')
      }
      if (!regTel.test(value)) {
        return new Error('请输入正确的手机号')
      }
      return true
    }
  },
  code: {
    required: true,
    trigger: 'input',
    key: 'code',
    validator(_: string, value: string) {
      if (!value) {
        return new Error('请输入验证码')
      }
      return true
    }
  }
}

const countdown = ref(0)
const countDownFn = () => {
  if (countdown.value) {
    setTimeout(() => {
      countdown.value -= 1
      countDownFn()
    }, 1000)
  }
}

const login = useLogin()
const formValue = ref({ phone: '', code: '' })
const disLogin = ref(false)
const formBack: Ref = ref(null)
const getValidateCode = () => {
  if (disLogin.value) return
  disLogin.value = true

  formBack.value.validate(
    () => {},
    (rule: { key: string }) => {
      return rule?.key === 'phone'
    }
  )
  if (!formValue.value.phone) {
    disLogin.value = false
    return
  }

  geetestAction()
    .then((result: any) => {
      const data = {
        phone: formValue.value.phone,
        action: 'retrieve_pass',
        ...result
      }
      countdown.value = 60
      axios
        .post('/api/v1/verification/send_sms/', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res: any) => {
          if (!res.error_code) {
            countDownFn()
            login.SET_SECURITY_KEY(res.data.security_key)
          }
        })
        .catch(() => {
          countdown.value = 0
        })
    })
    .finally(() => {
      disLogin.value = false
    })
}

const emit = defineEmits(['changeType'])
const changeType = (index: number) => {
  emit('changeType', index)
}

const handleValidateClick = () => {
  formBack.value.validate((errors: string) => {
    if (!errors) {
      const params = { ...formValue.value, security_key: login.security_key }
      axios
        .post('/api/v1/verification/verify_sms', JSON.stringify(params), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res: any) => {
          login.SET_GENERATE_KEY(res.data.generate_key)
          changeType(3)
        })
    }
  })
}
</script>
