import 'virtual:svg-icons-register'; //注册svg-icon
import { createApp } from 'vue';
import App from './App.vue';
import mDirectives from './directives';
import mLibs from './libs';
import './permission';
import router from './router';
import store from './store';
import './styles/index.scss';
import { useRem } from './utils/flexible';
import useTheme from './utils/theme';

useRem();
useTheme();
const app = createApp(App);
app.use(router);
app.use(store);
app.use(mLibs); //自定义组件
app.use(mDirectives); //自定义指令

app.mount('#app');

// createApp(App).use(router).mount("#app");
