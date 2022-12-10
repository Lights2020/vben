<template>
  <div class="p-4">
    <BasicTable @register="registerTable" :pagination="pagination" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table'
  import { operationApi } from '/@/api/demo/operationTable'

  const columns: BasicColumn[] = [
    {
      title: '操作时间',
      dataIndex: 'operationTime',
      width: 200,
    },
    {
      title: 'IMEI',
      dataIndex: 'imei',
      width: 150,
    },
    {
      title: '设备信息',
      dataIndex: 'accountTerminal',
    },
    {
      title: '事件描述',
      dataIndex: 'operationDetail',
    },
  ]

  export default defineComponent({
    components: {
      BasicTable,
    },
    setup() {
      const pagination = ref<any>(false)

      const [registerTable] = useTable({
        title: '',
        api: operationApi,
        columns: columns,
        bordered: true,
        showIndexColumn: false,
        afterFetch: (r) => {
          console.log(r)
        },
      })

      return {
        registerTable,
        pagination,
        prefixCls: 'list-card',
      }
    },
  })
</script>
