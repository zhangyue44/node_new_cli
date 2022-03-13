# 说明文档
## `zhangyue44`: 一个帮助你快速搭建和开发前端项目的CLI

如何安装？

```shell
npm install zyvue -g
```

## 查看版本
```shell
zyvue --version
```

## 创建项目
```shell
zyvue create your_project_name
```
自动拉取项目模板、安装项目依赖、打开浏览器 `http://localhost:8080/`、自动启动项目

## 项目开发

项目开发目前提供三个功能：

* 创建Vue组件
* 创建Vue页面，并配置路由
* 创建Vuex子模块

````shell
zyvue addcpn YourComponentName # 例如zyvue add NavBar，默认会存放到src/components文件夹中
zyvue addcpn YourComponentName -d src/pages/home # 也可以指定存放的具体文件夹
````

```shell
zyvue addpage YourPageName # 例如zyvue addpage Home，默认会放到src/pages/home/Home.vue中，并且会创建src/page/home/router.js
zyvue addpage YourPageName -d src/views # 也可以指定文件夹，但需要手动集成路由
```
```js
// 动态加载pages中所有的路由文件
const files = require.context('@/pages', true, /router\.js$/);
const routes = files.keys().map(key => {
  const page = require('@/pages' + key.replace('.', ''));
  return page.default;
})
```

```shell
zyvue addstore YourVuexChildModuleName # 例如zyvue addstore home，默认会放到src/store/modules/home/index.js和types.js
zyvue addstore YourVuexChildModuleName -d src/vuex/modules # 也可以指定文件夹
```
```js
// 动态加载modules
const modules = {}
const files = require.context('./', true, /index\.js$/);
files.keys().filter(key => {
  if (key === './index.js') return false;
  return true
}).map(key => {  
  // 获取名字
  const modulePath = key.replace('./modules/', '');
  const moduleName = modulePath.replace('/index.js', '');
  const module = require(`${key}`);

  modules[`${moduleName}`] = module.default;
})