import 'virtual:svg-icons-register'; //注册svg-icon
import { createApp } from 'vue';
import App from './App.vue';
import mLibs from './libs';
import router from './router';
import store from './store';
import './styles/index.scss';
import { useRem } from './utils/flexible';

useRem();
const app = createApp(App);
app.use(router);
app.use(store);
app.use(mLibs); //自定义组件
app.mount('#app');

// createApp(App).use(router).mount("#app");
