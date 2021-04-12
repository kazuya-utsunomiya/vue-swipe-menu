<template>
  <div id="app">
    <h1>Menu Button demo</h1>
    <div class="screen">{{ currentPageA }}</div>
    <SwipeMenu class="buttons"
               :loop="true"
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

    <h1>Color Button demo</h1>
    <div class="screen" :style="{backgroundColor: buttonsB[currentPageB-1].color}">{{ buttonsB[currentPageB-1].color }}</div>
    <SwipeMenu class="buttons"
               :loop="true"
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

    <h1>Full width button demo</h1>
    <SwipeMenu class="buttons"
               :class="{hasPrev: currentPageC > 1, hasNext: currentPageC < buttonsC.length}"
               :currentPage="currentPageC"
               :itemWidth="contentWidth"
               :center="true"
               @move="onMoveC"
               @touch-end="onTouchEnd"
               @change-page="onChangePageC">
      <div class="infinity-swipe-item" v-for="(button, index) in buttonsC" :key="index">
        <button
          style="position: relative; width:100vw; margin: 0; border: 1px solid gray; border-radius: 0;"
          @click="onButtonClickC(index+1)">
          {{button.name}}
          <div class="arrow_prev" v-if="index > 0" @click.stop="onButtonClickC(index)">≪</div>
          <div class="arrow_next" v-if="index + 1 < buttonsC.length" @click.stop="onButtonClickC(index+2)">≫</div>
        </button>
      </div>
    </SwipeMenu>
    <div v-html="buttonsC[currentPageC-1].detail"></div>
  </div>
</template>

<script>
  import SwipeMenu from './components/SwipeMenu.vue';

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
        currentPageC: 1,
        buttonsC: [
          {name: 'ページA', detail: '春はあけぼの<br>やうやう白くなりゆく山際<br>少し明かりて<br>紫だちたる雲の細くたなびきたる'},
          {name: 'ページB', detail: '夏は夜<br>月のころはさらなり<br>闇もなほ<br>蛍の多く飛びちがひたる<br>また、ただ一つ二つなど<br>ほのかにうち光て行くもをかし<br>雨など降るもをかし'}
          ],
        contentWidth: null,
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
    mounted () {
      window.addEventListener('resize', this.handleResize);
      setTimeout(() => {
        this.handleResize();
      }, 300);
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleResize);
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

      onButtonClickC: function (page) {
        if (this.touchTime < 300) {
          this.onChangePageC(page);
        }
      },
      onChangePageC: function (page) {
        this.currentPageC = page;
      },
      onMoveC: function (page) {
        if (page <= 0) page = 1;
        if (page > this.buttonsC.length) page = this.buttonsC.length;
        if (page !== this.currentPageC) {
          this.onChangePageC(page);
        }
      },

      onTouchEnd: function (page, touchTime) {
        this.touchTime = touchTime;
      },
      handleResize: function () {
        this.contentWidth = document.getElementById('app').clientWidth;
      },
    },
  };
</script>

<style scoped>
  h1 {
    margin-top: 50px;
    text-align: center;
  }
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
  .arrow_prev {
    position: absolute;
    top: 0;
    left: 10px;
    z-index: 2;
    line-height: 40px;
  }
  .arrow_next {
    position: absolute;
    top: 0;
    right: 10px;
    content: '≫';
    z-index: 2;
    line-height: 40px;
  }
</style>

