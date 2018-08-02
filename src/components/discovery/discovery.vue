<template>
	<div class="discovery">
		<div class="header">头部</div>
		<div class="content">
			<div class="content_body">123</div>
		</div>
		<!-- <div class="footer">底部</div> -->
		<tabbar :name = '"discovery"'></tabbar>
	</div>
</template>
<script>
	import './discovery.scss';
	import tabbar from '../tabbar.vue';

	export default {
		name: 'discovery',
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