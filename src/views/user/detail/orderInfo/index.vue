<template>
  <div class="p-4">
    <div :class="prefixCls">
      <p :class="`${prefixCls}__sum`"
        >累计订单数：<span>{{ orderSum }}</span></p
      >
      <ul :class="`${prefixCls}__num`">
        <li>已完成数：{{ orderSum }}</li>
        <li>已取消数：{{ orderCancel }}</li>
        <li>完单率：{{ orderPercent }}</li>
      </ul>

      <p :class="`${prefixCls}__sum`"
        >累计订单金额：<span>{{ orderAmount }}</span></p
      >
      <ul :class="`${prefixCls}__num`">
        <li>累计消费金额：{{ useAmount }}</li>
        <li>累计优惠金额：{{ discountAmount }}</li>
        <li>
          <Tooltip>
            <template #title>优惠金额/订单金额X100%</template>
            <Icon icon="mdi:question-mark-circle-outline" :size="14" />
          </Tooltip>
          用户补贴率：{{ subsidyPercent }}
        </li>
      </ul>
    </div>
    <BasicTable @register="registerTable" :pagination="pagination">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '查看',
                type: 'primary',
                onClick: handleDetail.bind(null, record),
                divider: true,
              },
              {
                label: '删除',
                type: 'error',
                onClick: handleDel.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRefs, createVNode } from 'vue'
  import { BasicTable, useTable, BasicColumn, TableAction } from '/@/components/Table'
  import { Tooltip, Modal } from 'ant-design-vue'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { demoListApi } from '/@/api/demo/orderTable'
  import { Icon } from '/@/components/Icon/index'
  const columns: BasicColumn[] = [
    {
      title: '订单编号',
      dataIndex: 'orderNo',
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
    },
    {
      title: '上车地点',
      dataIndex: 'placeDeparture',
    },
    {
      title: '目的地',
      dataIndex: 'placeDestination',
    },
    {
      title: '城市',
      dataIndex: 'city',
    },
    {
      title: '预计费用',
      dataIndex: 'price',
    },
    {
      title: '专车类型',
      dataIndex: 'carType',
    },
  ]

  export default defineComponent({
    components: { BasicTable, TableAction, Tooltip, Icon, Modal },
    setup() {
      const pagination = ref<any>(false)
      const orderBasic = reactive({
        orderSum: 2090,
        orderCancel: 800,
        orderPercent: '70%',
        orderAmount: 10990,
        useAmount: 8000,
        discountAmount: 238,
        subsidyPercent: '30%',
      })

      const [registerTable] = useTable({
        title: '',
        api: demoListApi,
        columns: columns,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
        },
        scroll: { y: 300 },
        afterFetch: (r) => {
          console.log(r)
        },
      })
      function handleDetail(record: Recordable) {
        console.log('查看', record)
      }
      function handleDel(record: Recordable) {
        console.log('删除', record)
        Modal.confirm({
          title: '确认要删除该条订单吗?',
          icon: createVNode(ExclamationCircleOutlined),
          onOk() {
            console.log('OK')
          },
          onCancel() {
            console.log('Cancel')
          },
          class: 'test',
        })
      }
      return {
        registerTable,
        handleDetail,
        handleDel,
        pagination,
        prefixCls: 'list-card',
        ...toRefs(orderBasic),
      }
    },
  })
</script>
<style lang="less" scoped>
  .list-card {
    &__sum {
      span {
        font-weight: 400;
        font-size: 20px;
      }
    }

    &__num {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
