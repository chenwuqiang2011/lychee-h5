<template>
	<div class="home">
		<div class="header">头部</div>
		<div class="content">
			<div class="content_body">123</div>
		</div>
		<!-- <div class="footer">底部</div> -->
		<tabbar :name = '"home"'></tabbar>
	</div>
</template>
<script>
	import './home.scss';
	import tabbar from '../tabbar.vue';

	export default {
		name: 'home',
		components: {
			tabbar
		},
		data () {
			return {

			}
		},
		created () {

		},
		mounted () {

		},
		method: {

		}
	}
	
</script>