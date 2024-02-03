<template>

</template>

<script setup lang="ts">
const net = require('net');
const client = net.createConnection({
  host: '192.168.132.2',
  port: 1347
});
client.on('connect', () => {
  // 向服务器发送数据
  client.write('Nodejs 技术栈');

  setTimeout(() => {
    client.write('JavaScript ');
    client.write('TypeScript ');
    client.write('Python ');
    client.write('Java ');
    client.write('C ');
    client.write('PHP ');
    client.write('ASP.NET ');
  }, 1000);
})

client.on('data', buffer => {
  console.log(buffer.toString());
});

client.on('error', err => {
  console.log('服务器异常：', err);
});

client.on('close', err => {
  console.log('客户端链接断开！', err);
});
</script>

<style scoped>

</style>
