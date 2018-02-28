import { GLOBAL_ENV_KEY, GLOBAL_ENV_PRODUCTION } from './_env';
window[GLOBAL_ENV_KEY] = GLOBAL_ENV_PRODUCTION;

// 关闭调试面板
Vue.config.devtools = false;
