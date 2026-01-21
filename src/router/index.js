import { createRouter, createWebHistory } from "vue-router";
import { isMobileTerminal } from "../utils/flexible";
import mobileRoutes from "./modules/mobile-routes";
import pcRoutes from "./modules/pc-routes";

const router = createRouter({
  history: createWebHistory(), //是函数！！！
  // 判断是否为移动端设备，如果是的话用mobile-routes，不是的话用pc-routes
  routes: isMobileTerminal.value ? mobileRoutes : pcRoutes,
});

export default router;
