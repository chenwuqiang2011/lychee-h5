<template>
	<div class="package">
		<div class="wrapper" ref = "wrapper">
			<div class="content">
				<p v-for = "item in 100">{{item}}</p>
			</div>
		</div>
		<div class="wrapper" ref = "subWrapper">
			<div class="content">
				<p v-for = "item in 100">{{item}}</p>
			</div>
		</div>
	</div>
</template>
<script>
	import Bscroll from 'better-scroll';
	export default {
		props: {
			show: {
				type: Boolean,
				default: true
			}
		},
		data () {
			return {
				index: 1
			}
		},
		mounted () {
			this.$nextTick(() => {  //better-scroll的实例初始化要放在vm.$nextTick()里面才生效
				// DOM已经更新完成
				this.init();
			});
		},
		methods: {
			choosed (idx) {
				this.index = idx; 
			},
			init () {
				this.scroll = new Bscroll(this.$refs.wrapper, { 
					click : true, 
					mouseWheel: true,
					taps: true,
					preventDefault: true,
					preventDefaultException: {
						tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
					}
				});
				this.scroll.on('touchEnd', (pos) => {
				}) 

				this.subScroll = new Bscroll(this.$refs.subWrapper, { 
					click : true, 
					mouseWheel: true,
					taps: true,
					preventDefault: true,
					preventDefaultException: {
						tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
					}
				});
			}
		}
	}
</script>
<style lang="scss" scoped="">
@import '../assets/style/base/base.scss';
@import '../assets/style/color/color.scss';
	.package {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		.wrapper {
			border: 1px solid #ccc;
			flex: 1;
			overflow-y: auto;
			
		}
	}
</style>