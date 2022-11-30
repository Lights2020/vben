<template>
  <BasicDrawer v-bind="$attrs" @register="register" title="用户详情" width="50%">
    <!-- <div>
      <BasicForm @register="registerForm" />
    </div> -->
    <Tabs>
      <template v-for="item in achieveList" :key="item.key">
        <TabPane :tab="item.name">
          <component :is="item.component" :data="deData" />
        </TabPane>
      </template>
    </Tabs>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer'

  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index'
  import { tags, teams, details, achieveList } from './detailData'
  import { Tag, Tabs, Row, Col } from 'ant-design-vue'
  import BasicInfo from './basicInfo/index.vue'
  import OrderInfo from './orderInfo/index.vue'
  import walletInfo from './walletInfo/index.vue'
  import DiscountInfo from './discountInfo/index.vue'
  import OperationInfo from './operationInfo/index.vue'

  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',
      colProps: {
        span: 12,
      },
      defaultValue: '111',
    },
    {
      field: 'field2',
      component: 'Input',
      label: '字段2',
      colProps: {
        span: 12,
      },
    },
  ]
  export default defineComponent({
    components: {
      BasicDrawer,
      BasicForm,
      Tabs,
      TabPane: Tabs.TabPane,
      BasicInfo,
      OrderInfo,
      walletInfo,
      DiscountInfo,
      OperationInfo,
    },
    props: {
      deData: Number,
    },
    setup(props, context) {
      console.log('props: ', props)
      console.log('attrs: ', context.attrs)
      const [registerForm, { setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      })
      const [register] = useDrawerInner((data) => {
        console.log(data)
        console.log(JSON.parse(JSON.stringify(data)))
        // const listData = JSON.parse(JSON.stringify(data)).data
        // 方式1
        // setFieldsValue({
        //   field2: listData.accountLang,
        // })
      })
      console.log('listdata===========')
      return { register, schemas, registerForm, achieveList }
    },
  })
</script>
