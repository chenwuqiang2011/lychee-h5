<template>
	<div class="info">
		<div class="header">头部</div>
		<div class="content">
			<div class="content_body">123</div>
		</div>
		<!-- <div class="footer">底部</div> -->
		<tabbar :name = '"info"'></tabbar>
	</div>
</template>
<script>
	import './info.scss';
	import tabbar from '../tabbar.vue';

	export default {
		name: 'info',
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