<template>
	<div class="counter">
	      <button @click="handleDecrease" class="decrease" type="button" >-</button>
		  
	      <span class="number">{{value}}</span>
	      <button @click="handleIncrease" class="increase" type="button" >+</button>
	</div>
</template>

<script>
	export default {
		props: ['value','min','max','step'],
		methods: {
			handleIncrease() {
				if(this.value >= this.max){
					return
				}
				var step = this.step;
				this.$emit('up',step);
			},
			handleDecrease() {
				if(this.value <= this.min){
					return
				}
				var step = this.step;
				this.$emit('down',step);
			}
		}
	}
</script>

<style>
	.counter {
		display: flex;
		align-items: center;
		width: 200px;
	}
	
	.counter .decrease,
	.counter .increase {
		padding: 6px 20px;
		border: 1px solid #999999;
		border-radius: 3px;
		font-size: 18px;
	}
	
	.counter .decrease {
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
	}
	
	.counter .increase {
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
	}
	
	.number {
		padding: 6px;
		text-align: center;
		min-width: 90px;
		border-top: 1px solid #999999;
		border-bottom: 1px solid #999999;
	}
</style>
