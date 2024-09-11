## MYSQL 连接 Docker

### Navicat 连接本地 mysql 服务

-   安装好本地 mysql，本机版本为 8.0.34
-   在 cmd 窗口，以管理员方式打开，输入 net start mysql 命令
-   在 navicat 创建一个 mysql 连接，默认端口号是 3306，用户名和密码是自己安装数据库时的账号、密码（例如：root/123456）

### 重点 navicat 连接远程 mysql 服务

-   1.按照映射端口 3091 创建 mysql 的一个容器 mysql-test2: docker run --name mysql-test2 -p 3091:3306 -e MYSQL_ROOT_PASSWORD=root123456 -d mysql
-   2.在 navicat 中创建 mysql 连接，测试数据库服务是否创建成功
-   3.配置：主机：localhost 端口：采用了 3091 映射了服务器默认端口 3306，该连接中端口：填入 3091，密码：root123456
-   4.根据配置 3 创建一个 mysql 连接，测试也是可以连接成功的
