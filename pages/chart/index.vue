<template>
	<div class="container">
		<div id="areaChart"></div>
		<div id="barChart"></div>
		<div id="lineChart"></div>
		<div id="timeseriesChart"></div>
		<div id="donutChart"></div>
		<div id="pieChart"></div>
	</div>
</template>

<script setup>
	import bb, { area, areaSpline, bar, donut, pie } from 'billboard.js';
	onMounted(() => {
		const areaChart = bb.generate({
			data: {
				columns: [
					['data1', 200, 350, 300, 0, 20, 400],
					['data2', 130, 100, 140, 200, 150, 50],
				],
				types: {
					data1: area(), // for ESM specify as: area()
					data2: areaSpline(), // for ESM specify as: areaSpline()
				},
			},
			bindto: '#areaChart',
		});

		const barChart = bb.generate({
			data: {
				columns: [
					['data1', 10, 20, 30, 40, 50],
					['data2', 30, 150, 10, 70, 50],
				],
				type: bar(),
			},
			bar: {
				width: {
					ratio: 0.5,
				},
			},
			bindto: '#barChart',
		});

		const lineChart = bb.generate({
			data: {
				columns: [
					['data1', 30, 200, 100, 400, 150, 250],
					['data2', 50, 20, 10, 40, 15, 25],
				],
				type: 'line', // for ESM specify as: line()
			},
			bindto: '#lineChart',
		});

		const timeseriesChart = bb.generate({
			data: {
				x: 'x',
				columns: [
					['x', '2022-01', '2022-02', '2022-03', '2022-04', '2022-05', '2022-06'],
					['data1', 30, 200, 100, 400, 150, 250],
					['data2', 130, 340, 200, 500, 250, 350],
				],
				type: 'line', // for ESM specify as: line()
			},
			axis: {
				x: {
					type: 'timeseries',
					tick: {
						format: '%Y-%m',
					},
				},
			},
			bindto: '#timeseriesChart',
		});

		const donutChart = bb.generate({
			data: {
				columns: [
					['data1', 30],
					['data2', 120],
					['data3', 66],
					['data4', 66],
				],
				type: donut(), // for ESM specify as: donut()
				onclick: function (d, i) {
					console.log('onclick', d, i);
				},
				onover: function (d, i) {
					console.log('onover', d, i);
				},
				onout: function (d, i) {
					console.log('onout', d, i);
				},
			},
			donut: {
				title: 'Iris Petal Width',
			},
			bindto: '#donutChart',
		});

		const pieChart = bb.generate({
			data: {
				columns: [
					['data1', 30],
					['data2', 120],
					['data3', 66],
					['data4', 66],
				],
				type: pie(), // for ESM specify as: pie()
			},
			bindto: '#pieChart',
		});

		areaChart.resize({ width: 600, height: 300 });
		barChart.resize({ width: 600, height: 300 });
		lineChart.resize({ width: 600, height: 300 });
		timeseriesChart.resize({ width: 600, height: 300 });
		donutChart.resize({ width: 600, height: 600 });
		pieChart.resize({ width: 600, height: 600 });
	});
</script>

<style lang="scss" scoped>
	.container {
		margin-top: 50px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		> div {
			margin: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 50%;
		}
	}
</style>
