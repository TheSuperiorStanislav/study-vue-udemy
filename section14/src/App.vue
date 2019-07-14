<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Animations</h1>
        <hr>
        <select v-model="alertAnimation" class="form-control">
          <option value="slide">Slide</option>
          <option value="fade">Fade</option>
        </select>
        <br>
        <button class="btn btn-primary" @click="show = !show">Show Alert</button>
        <br><br>
        <!-- <transition :name="alertAnimation">
          <div class="alert alert-info" v-if="show">Hi</div>
        </transition>
        <transition appear
          enter-active-class="animated bounce"
          leave-active-class="animated shake">
          <div class="alert alert-info" v-if="show">Hi</div>
        </transition> -->
        <transition :name="alertAnimation" mode="out-in">
          <div class="alert alert-success" v-if="show" key="info">Hi</div>
          <div class="alert alert-danger" v-else key="danger">Hi</div>
        </transition>
        <hr>
        <button class="btn btn-primary" @click="load = !load">
          Load / Remove Element
        </button>
        <br><br>
        <transition 
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
          @enter-cancelled="enterCancelled"
          @before-leave="beforeLeave"
          @leave="leave"
          @after-leave="afterLeave"
          @leave-cancelled="leaveCancelled"
          :css="false">
          <div 
            style="width:1px; height:100px; background-color: lightgreen" 
            v-if="load">
          </div>
        </transition>
        <hr>
        <button class="btn btn-primary"
          @click="selectedComponent == 'app-success-alert' ? selectedComponent = 'app-danger-alert': selectedComponent = 'app-success-alert'">
          Toogle Component
          </button>
        <br><br>
        <transition :name="alertAnimation" mode="out-in">
          <component :is="selectedComponent"></component>
        </transition>
        <hr>
        <button class="btn btn-success" @click="addItem">Add</button>
        <br><br>
        <ul class="list-group">
          <transition-group :name="alertAnimation">
              <li 
                class="list-group-item" 
                v-for="(num,index) in nums"
                style="cursor: pointer"
                @click="removeItem(index)"
                :key="num">
                {{num}}
              </li>
          </transition-group>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import DangerAlert from './DangerAlert'
  import SuccessAlert from './SuccessAlert'

  export default {
    data() {
      return {
        show: true,
        alertAnimation: 'slide',
        load: false,
        elementWidth: 1,
        selectedComponent: 'app-success-alert',
        nums: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    },
    methods: {
      addItem(){
        const pos = Math.floor(Math.random() * this.nums.length);
        this.nums.splice(pos, 0, this.nums.length + 1)
      },
      removeItem(index){
        this.nums.splice(index,1)
      },
      beforeEnter(el){
        this.elementWidth = parseInt(el.style.width.replace('px',''))
        console.log('Before enter')
      },
      enter(el, done){
        console.log('enter')
        el.style.width = this.elementWidth + 'px'
        let round = 1
        const interval = setInterval(() => {
          el.style.width = (this.elementWidth + round * 10) + 'px';
          round++
          if (this.elementWidth + round * 10 >= 400){
            clearInterval(interval)
            done()
          } 
        }, 20)
      },
      afterEnter(el){
        console.log('After enter')
      },
      enterCancelled(el){
        console.log('Canceled enter')
      },
      beforeLeave(el){
        this.elementWidth = parseInt(el.style.width.replace('px',''))
        console.log('Before leave')
      },
      leave(el, done){
        console.log('leave')
        el.style.width = this.elementWidth + 'px'
        let round = 1
        const interval = setInterval(() => {
          el.style.width = (this.elementWidth - round * 10) + 'px';
          round++
          if (this.elementWidth - round * 10 <= 0){
            clearInterval(interval)
            done()
          } 
        }, 20)
      },
      afterLeave(el){
        console.log('After leave')
      },
      leaveCancelled(el){
        console.log('Canceled leave')
      }
    },
    components: {
      appDangerAlert: DangerAlert,
      appSuccessAlert: SuccessAlert,
    }
  }
</script>

<style>
  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 1s;
  }

  /* .fade-leave {
    opacity: 1;
  } */

  .fade-leave-active {
    transition: opacity 1s;
    opacity: 0;
  }

  .slide-enter {
    opacity: 0;
  }

  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
    transition: opacity .5s;
  }

  /* .slide-leave {
    opacity: 1;
  } */

  .slide-leave-active {
    animation: slide-out 1s ease-out forwards;
    transition: opacity .5s;
    opacity: 0;
    position: absolute;
  }

  .slide-move {
    transition: transform 1s;
  }

  @keyframes slide-in {
    from {
      transform: translateY(1.5em);
    }
    to{
      transform: translateY(0);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
    }
    to{
      transform: translateY(1.5em);
    }
  }
</style>
