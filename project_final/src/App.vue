<template>
    <div class="container">
      <app-header></app-header>
      <div class="row">
        <div class="col-ms-12">
          <transition name="slide" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
</template>

<script>
  import Header from './components/Header'
  export default {
    components:{
      appHeader: Header
    },
    created() {
      this.$store.dispatch('initStocks')
    },
  }
</script>

<style>
  body {
    padding: 1em;
  }

  .slide-enter-active {
		animation: slide-in 0.3s ease-out forwards;
	}

	.slide-leave-active {
		animation: slide-out 0.3s ease-out forwards;
	}

	@keyframes slide-in {
		from {
			transform: translateX(-3em);
      opacity: 0;
		}
		to {
			transform: translateX(0);
      opacity: 1;
		}
	}

	@keyframes slide-out {
		from {
			transform: translateX(0);
      opacity: 1;
		}
		to {
			transform: translateX(3em);
      opacity: 0;
		}
	}
</style>
