<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="充值"
    @visible-change="handleVisibleChange"
  >
    <div class="pt-40px pr-3px">
      <BasicForm @register="registerForm" :model="model" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index'
  const schemas: FormSchema[] = [
    {
      field: 'principal',
      component: 'Input',
      label: '充值本金:',
      colProps: {
        span: 20,
      },
      defaultValue: '',
      componentProps: {
        placeholder: '请输入',
      },
    },
    {
      field: 'give',
      component: 'Input',
      label: '赠送金额:',
      colProps: {
        span: 20,
      },
      componentProps: {
        placeholder: '请输入',
      },
    },
    {
      field: 'note',
      component: 'Input',
      label: '备注:',
      colProps: {
        span: 20,
      },
      componentProps: {
        placeholder: '请输入',
      },
    },
  ]
  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      userData: { type: Object },
    },
    setup(props) {
      const modelRef = ref({})
      const [registerForm, {}] = useForm({
        labelWidth: 120,
        schemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      })

      const [register] = useModalInner((data) => {
        data && onDataReceive(data)
      })

      function onDataReceive(data) {
        modelRef.value = { field2: data.data, field1: data.info }
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData))
      }

      return { register, schemas, registerForm, model: modelRef, handleVisibleChange }
    },
  })
</script>
