<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
      default: '300px'
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
          text: '各项目营收',
          // subtext: '各项目营收',
          left: '0',
          textStyle:{
            color :'#666',
            fontSize :'14'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: '10',
          data: ['西药','心电图检查','B超检查','CT检查','其他',],
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: [{name:'西药',value:180},{name:'心电图检查',value:20},{name:'B超检查',value:50},{name:'CT检查',value:10},,{name:'其他',value:50}],
            itemStyle: {
              normal: {
                color:function(params) {
                  //自定义颜色
                  var colorList = ['#00a9ff','#ffb840','#ff5a46','#00bd9f','#785fff'];
                  return colorList[params.dataIndex]
                }

              }

            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
