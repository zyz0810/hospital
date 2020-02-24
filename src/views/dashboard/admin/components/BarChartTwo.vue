<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: '门诊/治疗人数',
          // subtext: '数据来自网络',
          textStyle:{
            color :'#666',
            fontSize :'14'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['门诊人数', '治疗人数']
        },
        grid: {
          top: 50,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#666',//左边线的颜色
              width:'1'//坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666',//坐标值得具体的颜色
              fontSize:9
            }
          }
        },
        yAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#666',//左边线的颜色
              width:'1'//坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666',//坐标值得具体的颜色
              fontSize:9
            }
          },
          data: [ '其他','医院D', '医院C', '医院B', '医院A']
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: [4000, 6000, 7000, 5000, 3000],
            itemStyle:{
              normal:{
                color:'#00a9ff'
              }
            },
            barWidth : 20,
            barGap:'0',/*多个并排柱子设置柱子之间的间距*/
            barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
            animationDuration
          },
          {
            name: '2012年',
            type: 'bar',
            data: [3000, 5000, 2000, 7000, 1000],
            itemStyle:{
              normal:{
                color:'#ffb840'
              }
            },
            barWidth : 20,
            barGap:'0',/*多个并排柱子设置柱子之间的间距*/
            barCategoryGap:'3',/*多个并排柱子设置柱子之间的间距*/
            animationDuration
          }
        ]

      })
    }
  }
}
</script>
