# vue-swipe-menu

component for vue.js 2.x

普通の選択リストと違い、A,B,C,Dと並んでいた場合、AからDに変えようとすると必ずB,C,Dと順番に選択状態が変わります。
これは無駄なことのようですが、それに合わせて画面を切り替えることで他の状態を見せる効果があり、アバターのパーツを選択するなどに使えます。

## Install
```
npm i -S vue-swipe-menu
 
// or
 
yarn add vue-swipe-menu
```

### Usage
Component example.
```
<template>
  <div id="app">
    <div class="screen">{{ currentPageA }}</div>
    <SwipeMenu class="buttons"
               :currentPage="currentPageA"
               :itemWidth="224"
               @move="onMoveA"
               @touch-end="onTouchEnd"
               @change-page="onChangePageA">
      <div class="infinity-swipe-item" v-for="(button, index) in buttonsA" :key="index">
        <button
                :class="{active: currentPageA==index+1, disabled: button.disabled}"
                @click="onButtonClickA(index+1)">
          {{button.name}}
        </button>
      </div>
    </SwipeMenu>

    <div class="screen">{{ buttonsB[currentPageB-1].color }}</div>
    <SwipeMenu class="buttons"
               :currentPage="currentPageB"
               :itemWidth="50"
               @move="onMoveB"
               @touch-end="onTouchEnd"
               @change-page="onChangePageB">
      <div class="infinity-swipe-item" v-for="(button, index) in buttonsB" :key="index">
        <button
          class="btn-color"
          :class="{active: currentPageB==index+1, disabled: button.disabled}"
          @click="onButtonClickB(index+1)" :style="'background-color:'+button.color+';'">
          {{button.color}}
        </button>
      </div>
    </SwipeMenu>
  </div>
</template>

<script>
  import InfinitySwipe from 'vue-swipe-menu';
  import 'vue-swipe-menu/dist/vue-swipe-menu.css'

  export default {
    name: 'App',
    components: {
      SwipeMenu,
    },
    data() {
      return {
        touchTime: 0,
        currentPageA: 1,
        buttonsA: [
          {name: 'メニュー１'},
          {name: 'メニュー２'},
          {name: 'メニュー３'},
          {name: 'メニュー４'},
        ],
        currentPageB: 1,
        buttonsB: [],
      };
    },
    created () {
      let count = 0;
      while (count < 50) {
        this.buttonsB.push({
          color: '#' +
            ('00' + Math.floor(Math.random()*Math.floor(255)).toString(16)).slice(-2) +
            ('00' + Math.floor(Math.random()*Math.floor(255)).toString(16)).slice(-2) +
            ('00' + Math.floor(Math.random()*Math.floor(255)).toString(16)).slice(-2)
        });
        count++;
      }
    },
    methods: {
      onButtonClickA: function (page) {
        if (this.touchTime < 300) {
          this.onChangePageA(page);
        }
      },
      onChangePageA: function (page) {
        this.currentPageA = page;
      },
      onMoveA: function (page) {
        if (page <= 0) page = 1;
        if (page > this.buttonsB.length) page = this.buttonsA.length;
        if (page !== this.currentPageA) {
          this.onChangePageA(page);
        }
      },
      onButtonClickB: function (page) {
        if (this.touchTime < 300) {
          this.onChangePageB(page);
        }
      },
      onChangePageB: function (page) {
        this.currentPageB = page;
      },
      onMoveB: function (page) {
        if (page <= 0) page = 1;
        if (page > this.buttonsB.length) page = this.buttonsB.length;
        if (page !== this.currentPageB) {
          this.onChangePageB(page);
        }
      },
      onTouchEnd: function (page, touchTime) {
        this.touchTime = touchTime;
      },
    },
  };
</script>

<style scoped>
  .screen {
    font-size: 30px;
    text-align: center;
    width: 100%;
    height: 200px;
    line-height: 200px;
  }
  .buttons {
    /*width: 100%;*/
    background-color: rgba(0, 0, 0, 0.5);
    overflow: hidden;

  }
  .buttons button {
    width: 10rem;
    margin: .5rem 2rem;
    height: 40px;
    border-radius: .5rem;
    color: rgb(128, 127, 128);
    background-color: #f0f0f0;
  }

  .buttons button.active {
    color: #000;
    background-color: #fef;
  }
  .buttons button.btn-color {
    width: 50px;
    margin: 0;
    padding: 0;
    border: 1px solid black;
    font-size: 10px;
  }
</style>

```
