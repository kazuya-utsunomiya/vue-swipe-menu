<template>
  <div class="swipe_menu"
       :class="[{'dragging': dragging}]"
       @touchstart="_onTouchStart"
       @mousedown="_onTouchStart"
       @wheel="_onWheel">
    <div class="wrapper"
         ref="swipeWrapper"
         :style="styleObject"
         @transitionend="_onTransitionEnd">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SwipeMenu',
    props: {
      currentPage: {
        type: Number,
        default: 1
      },
      loop: {
        type: Boolean,
        default: false
      },
      speed: {
        type: Number,
        default: 500
      },
      center: {
        type: Boolean,
        default: true
      },
      itemWidth: {
        type: Number,
        default: 100
      }
    },
    data () {
      return {
        lastPage: 1,
        translateX: 0,
        startTranslate: 0,
        startTime: 0,
        delta: 0,
        dragging: false,
        startPos: null,
        transitioning: false,
        slideEls: [],
        translateOffset: 0,
        transitionDuration: 0,
        centerOffset: 0,
        bulletWidth: null,
      };
    },
    computed: {
      styleObject: function () {
        return {
          transform: 'translate3d(' + this.translateX + 'px, 0, 0)',
          transitionDuration: this.transitionDuration + 'ms'
        };
      },
    },
    mounted () {
      this.$nextTick(function () {
        if (this.center) {
          this.handleResize();
          this.translateOffset = this.centerOffset;
        }
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        this.slideEls = [].map.call(this.$refs.swipeWrapper.children, el => el);
        if (this.loop) {
          this.$nextTick(function () {
            this._createLoop();
            this.setPage(this.currentPage, true);
          });
        } else {
          this.setPage(this.currentPage);
        }
      });
    },
    watch: {
      currentPage: function (page) {
        if (this.center) {
          this.handleResize();
          this.translateOffset = this.centerOffset;
        }
        this.slideEls = [].map.call(this.$refs.swipeWrapper.children, el => el);
        this.setPage(page, false);
      }
    },
    methods: {
      next () {
        let page = this.currentPage;
        if (page < this.slideEls.length || this.loop) {
          this.setPage(page + 1);
        } else {
          this._revert();
        }
      },
      prev () {
        let page = this.currentPage;
        if (page > 1 || this.loop) {
          this.setPage(page - 1);
        } else {
          this._revert();
        }
      },
      setPage (page, noAnimation) {
        if (!this.dragging) {
          let self = this;
          if (this.loop) {
            if (this.delta === 0) {
              this._setTranslate(self._getTranslateOfPage(this.lastPage));
            }
            setTimeout(function () {
              self._setTranslate(self._getTranslateOfPage(page));
              if (noAnimation) return;
              self._onTransitionStart();
            }, 0);
          } else {
            this._setTranslate(this._getTranslateOfPage(page));
            if (noAnimation) return;
            this._onTransitionStart();
          }
        }

        if (this._isPageChanged()) this.$emit('change-page', page);
        this.lastPage = this.currentPage;
      },
      _onTouchStart (e) {
        this.startPos = this._getTouchPos(e);
        this.delta = 0;
        this.startTranslate = this._getTranslateOfPage(this.currentPage);
        this.startTime = new Date().getTime();
        this.dragging = true;
        this.transitionDuration = 0;
        document.addEventListener('touchmove', this._onTouchMove, {passive: false});
        document.addEventListener('touchend', this._onTouchEnd, false);
        document.addEventListener('mousemove', this._onTouchMove, false);
        document.addEventListener('mouseup', this._onTouchEnd, false);
      },
      _onTouchMove (e) {
        this.delta = this._getTouchPos(e) - this.startPos;
        this._setTranslate(this.startTranslate + this.delta);

        const translate = Math.abs(this._getTranslate() - this.translateOffset);
        const page = Math.ceil((translate + this.itemWidth / 2) / this.itemWidth);

        if (page !== this.currentPage) {
          this.setPage(page);
        }

        this.$emit('move', page);
        if (Math.abs(this.delta) > 0) {
          e.preventDefault();
        }
      },
      _onTouchEnd () {
        this.dragging = false;
        this.transitionDuration = this.speed;
        this.setPage(this.currentPage);

        document.removeEventListener('touchmove', this._onTouchMove);
        document.removeEventListener('touchend', this._onTouchEnd);
        document.removeEventListener('mousemove', this._onTouchMove);
        document.removeEventListener('mouseup', this._onTouchEnd);
        this.$emit('touch-end', this.currentPage, new Date().getTime() - this.startTime);
      },
      _onWheel () {
      },
      _revert () {
        this.setPage(this.currentPage);
      },
      _getTouchPos (e) {
        let key = 'pageX';
        return e.changedTouches ? e.changedTouches[0][key] : e[key];
      },
      _onTransitionStart () {
        this.transitioning = true;
        this.transitionDuration = this.speed;
        if (this._isPageChanged()) {
          this.$emit('change-start', this.currentPage);
        } else {
          this.$emit('revert-start', this.currentPage);
        }
      },
      _onTransitionEnd () {
        this.transitioning = false;
        this.transitionDuration = 0;
        this.delta = 0;
        if (this._isPageChanged()) {
          this.$emit('change-end', this.currentPage);
        } else {
          this.$emit('revert-end', this.currentPage);
        }
      },
      _isPageChanged () {
        return this.lastPage !== this.currentPage;
      },
      _setTranslate (value) {
        let translateName = 'translateX';
        this[translateName] = value;
      },
      _getTranslate () {
        let translateName = 'translateX';
        return this[translateName];
      },
      _getTranslateOfPage (page) {
        if (page === 0) return 0;
        let propName = 'clientWidth';
        return -[].reduce.call(this.slideEls, function (total, el, i) {
          return i > page - 2 ? total : total + el[propName];
        }, 0) + this.translateOffset;
      },
      _createLoop () {
          // @todo
        //        this.swipe.buttons = this.swipe.buttons.concat(this.swipe.buttons);
      },
      handleResize () {
        if (!this.bulletWidth) {
          this.bulletWidth = 160;
          if (this.$refs.swipeWrapper.children[0]) {
            this.bulletWidth = this.$refs.swipeWrapper.children[0].clientWidth;
          }
        }
        let currentCenterOffset = Math.round(this.$el.clientWidth / 2 - (this.bulletWidth / 2));
        if (this.centerOffset !== currentCenterOffset) {
          this.centerOffset = currentCenterOffset;
          this.translateOffset = this.centerOffset;
          this.setPage(this.currentPage);
        }
        if (this.center) {
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(() => {
              this.handleResize();
            });
          } else {
            setTimeout(() => {
              this.handleResize();
            }, 1000);
          }
        }
      }
    },
    serverCacheKey: props => props.show
  };
</script>

<style scoped>
  .swipe_menu {
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    -webkit-transition-property: -webkit-transform;
    transition-property: transform;
    box-sizing: content-box;
  }
</style>
