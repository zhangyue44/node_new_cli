const { program } = require('commander');

const helpOptions = () => {
  // 定义选项
  program.option('-y --yue', 'a yue cli')
  program.option('-d --dest <dest>', 'a destination folder, 例如: -d /src/components')
  program.option('-f --framework <framework>', 'your framework')

  // 监听事件，当命令行中使用 zyues --help 时会触发这个函数
  program.on('--help', () => {
    console.log('other options ...');
  })
}

module.exports = helpOptions