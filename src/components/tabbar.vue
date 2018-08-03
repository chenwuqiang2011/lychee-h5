<template>
	<div class="tabbar">
		<div class="tabbar_item" :class="{active: name==='home'}" @click = "$router.push({name:'home', query:{id: id}})">
			<i class = "tabbar_home"></i>
			<p>首页</p>
		</div>
		<div class="tabbar_item" :class="{active: name==='discovery'}" @click = "$router.push('/discovery')">
			<i class = "tabbar_discovery"></i>
			<p>发现</p>
		</div>
		<div class="tabbar_item" :class="{active: name==='info'}" @click = "$router.push('/info')">
			<i class = "tabbar_info"></i>
			<p>我的</p>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			name: {
				default: ''
			}
		},
		data(){
			return {
				id: 1
			}
		},
		method: {

		},
		created(){
		
		}
	}
</script>
<style lang="scss" scoped>
	@import '../assets/style/base/base.scss';
	.tabbar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		max-width: $maxWidth;
		// width: 100%;
		height: 1.33rem;
		background: #fff;
		@extend %flexRow;
		& > div {
			flex: 1;
		}
		.tabbar_item {
			@extend %flexColumn;
			justify-content: center;
			align-items: center;
			& > i {
				width: 0.67rem;
				height: 0.67rem;
				&.tabbar_home {
					background-image: url('../assets/imgs/home.png');
					@extend %bgCenter;
				}
				&.tabbar_discovery {
					background-image: url('../assets/imgs/cart.png');
					@extend %bgCenter;
				}
				&.tabbar_info {
					background-image: url('../assets/imgs/info.png');
					@extend %bgCenter;
				}
			}
			&.active {
				& > i {
					&.tabbar_home {
						background-image: url('../assets/imgs/home_on.png');
						@extend %bgCenter;
					}
					&.tabbar_discovery {
						background-image: url('../assets/imgs/cart_on.png');
						@extend %bgCenter;
					}
					&.tabbar_info {
						background-image: url('../assets/imgs/info_on.png');
						@extend %bgCenter;
					}
				}
				& > p {
					color: #51aa38;
				}
			}
		}

	}
</style>