import {format} from 'date-fns';
/**
 * @param date 时间戳或Date对象
 * @param formatStr
 * 1.秒级时间戳：10位，毫秒级时间戳：13位
 * 2.做一步判断，转化为毫秒时间戳
 * 参考文档：
 * https://blog.csdn.net/2401_83384536/article/details/140587755
 *
 * */

export function formatDate(date: number | Date, formatStr: string = 'yyyy-MM-dd HH:mm:ss') {
    if (typeof date === 'number' && date.toString().length == 10) {
        return format(new Date(date * 1000), formatStr);
    } else {
        return format(new Date(date), formatStr);
    }
}