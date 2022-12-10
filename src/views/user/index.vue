<template>
  <BasicTable @register="registerTable">
    <template #form-custom> custom-slot </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'nickName' || column.key === 'tel'">
        <div>
          <p>昵称：{{ record.nickName }}</p>
          <p>手机号：{{ record.tel }}</p>
        </div>
      </template>
      <template v-if="column.key === 'level'">
        <div>
          <p>{{ record.level }}</p>
          <p class="edit-btn" @click="editLevel" style="cursor: pointer"
            ><Icon icon="jam:write" :size="14" />更新等级</p
          >
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
        <TableAction
          :actions="[
            {
              label: '查看',
              type: 'primary',
              onClick: handleDetail.bind(null, record),
              divider: true,
            },
            {
              label: '禁用.',
              type: 'warning',
              onClick: handleDisable.bind(null, record),
              divider: true,
            },
          ]"
        />
      </template>
    </template>
  </BasicTable>
  <Detail @register="registerDetail" :deData="listData" />
  <DisableModal @register="registerDisable" />
  <EditModal @register="registerEdit" />
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRefs } from 'vue'
  import { BasicTable, useTable, TableAction, EditRecordRow } from '/@/components/Table'
  import { getBasicColumns, getFormConfig } from './tableData'
  import { useDrawer } from '/@/components/Drawer'
  import Detail from './detail/index.vue'
  import { demoListApi } from '/@/api/demo/table'
  import DisableModal from './detail/basicInfo/disableModal.vue'
  import EditModal from './editModal.vue'
  import { useModal } from '/@/components/Modal'
  import { Icon } from '/@/components/Icon/index'

  export default defineComponent({
    components: { BasicTable, TableAction, Detail, DisableModal, Icon, EditModal },
    setup() {
      const checkedKeys = ref<Array<string | number>>([])
      const [registerDetail, { openDrawer: openDetail }] = useDrawer()
      const [registerDisable, { openModal: disableOperateModal }] = useModal()
      const [registerEdit, { openModal: editOperateModal }] = useModal()
      const [registerTable] = useTable({
        title: '',
        api: demoListApi,
        columns: getBasicColumns(),
        useSearchForm: true,
        formConfig: getFormConfig(),
        showTableSetting: true,
        tableSetting: { fullScreen: true },
        showIndexColumn: false,
        bordered: true,
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
        listData: {},
      })

      function onSelectChange(selectedRowKeys: (string | number)[]) {
        checkedKeys.value = selectedRowKeys
      }
      function handleDetail(record: EditRecordRow) {
        openDetail(true, {
          data: record,
        })
        state.listData = record
      }
      function handleDisable(record: EditRecordRow) {
        disableOperateModal(true, {
          data: record,
        })
      }
      function editLevel(record: number) {
        editOperateModal(true, {
          data: record,
        })
      }
      return {
        registerTable,
        checkedKeys,
        onSelectChange,
        registerDetail,
        ...toRefs(state),
        registerDisable,
        registerEdit,
        handleDetail,
        handleDisable,
        editLevel,
      }
    },
  })
</script>
<style>
  .ant-picker {
    width: 100%;
  }
</style>
