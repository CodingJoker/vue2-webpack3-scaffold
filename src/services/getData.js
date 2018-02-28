import axios from './http';
export const UserInfo = () => axios(`/auth/mobile/user`);
// 数据接口getSomeThings
export const getSomeThings = ({
    param1,
    param2
}) => axios(`/api?params1=${param1}&params2=${param2}`);
