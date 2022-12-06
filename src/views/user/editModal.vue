<template>
  <BasicModal
    v-bind="$attrs"
    title="等级修改"
    okText="确定"
    @register="register"
    @visible-change="handleVisibleChange"
  >
    <div class="pt-80px pr-3px">
      <BasicForm @register="registerForm" :model="model" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index'
  import { Icon } from '/@/components/Icon/index'

  const schemas: FormSchema[] = [
    {
      field: 'userType',
      component: 'Select',
      label: '请选择等级:',
      colProps: {
        span: 20,
      },
      componentProps: {
        options: [
          {
            label: '普通会员',
            value: '0',
            key: '0',
          },
          {
            label: '超级会员',
            value: '1',
            key: '1',
          },
        ],
      },
    },
  ]
  export default defineComponent({
    components: { BasicModal, BasicForm, Icon },
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

      return {
        register,
        schemas,
        registerForm,
        model: modelRef,
        handleVisibleChange,
        prefixCls: 'modal-style',
      }
    },
  })
</script>
<style lang="less" scoped>
  .modal-style {
    width: 100%;
    text-align: center;
    margin-bottom: 60px;
    color: #999;
    font-size: 10px;

    span {
      margin-right: 3px;
    }
  }
</style>
