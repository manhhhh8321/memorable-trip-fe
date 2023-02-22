import configs from 'config';
import { message } from 'antd';
import _ from 'lodash';

export const handleErrorMessage = (error: any) => {
  message.destroy();
  message.error(getErrorMessage(error));
  if (configs.APP_ENV !== 'prod') {
    // tslint:disable-next-line: no-console
    console.log(error);
  }
};

export const getErrorMessage = (error: any) => {
  if (_.isArray(error?.response?.data?.errors)) {
    console.log('AAA', error.response.data)

    return error?.response?.data?.errors[0] || 'Something went wrong!';
  }

  return error?.response?.data?.errors || 'Something went wrong!';
};
