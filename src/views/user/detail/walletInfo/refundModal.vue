<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="退款"
    @visible-change="handleVisibleChange"
  >
    <div class="pt-10px pr-3px">
      <p :class="prefixCls"
        ><Icon
          icon="bi:exclamation-circle"
          size="14"
          color="#EFBD47"
        />确认退款后，款项将按原路退还至账户，请慎重操作。</p
      >
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
      label: '请选择充值记录:',
      colProps: {
        span: 20,
      },
      componentProps: {
        options: [
          {
            label: '记录1',
            value: '0',
            key: '0',
          },
          {
            label: '记录2',
            value: '1',
            key: '1',
          },
          {
            label: '记录3',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'type',
      component: 'Input',
      label: '退款类型:',
      colProps: {
        span: 20,
      },
      componentProps: {
        placeholder: '请输入',
      },
    },
    {
      field: 'passageway',
      component: 'Input',
      label: '退款通道:',
      colProps: {
        span: 20,
      },
      componentProps: {
        placeholder: '请输入',
      },
    },
    {
      field: 'reason',
      component: 'InputTextArea',
      label: '退款原因:',
      colProps: {
        span: 20,
      },
      componentProps: {
        placeholder: '请输入',
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
    margin-bottom: 20px;
    color: #999;
    font-size: 10px;

    span {
      margin-right: 3px;
    }
  }
</style>
