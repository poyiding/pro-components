import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormMoney } from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();
  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        const val1 = await formRef.current?.validateFields();
        console.log('validateFields:', val1);
        const val2 = await formRef.current?.validateFieldsReturnFormatValue?.();
        console.log('validateFieldsReturnFormatValue:', val2);
        message.success('提交成功');
      }}
      formRef={formRef}
      params={{ id: '100' }}
      formKey="base-form-use-demo"
      request={async () => {
        await waitTime(100);
        return {
          name: '蚂蚁设计有限公司',
          useMode: 'chapter',
        };
      }}
      autoFocusFirstInput
    >
      <ProFormMoney
        label="不显示符号"
        name="amount0"
        fieldProps={{
          moneySymbol: false,
        }}
        locale="en-US"
        initialValue={22.22}
        min={0}
        width="lg"
      />
      <ProFormMoney
        label="宽度"
        name="amount1"
        locale="en-US"
        initialValue={22.22}
        min={0}
        width="lg"
      />
      <ProFormMoney
        label="限制金额最小为0"
        name="amount2"
        locale="en-US"
        initialValue={22.22}
        min={0}
      />
      <ProFormMoney label="不限制金额大小" name="amount3" locale="en-GB" initialValue={22.22} />
      <ProFormMoney label="货币符号跟随全局国际化" name="amount4" initialValue={22.22} />
      <ProFormMoney label="自定义货币符号" name="amount5" initialValue={22.22} customSymbol="💰" />
      <ProFormMoney
        label="小数点精度"
        name="amount6"
        initialValue={2222222222.222222}
        fieldProps={{ precision: 2 }}
        customSymbol="💰"
      />
    </ProForm>
  );
};
