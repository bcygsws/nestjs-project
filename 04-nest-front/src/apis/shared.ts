// 定义后端返回的数据结构
interface ResType<T> {
    code: number
    message: string
    data?: T
}

export default ResType;