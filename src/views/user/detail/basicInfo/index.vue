<template>
  <PageWrapper title="" contentBackground v-bind="$attrs">
    <div :class="prefixCls">
      <Description
        size="middle"
        title="用户信息"
        :bordered="false"
        :column="2"
        :data="bData"
        :schema="userInfoSchema"
      />
      <div :class="`${prefixCls}__btn`">
        <p><Icon icon="material-symbols:check-circle-outline" size="26" color="#55D187" />正常</p>
        <a-button type="warning" @click="disableOperateModal"> 禁用 </a-button>
      </div>
    </div>
    <a-divider />
    <Description
      size="middle"
      title="企业信息"
      :bordered="false"
      :column="2"
      :data="bData"
      :schema="enterpriseSchema"
    />
    <a-divider />
    <Description
      size="middle"
      title="登录信息"
      :bordered="false"
      :column="2"
      :data="bData"
      :schema="loginSchema"
    />
    <a-divider />
    <Description
      size="middle"
      title="注册信息"
      :bordered="false"
      :column="2"
      :data="bData"
      :schema="logonSchema"
    />
    <a-divider />
    <Description
      size="middle"
      title="账户信息"
      :bordered="false"
      :column="2"
      :data="bData"
      :schema="accountSchema"
    />
    <a-divider />
  </PageWrapper>
  <DisableModal @register="registerDisable" />
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { Description } from '/@/components/Description/index'
  import { PageWrapper } from '/@/components/Page'
  import { Divider } from 'ant-design-vue'
  import { Icon } from '/@/components/Icon/index'
  import { useModal } from '/@/components/Modal'
  import DisableModal from './disableModal.vue'

  const userInfoSchema: DescItem[] = [
    {
      field: 'nickName',
      label: '昵称',
    },
    {
      field: 'level',
      label: '会员',
    },
    {
      field: 'tel',
      label: '手机号',
    },
    {
      field: 'email',
      label: '邮箱',
    },
    {
      field: 'channel',
      label: '渠道',
    },
  ]
  export const enterpriseSchema: DescItem[] = [
    {
      field: 'enterpriseName',
      label: '企业名称',
    },
    {
      field: 'enterpriseStaff',
      label: '员工名称',
    },
  ]
  export const loginSchema: DescItem[] = [
    {
      field: 'lastLoginTime',
      label: '最后打开APP时间',
    },
    {
      field: 'lastLoginTime',
      label: '最近登录时间',
    },
    {
      field: 'lastPosition',
      label: '最近定位城市',
    },
    {
      field: 'imei',
      label: '当前IMEI',
    },
  ]
  export const logonSchema: DescItem[] = [
    {
      field: 'logonTime',
      label: '注册时间',
    },
    {
      field: 'logonPosition',
      label: '注册城市',
    },
    {
      field: 'logonImei',
      label: '注册IMEI',
    },
  ]
  export const accountSchema: DescItem[] = [
    {
      field: 'accountTerminal',
      label: '使用设备',
    },
    {
      field: 'accountLang',
      label: '当前语言',
    },
    {
      field: 'accountVersion',
      label: 'APP版本',
    },
  ]

  export default defineComponent({
    components: { Description, PageWrapper, [Divider.name]: Divider, Icon, DisableModal },
    setup(props, context) {
      const attrData = JSON.parse(JSON.stringify(context.attrs))
      const basicData = reactive({
        bData: {
          ...attrData.data,
        },
      })
      const [registerDisable, { openModal: disableOperateModal }] = useModal()
      return {
        userInfoSchema,
        enterpriseSchema,
        loginSchema,
        logonSchema,
        accountSchema,
        ...toRefs(basicData),
        prefixCls: 'btn-style',
        disableOperateModal,
        registerDisable,
      }
    },
  })
</script>
<style lang="less" scoped>
  .desc-wrap {
    padding: 16px;
    background-color: @component-background;
  }

  .btn-style {
    position: relative;

    &__btn {
      top: 50px;
      right: 0;
      color: #55d187;
      position: absolute;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
</style>
