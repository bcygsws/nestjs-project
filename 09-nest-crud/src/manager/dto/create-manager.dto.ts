export class CreateManagerDto {
    name: string;
    money: number
}

// 转账操作中，需要传的三个参数
export class TransferMoneyDto {
    fromId: number;
    toId: number;
    money: number;
}