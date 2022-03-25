<template>
  <div>
    <div class="w-20 h-4 bg-bgSelect mb-12" />
    <span class="text-24 font-medium">重置密码</span>
  </div>
  <n-form
    ref="formRef"
    inline
    :label-width="80"
    :model="formValue"
    :rules="rules"
    class="form flex flex-col pt-32"
  >
    <n-form-item path="password" :show-label="false">
      <n-input
        v-model:value="formValue.password"
        :input-props="{ autocomplete: 'off' }"
        placeholder="请输入新密码"
        type="password"
        @keydown.enter="handleValidateClick"
      />
    </n-form-item>
    <n-form-item path="newPassword" :show-label="false">
      <n-input
        v-model:value="formValue.newPassword"
        :input-props="{ autocomplete: 'new-password' }"
        placeholder="请再输入一遍新密码"
        type="password"
        @keydown.enter="handleValidateClick"
      />
    </n-form-item>
    <n-button type="primary" class="w-364 h-48 mt-100" @click="handleValidateClick">
      去登录
    </n-button>
  </n-form>
</template>
<script lang="ts" setup>
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { ref, Ref } from 'vue'
import axios from '@/request'
import { useLogin } from '@/store/login'

const formValue = ref({ newPassword: '', password: '' })
const rules: {} = {
  password: {
    required: true,
    trigger: 'blur',
    validator (_:string, value: string) {
      if (!value) {
        return new Error('请输入密码')
      } else if (value.length < 6 || value.length > 15) {
        return new Error('长度在 6 到 15 个字符')
      }
      return true
    }
  },
  newPassword: {
    required: true,
    trigger: 'blur',
    validator (_:string, value: string) {
      if (formValue.value.password !== value) {
        return new Error('两次密码不一致')
      }
      return true
    }
  }
}

const formRef: Ref = ref(null)
const login = useLogin()
const emit = defineEmits(['changeType'])
const handleValidateClick = () => {
  formRef.value.validate((errors: string) => {
    if (!errors) {
      axios.post(
        '/api/v1/customer/change_password',
        JSON.stringify({
          ...formValue.value,
          generate_key: login.generate_key
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res: any) => {
        if (!res.error_code) {
          window.$message.success(res.data.message)
          localStorage.removeItem('DATAZHI-TOKEN')
          localStorage.removeItem('USER_INFO')
          emit('changeType', 1)
        }
      })
    }
  })
}
</script>
