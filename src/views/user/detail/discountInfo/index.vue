<template>
  <div class="p-4">
    <div :class="prefixCls">
      <ul :class="`${prefixCls}__num`">
        <li>
          <p>出行券</p>
          <p>{{ couponTravel }}张</p>
        </li>
        <li>
          <p>权益券</p>
          <p>{{ couponEquity }}张</p>
        </li>
        <li>
          <p>已使用</p>
          <p>{{ couponUsed }}张</p>
        </li>
        <li>
          <p>已失效</p>
          <p>{{ couponInvalid }}张</p>
        </li>
      </ul>
    </div>
    <Tabs v-model:activeKey="activeKey" @change="getActive">
      <TabPane key="1" tab="出行券">
        <BasicTable @register="registerTravelTable" :pagination="pagination">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <TableAction
                :actions="[
                  {
                    label: '查看',
                    type: 'primary',
                    onClick: handleRechargeDetail.bind(null, record),
                    divider: true,
                  },
                ]"
              />
            </template>
          </template>
        </BasicTable>
      </TabPane>
      <TabPane key="2" tab="权益券" force-render>
        <BasicTable @register="registerEquityTable" :pagination="pagination">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <TableAction
                :actions="[
                  {
                    label: '查看',
                    type: 'primary',
                    onClick: handleRefundDetail.bind(null, record),
                    divider: true,
                  },
                ]"
              />
            </template>
          </template>
        </BasicTable>
      </TabPane>
    </Tabs>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRefs, createVNode } from 'vue'
  import { BasicTable, useTable, BasicColumn, TableAction } from '/@/components/Table'
  import { Tooltip, Modal, Tabs } from 'ant-design-vue'
  import { couponTravelApi } from '/@/api/demo/discountTravelTable'
  import { couponEquityApi } from '/@/api/demo/discountEquityTable'
  import { Icon } from '/@/components/Icon/index'

  const columns: BasicColumn[] = [
    {
      title: '优惠券编号',
      dataIndex: 'couponNo',
      width: 150,
    },
    {
      title: '优惠名称',
      dataIndex: 'couponName',
      width: 150,
    },
    {
      title: '优惠类型',
      dataIndex: 'couponType',
    },
    {
      title: '优惠额度',
      dataIndex: 'couponNum',
    },
    {
      title: '有效期',
      dataIndex: 'couponValidity',
    },
    {
      title: '到期日',
      dataIndex: 'couponValidityDate',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'couponState',
    },
    {
      title: '使用日期',
      dataIndex: 'couponUseDate',
      width: 200,
    },
  ]

  export default defineComponent({
    components: {
      BasicTable,
      TableAction,
      Tooltip,
      Icon,
      Modal,
      Tabs,
      TabPane: Tabs.TabPane,
    },
    setup() {
      const pagination = ref<any>(false)
      const couponBasic = reactive({
        couponTravel: '5',
        couponEquity: '3',
        couponUsed: '6',
        couponInvalid: '6',
      })

      const [registerTravelTable] = useTable({
        title: '',
        api: couponTravelApi,
        columns: columns,
        bordered: true,
        showIndexColumn: false,
        scroll: { y: 300 },
        afterFetch: (r) => {
          console.log(r)
        },
        actionColumn: {
          width: 100,
          title: '操作',
          dataIndex: 'action',
        },
      })
      const [registerEquityTable] = useTable({
        title: '',
        api: couponEquityApi,
        columns: columns,
        bordered: true,
        showIndexColumn: false,
        scroll: { y: 300 },
        afterFetch: (r) => {
          console.log(r)
        },
        actionColumn: {
          width: 100,
          title: '操作',
          dataIndex: 'action',
        },
      })

      function handleRechargeDetail(record: Recordable) {
        console.log('查看', record)
      }
      function handleRefundDetail(record: Recordable) {
        console.log('查看', record)
      }
      function getActive(key: number) {
        console.log(key)
      }

      return {
        registerTravelTable,
        registerEquityTable,
        handleRechargeDetail,
        handleRefundDetail,
        pagination,
        prefixCls: 'list-card',
        ...toRefs(couponBasic),
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
  }
</style>
