// 环境变量 在debug.js 与 online.js 中通过挂在在window上进行存储和访问
export const GLOBAL_ENV_KEY = 'GAD_MOBILE_ENV';
export const GLOBAL_ENV_PRODUCTION = 'ONLINE';
export const GLOBAL_ENV_DEV = 'DEV';
export const GLOBAL_ENV_LOCAL = 'LOCAL';
// 获取环境域名
export const getEnvHostName = () => {
    const env = window[GLOBAL_ENV_KEY];
    if (env === GLOBAL_ENV_LOCAL) {
        return 'h5.com';
    } else if (env === GLOBAL_ENV_DEV) {
        return 'dev.com';
    } else {
        return 'online.com';
    }
};
