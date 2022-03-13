/**
 * 执行终端命令相关的代码
 * child_process.spawn() 方法异步衍生子进程，不会阻塞 Node.js 事件循环
 * child_process.exec(): 衍生 shell 并在该 shell 中运行命令，完成后将 stdout 和 stderr 传给回调函数。该方法是基于child_process.spawn()实现
 */
 const { spawn } = require('child_process'); // 这个是系统进程，子进程, 一般npm install都会再开一个子进程执行程序

 // npm install 
const commandSpawn = (...args) => {           // ...args是将传递过来的几个参数合并成一个数组
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);      // ...args是将上面的数组参数拆分成一个一个参数，子进程中执行 npm install
    // 子进程终端打印信息不会出现在当前进程，这个可以将子进程中执行npm install在终端打印的信息在当前的进程中打印出来
    childProcess.stdout.pipe(process.stdout); 
    // 子进程中执行npm install在终端打印的错误信息在当前的进程中打印出来
    childProcess.stderr.pipe(process.stderr);
    // 子进程关闭， npm install 执行完成或者报错都会关闭子进程
    childProcess.on("close", () => {
      resolve();
    })
  })
}

module.exports = {
  commandSpawn
}