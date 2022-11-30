<template>
  <BasicModal
    v-bind="$attrs"
    title="禁用"
    okText="禁用"
    @register="register"
    @visible-change="handleVisibleChange"
  >
    <div class="pt-10px pr-3px">
      <p :class="prefixCls"
        ><Icon
          icon="bi:exclamation-circle"
          size="14"
          color="#EFBD47"
        />禁用后，该用户账号将无法登录“乐马出行”APP，请慎重操作</p
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
      field: 'reason',
      component: 'InputTextArea',
      label: '禁用原因:',
      colProps: {
        span: 20,
      },
      componentProps: {
        placeholder: '请输入',
        rows: '4',
      },
      required: true,
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
