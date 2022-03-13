#!/usr/bin/env node

const { program } = require('commander');

const helpOptions = require('./lib/core/help') // 定义选项
const createCommands = require('./lib/core/create') // 配置命令

program.version(require('./package.json').version) // 动态查看版本号

helpOptions()
createCommands()

program.parse(process.argv) // 解析终端指令