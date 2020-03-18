<template>
  <div class="app-container" style="background-color: rgb(240, 242, 245);">
    <div class="title">咨询师绩效</div>
    <el-row>
      <MChart :chart-data="mixChartData" :divwidth="'90%'" :BarChartLegend="mixChartLegend"/>
    </el-row>
    <div class="title">医生绩效</div>
    <el-row style="margin-bottom: 20px;">
      <BarChartThree :chart-data="BarChartThreeData" :BarChartLegend="BarChartLegend" :divwidth="'90%'" :height="'500px'"/>
    </el-row>

    <el-row>
      <MChartTwo :chart-data="mixChartDataTwo" :divwidth="'90%'" :BarChartLegend="mixChartLegendTwo" />
    </el-row>
  </div>
</template>

<script>

  import { doctorsTurnover } from '@/api/performance'
import MChart from '@/components/Charts/MixChart'
import MChartTwo from '@/components/Charts/MixChartTwo'
import BarChartThree from '@/components/Charts/BarChartThree'
const animationDuration = 2000;
const colorList=['#00a9ff','#ffb840','#ff5a46','#00bd9f','#785fff']
export default {
  name: 'MixChart',
  components: { MChart,MChartTwo,BarChartThree },
  data(){
    return{
      BarChartLegend:[],
      BarChartThreeData:{
        title: {
          text: '当月医生创收排行',
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
          data: ['住院收入', '门诊收入'],
          show:false
        },
        grid: {
          top: 50,
          left: '2%',
          right: '50',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          name:'创收',
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
          name:'医生',
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
          data: []
        },
        series: []
      },
      mixChartLegend:[{
        color:'#00a9ff',
        name:'咨询人数',
        type:'bar'
      },{
        color:'#ffb840',
        name:'转换人数',
        type:'line'
      }],
      mixChartData:{
        title: {
          text: '当月咨询人数/转换人数',
          // subtext: '数据来自网络'
          textStyle:{
            color :'#666',
            fontSize :'12'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          orient: 'vertical',
          right: 0,
          top: 0,
          bottom: '10',
          data: ['咨询人数', '转换人数'],
          show:false
        },
        grid: {
          top: 70,
          left: '2%',
          right: '80',
          bottom: '3%',
          containLabel: true
        },

        xAxis: {
          type: 'category',
          name:'咨询师      ',
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
          axisTick: {
            alignWithLabel: true
          },
          data: ['张咨询', '李咨询', '王咨询', '郑咨询', '周咨询', '陈咨询','黄咨询']
        },
        yAxis: {
          type: 'value',
          name:'咨询次数        ',
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
          axisTick: {
            show: false
          },
          boundaryGap: [0, 0.01]
        },
        series: [
          {
            name: '咨询人数',
            type: 'bar',
            itemStyle:{
              normal:{
                color:'#00a9ff'
              }
            },
            barWidth : '20%',
            barGap:'0',/*多个并排柱子设置柱子之间的间距*/
            barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
            data: [100, 90, 160, 126, 130, 101,80],
            animationDuration
          },
          {
            name: '转换人数',
            type: 'line',
            symbol:'circle',
            symbolSize: 10,
            itemStyle:{
              normal:{
                color:'#ffb840',
                lineStyle: {
                  width:5// 0.1的线条是非常细的了
                }
              }
            },

            data: [80, 50, 120, 100, 124, 80,50],
            animationDuration
          }
        ]
      },
      mixChartLegendTwo:[{
        type:'bar',
        color:colorList[0],
        name:'创收',
      },{
        type:'bar',
        color:colorList[1],
        name:'接诊次数',
      },{
        type:'line',
        color:colorList[2],
        name:'转换率',
      }],
      mixChartDataTwo:{
        title: {
          text: '当月咨询人数/转换人数',
          // subtext: '数据来自网络'
          textStyle:{
            color :'#666',
            fontSize :'16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          // feature: {
          //   dataView: {show: true, readOnly: false},
          //   magicType: {show: true, type: ['line', 'bar']},
          //   restore: {show: true},
          //   saveAsImage: {show: true}
          // }
        },
        legend: {
          orient: 'vertical',
          right: 0,
          top: 0,
          bottom: '10',
          data: ['创收', '接诊次数', '转换率'],
          show:false
        },
        grid: {
          top: 70,
          left: '2%',
          right: '100',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            name:'医生',
            type: 'category',
            data: ['张医生', '李医生', '丁医生', '郝医生', '沈医生','王医生'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '医生接诊次数',
          },
          {
            type: 'value',
            name: '医生创收总额',
            axisLabel: {
              formatter: '{value} 千元'
            }
          }
        ],
        series: [
          {
            name: '创收',
            type: 'bar',
            itemStyle:{
              normal:{
                color:'#00a9ff'
              }
            },
            barWidth : '20%',
            barGap:'0',/*多个并排柱子设置柱子之间的间距*/
            barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7],
            animationDuration
          },
          {
            name: '接诊次数',
            type: 'bar',
            itemStyle:{
              normal:{
                color:'#ffb840'
              }
            },
            barWidth : '20%',
            barGap:'0',/*多个并排柱子设置柱子之间的间距*/
            barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7],
            animationDuration
          },
          {
            name: '转换率',
            type: 'line',
            symbol:'circle',
            symbolSize: 10,
            itemStyle:{
              normal:{
                color:'#ff5a46',
                lineStyle: {
                  width:5
                }
              }
            },
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2],
            animationDuration
          }
        ]
      },
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      //医生绩效
      const {data}  = await doctorsTurnover();
      this.BarChartThreeData.yAxis.data=data.categories;
      var list=[];
      var legentList=[];
      for(let i=0;i<data.series.length;i++){
        let bar = {
          name: data.series[i].name,
          type: 'bar',
          data: data.series[i].data,
          itemStyle:{
            normal:{
              color:colorList[i]
            }
          },
          barWidth : 20,
          barGap:'0',/*多个并排柱子设置柱子之间的间距*/
          barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
          animationDuration
        };
        list.push(bar);
        legentList.push({name:data.series[i].name,color:colorList[i]});
      }
      this.BarChartThreeData.series = list;
      this.BarChartLegend = legentList
    },



  }
}
</script>

<style scoped>
  .chart{
    background:#fff;padding:16px 16px 0;margin-bottom:32px;
  }
</style>

