<p align="center">
  <a href="https://circleci.com/gh/gitivon/decorators/tree/dev"><img src="https://img.shields.io/circleci/project/gitivon/decorators/dev.svg" alt="Build Status"></a>
  <!-- <a href="https://codecov.io/github/vuejs/vue?branch=dev"><img src="https://img.shields.io/codecov/c/github/vuejs/vue/dev.svg" alt="Coverage Status"></a> -->
  <a href="https://www.npmjs.com/package/@gitivon/decorators"><img src="https://img.shields.io/npm/dm/@gitivon/decorators.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/@gitivon/decorators"><img src="https://img.shields.io/npm/v/@gitivon/decorators.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@gitivon/decorators"><img src="https://img.shields.io/npm/l/@gitivon/decorators.svg" alt="License"></a>
  <!-- <a href="https://chat.@gitivon/decoratorsjs.org/"><img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg" alt="Chat"></a> -->
  <!-- <br> -->
  <!-- <a href="https://saucelabs.com/u/vuejs"><img src="https://saucelabs.com/browser-matrix/vuejs.svg" alt="Sauce Test Status"></a> -->
</p>

## 提供多种修饰器

* middleware
* once
* sleep

### middleware
将方法修饰器进行简化，改造成类似 koa 中间件的形式，避免直接对 PropertyDescriptor 进行操作

### once
对方法运行结果进行缓存，可以实现类似单例的操作  
_todo: 增加入参的识别_

### sleep
你懂得，先sleep再执行

## install

``` shell
npm i @gitivon/decorators -D
```