<template>
  <div class="p-4">
    <div :class="prefixCls">
      <ul :class="`${prefixCls}__num`">
        <li>
          <p>账户余额</p>
          <p>{{ walletBalance }}</p>
        </li>
        <li>
          <p>已充值</p>
          <p>{{ walletRecharge }}</p>
        </li>
        <li>
          <p>已退款</p>
          <p>{{ walletRefund }}</p>
        </li>
        <li>
          <p>已消费</p>
          <p>{{ walletUsed }}</p>
        </li>
      </ul>
      <div :class="`${prefixCls}__btn`">
        <a-button type="primary" @click="openRechargeModal"> 充值 </a-button>
        <a-button type="error" @click="openRefundModal"> 退款 </a-button>
      </div>
    </div>
    <Tabs v-model:activeKey="activeKey" @change="getActive">
      <TabPane key="1" tab="充值记录">
        <BasicTable @register="registerRechargeTable" :pagination="pagination" />
      </TabPane>
      <TabPane key="2" tab="消费记录" force-render>
        <BasicTable @register="registerUsedTable" :pagination="pagination" />
      </TabPane>
    </Tabs>

    <rechargeModal @register="registerRecharge" />
    <refundModal @register="registerRefund" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRefs } from 'vue'
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table'
  import { Tabs } from 'ant-design-vue'
  // import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { demoListApi } from '/@/api/demo/walletRechargeTable'
  import { demoListApiUsed } from '/@/api/demo/walletUsedTable'
  import { useModal } from '/@/components/Modal'
  import RechargeModal from './rechargeModal.vue'
  import RefundModal from './refundModal.vue'

  const columns: BasicColumn[] = [
    {
      title: '操作时间',
      dataIndex: 'operateTime',
      width: 200,
    },
    {
      title: '事件',
      dataIndex: 'operateName',
    },
    {
      title: '充值/扣除金额',
      dataIndex: 'rechargeAmount',
    },
    {
      title: '实付/退款金额',
      dataIndex: 'useAmount',
    },
    {
      title: '备注',
      dataIndex: 'remarks',
    },
  ]

  const columns2: BasicColumn[] = [
    {
      title: '操作时间',
      dataIndex: 'operateTime',
      width: 200,
    },
    {
      title: '事件',
      dataIndex: 'operateName',
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
    },
    {
      title: '订单编号',
      dataIndex: 'orderNo',
    },
    {
      title: '消费金额',
      dataIndex: 'useAmount',
    },
  ]

  export default defineComponent({
    components: {
      BasicTable,
      RechargeModal,
      RefundModal,
      Tabs,
      TabPane: Tabs.TabPane,
    },
    setup() {
      const pagination = ref<any>(false)
      const walletBasic = reactive({
        walletBalance: '999USD',
        walletRecharge: '98USD',
        walletRefund: '29USD',
        walletUsed: '59USD',
      })

      const [registerRechargeTable] = useTable({
        title: '',
        api: demoListApi,
        columns: columns,
        bordered: true,
        showIndexColumn: false,
        scroll: { y: 300 },
        afterFetch: (r) => {
          console.log(r)
        },
      })
      const [registerUsedTable] = useTable({
        title: '',
        api: demoListApiUsed,
        columns: columns2,
        bordered: true,
        showIndexColumn: false,
        scroll: { y: 300 },
        afterFetch: (r) => {
          console.log(r)
        },
      })
      const [registerRecharge, { openModal: openRechargeModal }] = useModal()
      const [registerRefund, { openModal: openRefundModal }] = useModal()

      function getActive(key: number) {
        console.log(key)
      }
      return {
        registerRechargeTable,
        registerUsedTable,
        pagination,
        prefixCls: 'list-card',
        ...toRefs(walletBasic),
        openRechargeModal,
        registerRecharge,
        openRefundModal,
        registerRefund,
        activeKey: ref('1'),
        getActive,
      }
    },
  })
</script>
<style lang="less" scoped>
  .list-card {
    display: flex;
    justify-content: flex-start;

    &__num {
      width: 40%;
      display: flex;
      justify-content: space-between;
    }

    &__btn {
      flex: 1;
      align-items: center;
      margin-left: 3%;

      button {
        margin: 0 2%;
      }
    }
  }
</style>
