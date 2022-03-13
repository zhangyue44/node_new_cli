const { promisify } = require('util');
const path = require('path');
const download = promisify(require('download-git-repo'));
const open = require('open');
const { vueRepo } = require('../config/repo-config');
const { commandSpawn } = require('../utils/terminal');
const { compile, writeToFile, createDirSync } = require('../utils/utils');
const { hint } = require('../utils/logs')

const createProjectAction = async (project) => {
  hint('zyues helps you create your project~')
  // 1.clone项目
  await download(vueRepo, project, { clone: true });
  // 2.执行npm install
  // mac电脑终端中输入npm就是执行的npm,而win电脑终端中输入npm其实是执行 npm.cmd
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';         // process.platform可以判断平台 http://nodejs.cn/api/process.html#processplatform
  // cwd是启动服务的绝对路径，因为刚在此服务下克隆了project项目，所以要进入project中进行 npm install
  await commandSpawn(command, ['install'], { cwd: `./${project}` }) 
  // 3.运行npm run serve
  // 这里不加await是因为加了await后npm run serve不会关闭程序，不会执行后面的resolve,会造成代码阻塞，也不会执行下面的open函数
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` });
  // 4.打开浏览器
  open("http://localhost:8080/");
}

const addComponentAction = async (name, dest) => {
  // 1.编译ejs模板 result
  const result = await compile("vue-component.ejs", {name, lowerName: name.toLowerCase()});
  // 2.创建与写入文件
  const targetPath = path.resolve(dest, `${name}.vue`);
  writeToFile(targetPath, result);
}
// 添加组件和路由
const addPageAndRouteAction = async (name, dest) => {
  // 1.编译ejs模板
  const data = {name, lowerName: name.toLowerCase()};
  const pageResult = await compile('vue-component.ejs', data);
  const routeResult = await compile('vue-router.ejs', data);
  // 2.创建与写入文件
  const targetDest = path.resolve(dest, name.toLowerCase()); // 这里才到新建的文件夹
  if (createDirSync(targetDest)) {  // 通过这个函数新建文件夹
    const targetPagePath = path.resolve(targetDest, `${name}.vue`);
    const targetRoutePath = path.resolve(targetDest, 'router.js')
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, routeResult);
  }
}

const addStoreAction = async (name, dest) => {
  // 1.编译ejs模板
  const storeResult = await compile('vue-store.ejs', {});
  const typesResult = await compile('vue-types.ejs', {});
  // 2.创建文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.js`);
    const targetRoutePath = path.resolve(targetDest, 'types.js')
    writeToFile(targetPagePath, storeResult);
    writeToFile(targetRoutePath, typesResult);
  }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
}