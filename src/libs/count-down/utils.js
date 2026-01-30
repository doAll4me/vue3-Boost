// dayjs有关的内容
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import duration from 'dayjs/plugin/duration';

// 处理中文国际化
dayjs.locale('zh');

// 处理当前倒计时的duration
dayjs.extend(duration);

export default dayjs;
