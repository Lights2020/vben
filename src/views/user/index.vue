<template>
  <BasicTable @register="registerTable">
    <template #form-custom> custom-slot </template>
    <!-- <template #headerTop>
      <a-alert type="info" show-icon>
        <template #message>
          <template v-if="checkedKeys.length > 0">
            <span>已选中{{ checkedKeys.length }}条记录(可跨页)</span>
            <a-button type="link" @click="checkedKeys = []" size="small">清空</a-button>
          </template>
          <template v-else>
            <span>未选中任何项目</span>
          </template>
        </template>
      </a-alert>
    </template> -->
    <template #bodyCell="{ column, record, text }">
      <template v-if="column.key === 'nickName' || column.key === 'tel'">
        <div>
          <p>昵称：{{ record.nickName }}</p>
          <p>手机号：{{ record.tel }}</p>
        </div>
      </template>
      <template
        v-if="
          column.key === 'lastLoginTime' || column.key === 'lastPosition' || column.key === 'imei'
        "
      >
        <div>
          <p>最近登录时间：{{ record.lastLoginTime }}</p>
          <p>最近定位城市：{{ record.lastPosition }}</p>
          <p>当前IMEI：{{ record.imei }}</p>
        </div>
      </template>
      <template
        v-if="
          column.key === 'logonTime' || column.key === 'logonPosition' || column.key === 'logonImei'
        "
      >
        <div>
          <p>注册时间：{{ record.logonTime }}</p>
          <p>注册城市：{{ record.logonPosition }}</p>
          <p>注册IMEI：{{ record.logonImei }}</p>
        </div>
      </template>
      <template
        v-if="
          column.key === 'accountState' ||
          column.key === 'accountTerminal' ||
          column.key === 'accountVersion' ||
          column.key === 'accountLang'
        "
      >
        <div>
          <p>状态：{{ record.accountState }}</p>
          <p>使用设备：{{ record.accountTerminal }}</p>
          <p>当前版本：{{ record.accountVersion }}</p>
          <p>当前语言：{{ record.accountLang }}</p>
        </div>
      </template>
      <template v-if="column.key === 'enterpriseName' || column.key === 'enterpriseStaff'">
        <div>
          <p>企业：{{ record.enterpriseName }}</p>
          <p>员工：{{ record.enterpriseStaff }}</p>
        </div>
      </template>

      <template v-if="column.key === 'action'">
        <TableAction :actions="createActions(record, column)" />
      </template>
    </template>
    <template #toolbar>
      <a-button type="primary" @click="getFormValues">获取表单数据</a-button>
    </template>
  </BasicTable>
  <Detail @register="registerDetail" :deData="listData" />
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRefs } from 'vue'
  import { BasicTable, useTable, TableAction, ActionItem, EditRecordRow } from '/@/components/Table'
  import { getBasicColumns, getFormConfig } from './tableData'
  import { Alert } from 'ant-design-vue'
  import { useDrawer } from '/@/components/Drawer'
  import Detail from './detail/index.vue'

  import { demoListApi } from '/@/api/demo/table'

  export default defineComponent({
    components: { BasicTable, AAlert: Alert, TableAction, Detail },
    setup() {
      const checkedKeys = ref<Array<string | number>>([])
      const [registerDetail, { openDrawer: openDetail }] = useDrawer()
      const [registerTable, { getForm }] = useTable({
        title: '',
        api: demoListApi,
        columns: getBasicColumns(),
        useSearchForm: true,
        formConfig: getFormConfig(),
        showTableSetting: true,
        tableSetting: { fullScreen: true },
        showIndexColumn: false,
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          selectedRowKeys: checkedKeys,
          onChange: onSelectChange,
        },
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
        },
      })
      const state = reactive({
        listData: '',
      })
      function getFormValues() {
        console.log(getForm().getFieldsValue())
      }

      function onSelectChange(selectedRowKeys: (string | number)[]) {
        console.log(selectedRowKeys)
        checkedKeys.value = selectedRowKeys
      }
      function handleEdit(record: EditRecordRow) {
        openDetail(true, {
          data: record,
        })
        state.listData = record
      }
      function createActions(record: EditRecordRow, column: BasicColumn): ActionItem[] {
        if (!record.editable) {
          return [
            {
              label: '查看',
              onClick: handleEdit.bind(null, record),
              type: 'primary',
            },
          ]
        }
      }

      return {
        registerTable,
        getFormValues,
        checkedKeys,
        onSelectChange,
        createActions,
        registerDetail,
        ...toRefs(state),
      }
    },
  })
</script>
<style>
  .ant-picker {
    width: 100%;
  }
</style>
