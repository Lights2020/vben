<template>
  <BasicDrawer v-bind="$attrs" @register="register" title="用户详情" width="50%">
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
  import { achieveList } from './detailData'
  import { Tabs } from 'ant-design-vue'
  import BasicInfo from './basicInfo/index.vue'
  import OrderInfo from './orderInfo/index.vue'
  import walletInfo from './walletInfo/index.vue'
  import DiscountInfo from './discountInfo/index.vue'
  import OperationInfo from './operationInfo/index.vue'

  const schemas: FormSchema[] = []
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
      const [registerForm] = useForm({
        labelWidth: 120,
        schemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      })
      const [register] = useDrawerInner()
      return { register, schemas, registerForm, achieveList }
    },
  })
</script>
