const { program } = require('commander');
const {  createProjectAction, addComponentAction, addPageAndRouteAction, addStoreAction } = require('./actions');

const createCommands = () => {
  program
  .command('create <project> [others...]')          // 定义指令使用方法
  .description('clone a repository into a folder')  // 描述指令的作用
  .action(createProjectAction);                     // 执行指令时回调的函数

  program
    .command('addcpn <name>')
    .description('add vue component, 例如: why addcpn HelloWorld [-d src/components]')
    .action((name) => {
      addComponentAction(name, program.dest || 'src/components');  // program.dest就是终端中 -d 后面的路径参数
    });

  program
    .command('addpage <page>')
    .description('add vue page and router config, 例如: why addpage Home [-d src/pages]')
    .action((page) => {
      addPageAndRouteAction(page, program.dest || 'src/pages')
    })
  
  program
    .command('addstore <store>')
    .description('add vue store config, 例如: why addstore Home [-d src/store/modules]')
    .action((store) => {
      addStoreAction(store, program.dest || 'src/store/modules')
  })
}

module.exports = createCommands