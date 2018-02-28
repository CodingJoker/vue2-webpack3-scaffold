// 开启移动端测试工具
import eruda from 'Plugins/eruda/eruda';
import { GLOBAL_ENV_KEY, GLOBAL_ENV_DEV } from './_env';
eruda.init();
// 设置环境变量
window[GLOBAL_ENV_KEY] = GLOBAL_ENV_DEV;
