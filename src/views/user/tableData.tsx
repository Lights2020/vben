import { FormProps, FormSchema } from '/@/components/Table'
import { BasicColumn } from '/@/components/Table/src/types/table'
import { areaRecord } from '/@/api/demo/cascader'

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '用户信息',
      width: 150,
      dataIndex: 'nickName',
      // scopedSlots: { customRender: 'userInfo' },
    },
    {
      title: '会员等级',
      width: 100,
      dataIndex: 'level',
    },
    {
      title: '登陆信息',
      width: 250,
      dataIndex: 'lastLoginTime',
    },
    {
      title: '注册信息',
      width: 250,
      dataIndex: 'logonTime',
    },
    {
      title: '账户信息',
      width: 150,
      dataIndex: 'accountState',
    },
    {
      title: '渠道来源',
      width: 100,
      dataIndex: 'channel',
    },
    {
      title: '用户类型',
      width: 100,
      dataIndex: 'userType',
    },
    {
      title: '企业信息',
      width: 150,
      dataIndex: 'enterpriseName',
    },
  ]
}

const renderContent = ({ text, index }: { text: any; index: number }) => {
  const obj: any = {
    children: text,
    attrs: {},
  }
  if (index === 9) {
    obj.attrs.colSpan = 0
  }
  return obj
}

export const getAdvanceSchema = (itemNumber = 6): FormSchema[] => {
  const arr: any = []
  for (let index = 0; index < itemNumber; index++) {
    arr.push({
      field: `field${index}`,
      label: `字段${index}`,
      component: 'Input',
      colProps: {
        xl: 12,
        xxl: 8,
      },
    })
  }
  return arr
}
export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `tel`,
        label: `手机号`,
        component: 'Input',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入完整手机号',
          onChange: (e: any) => {
            // console.log(e)
          },
        },
      },
      {
        field: 'userType',
        component: 'Select',
        label: '用户类型',
        colProps: {
          span: 8,
        },
        componentProps: {
          options: [
            {
              label: '全部',
              value: '0',
              key: '0',
            },
            {
              label: '企业用户',
              value: '1',
              key: '1',
            },
            {
              label: '个人用户',
              value: '2',
              key: '2',
            },
          ],
        },
      },
      {
        field: 'nickName',
        label: '昵称',
        component: 'Input',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入昵称/员工名/户口号',
        },
      },
      {
        field: 'imei',
        label: 'IMEI',
        component: 'Input',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入当前IMEI/注册IMEI',
        },
      },
      {
        field: 'level',
        component: 'Select',
        label: '会员等级',
        colProps: {
          span: 8,
        },
        componentProps: {
          options: [
            {
              label: '全部',
              value: '0',
              key: '0',
            },
            {
              label: '0',
              value: '1',
              key: '1',
            },
            {
              label: '1',
              value: '2',
              key: '2',
            },
          ],
        },
      },
      {
        field: 'accountState',
        component: 'Select',
        label: '账户状态',
        colProps: {
          span: 8,
        },
        componentProps: {
          options: [
            {
              label: '全部',
              value: '0',
              key: '0',
            },
            {
              label: '禁用',
              value: '1',
              key: '1',
            },
            {
              label: '正常',
              value: '2',
              key: '2',
            },
          ],
        },
      },

      {
        field: 'lastLoginTime',
        component: 'DatePicker',
        label: '注册时间',
        colProps: {
          span: 8,
        },
      },
      {
        field: 'accountVersion',
        component: 'Select',
        label: '当前版本',
        colProps: {
          span: 8,
        },
        componentProps: {
          options: [
            {
              label: '全部',
              value: '0',
              key: '0',
            },
            {
              label: '12.2',
              value: '1',
              key: '1',
            },
            {
              label: '10.1',
              value: '2',
              key: '2',
            },
          ],
        },
      },
      {
        field: 'lastPosition',
        component: 'ApiCascader',
        label: '注册城市',
        colProps: {
          span: 8,
        },
        componentProps: {
          api: areaRecord,
          apiParamKey: 'parentCode',
          dataField: 'data',
          labelField: 'name',
          valueField: 'code',
          initFetchParams: {
            parentCode: '',
          },
          isLeaf: (record) => {
            return !(record.levelType < 3)
          },
        },
      },
      {
        field: 'channel',
        component: 'Select',
        label: '渠道来源',
        colProps: {
          span: 8,
        },
        componentProps: {
          options: [
            {
              label: '全部',
              value: '0',
              key: '0',
            },
            {
              label: '乐马',
              value: '1',
              key: '1',
            },
          ],
        },
      },
    ],
  }
}
