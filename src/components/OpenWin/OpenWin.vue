<!--  -->
<template>
	<div>
		
	</div>
</template>

<script>
	export default {
		name: 'OpenWin',
		display: 'OpenWin打开页面',
		data() {
			return {
				
			}
		},
		props: {
			isOpenWin: { // 控制是否OpenWin打开页面
				type: Object,
				default: ()=>({})
			},
		},
		watch: {
			isOpenWin:function(newval){
				if(newval) {
					console.log('newval：：：：：：：：'+JSON.stringify(newval));
					this.$router.push({name:newval.name});
				}
			},
		},
		computed: {

		},
		methods: {
			
		},
	}
</script>

<style scoped lang="scss">
	
</style>
