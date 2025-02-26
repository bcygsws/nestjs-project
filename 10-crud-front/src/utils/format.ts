/**
 * @desc:时间格式化
 * 使用库：date-fns
 *
 *
 * */
import {format} from 'date-fns';

function formatDate(date: number | string | Date, formatStr: string = 'yyyy-MM-dd HH:mm:ss') {
    console.log("typeof date====", typeof date);
    if ((typeof date === 'number') && date.toString().length === 10) {
        return format(new Date(date * 1000), formatStr);
    } else if (typeof date === 'string' && date.length === 10) {
        return format(new Date(parseInt(date) * 10), formatStr);
    } else {
        return format(new Date(date), formatStr);
    }
}

export default formatDate;