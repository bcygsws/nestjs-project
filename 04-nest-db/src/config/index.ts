/**
 * @name:
 * @desc:配置签名的密钥
 * 在auth.module中注册register时要使用两个常量
 *
 * */
export const jwtConstant = {
    secret: 'my secret key',
    expiresIn: '30m'
    // algorithm: 'HS256'
}