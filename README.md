> 在使用此案例前，请确保安装了nodejs

## 执行命令

``` bash
# 安装依赖，执行这个命令后会创建node_modules目录和package-lock.json文件
# 现在项目中已经安装好依赖了，不用再执行这个命令了
npm install

# 开发环境默认使用8080端口
# 如果想改用其他端口，请修改config/index.js文件中的port字段值
npm run dev

# 编译上线代码
npm run build
```
