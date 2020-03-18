<template>
  <div class="app-container" style="background-color: rgb(240, 242, 245);">
    <!--<chart height="100%" width="100%" />-->
    <div class="title" style="margin-top: 20px;">近6个月总营收</div>
    <el-row>
      <!--<bar-chart :chart-data="lineChartData" />-->
      <BarChartTwo :chart-data="barChartDataOne" :BarChartLegend="BarChartLegendOne" :divwidth="'80%'"/>
    </el-row>
    <el-row>
      <BarChartFour :chart-data="barChartDataTwo" :BarChartLegend="BarChartLegendTwo" :divwidth="'80%'"/>
    </el-row>
    <div class="title" style="margin-top: 20px;">当月营收分布</div>
    <el-row :gutter="32">

      <el-col :xs="24" :sm="24" :lg="12" class="card-panel-col">
        <div class="chart-wrapper">
          <PieChartTwo :chart-data="pieChartDataOne" :PieChartLegend="[]" :height="'500px'" :divWidth="'100%'"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12" class="card-panel-col">
        <div class="chart-wrapper">
          <PieChartTwo :chart-data="pieChartDataTwo" :PieChartLegend="[]" :height="'500px'" :divWidth="'100%'"/>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import Chart from '@/components/Charts/Keyboard'
import BarChart from '@/components/Charts/BarChart'
import BarChartTwo from '@/components/Charts/BarChartTwo'
import BarChartFour from '@/components/Charts/BarChartFour'
import PieChartTwo from '@/components/Charts/PieChartTwo'
import { totalTurnover,projectTurnover,projectMonth,projectsName } from '@/api/revenue'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};
const animationDuration = 2000;
const colorList=['#00a9ff','#ffb840','#ff5a46','#00bd9f','#785fff'];
export default {
  name: 'KeyboardChart',
  components: { Chart,BarChart,BarChartTwo,BarChartFour,PieChartTwo },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      BarChartLegendOne:[{
        color:colorList[0],
        name:'营业额'
      },{
        color:colorList[1],
        name:'纯利润'
      }],
      BarChartLegendTwo:[],
      barChartDataOne:{
        title: {
          text: '营收',
          // subtext: '数据来自网络'
          textStyle:{
            color :'#666',
            fontSize :'18'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['营业额', '纯利润'],
          show:false
        },
        grid: {
          top: 70,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },

        xAxis: {
          type: 'category',
          name:'月',
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
          data: ['2019-07', '2019-08', '2019-09', '2019-10', '2019-11', '2019-12','2020-01']
        },
        yAxis: {
          type: 'value',
          name:'万元        ',
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
            name: '营业额',
            type: 'bar',
            itemStyle:{
              normal:{
                color:'#00a9ff'
              }
            },
            barWidth : '20%',
            barGap:'0',/*多个并排柱子设置柱子之间的间距*/
            barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
            data: [],
            animationDuration
          },
          {
            name: '纯利润',
            type: 'bar',
            itemStyle:{
              normal:{
                color:'#ffb840'
              }
            },
            barWidth : '20%',
            barGap:'0',/*多个并排柱子设置柱子之间的间距*/
            barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
            data: [],
            animationDuration
          }
        ]
      },
      barChartDataTwo:{
        title: {
          text: '营收',
          // subtext: '数据来自网络'
          textStyle:{
            color :'#666',
            fontSize :'18'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['住院费', '心电图费','治疗费','诊疗费'],
          show:false
        },
        grid: {
          top: 70,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },

        xAxis: {
          type: 'category',
          name:'月',
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
          data: ['2019-07', '2019-08', '2019-09', '2019-10', '2019-11', '2019-12','2020-01']
        },
        yAxis: {
          type: 'value',
          name:'元        ',
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
        //   {
        //     name: '住院费',
        //     type: 'bar',
        //     itemStyle:{
        //       normal:{
        //         color:'#00a9ff'
        //       }
        //     },
        //     barWidth : '20%',
        //     barGap:'0',/*多个并排柱子设置柱子之间的间距*/
        //     barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
        //     data: [100, 90, 160, 126, 130, 101,80],
        //     animationDuration
        //   },
        //   {
        //     name: '心电图费',
        //     type: 'bar',
        //     itemStyle:{
        //       normal:{
        //         color:'#ffb840'
        //       }
        //     },
        //     barWidth : '20%',
        //     barGap:'0',/*多个并排柱子设置柱子之间的间距*/
        //     barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
        //     data: [80, 50, 120, 100, 124, 80,50],
        //     animationDuration
        //   },
        //   {
        //     name: '治疗费',
        //     type: 'bar',
        //     itemStyle:{
        //       normal:{
        //         color:'#ff5a46'
        //       }
        //     },
        //     barWidth : '20%',
        //     barGap:'0',/*多个并排柱子设置柱子之间的间距*/
        //     barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
        //     data: [80, 50, 120, 100, 124, 80,50],
        //     animationDuration
        //   },
        //   {
        //     name: '诊疗费',
        //     type: 'bar',
        //     itemStyle:{
        //       normal:{
        //         color:'#00bd9f'
        //       }
        //     },
        //     barWidth : '20%',
        //     barGap:'0',/*多个并排柱子设置柱子之间的间距*/
        //     barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
        //     data: [80, 50, 120, 100, 124, 80,50],
        //     animationDuration
        //   }
        ]
      },
      pieChartDataOne:{
        title: {
          text: '营收分布',
          // subtext: '各项目营收',
          left: '0',
          textStyle:{
            color :'#666',
            fontSize :'14'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        series: [
          {

            type: 'pie',
            selectedMode: 'single',
            radius: [0, '85%'],

            itemStyle : {
              normal : {
                color:function(params) {
                  //自定义颜色
                  var colorList = ['#00a9ff','#ffb840','#ff5a46','#00bd9f','#785fff','#f28b8c'];
                  return colorList[params.dataIndex]
                },
                label : {
                  position: 'inner',
                  formatter: '{d}%',
                },
                labelLine : {
                  show : false
                }
              },
            },
            data: [{name:'住院费',value:180},{name:'化验费',value:20},{name:'西药费',value:50},{name:'治疗费',value:10},{name:'B超费',value:10},{name:'其他',value:50}],
            animationEasing: 'cubicInOut',
            animationDuration
          },
          {
            type: 'pie',
            radius: ['80%', '85%'],
            itemStyle : {
              normal : {
                color:function(params) {
                  //自定义颜色
                  var colorList = ['#00a9ff','#ffb840','#ff5a46','#00bd9f','#785fff','#f28b8c'];
                  return colorList[params.dataIndex]
                },
                label : {
                  show : true
                },
                labelLine : {
                  show : false
                }
              },

            },
            data: [{name:'住院费',value:180},{name:'化验费',value:20},{name:'西药费',value:50},{name:'治疗费',value:10},{name:'B超费',value:10},{name:'其他',value:50}],
            animationEasing: 'cubicInOut',
            animationDuration
          }
        ]
      },
      pieChartDataTwo:{
        title: {
          text: '医院营收',
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
        // legend: {
        //   orient: 'vertical',
        //   right: 10,
        //   top: 20,
        //   bottom: '10',
        //   data: ['医院A','医院B','医院C','医院D'],
        // },



        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '85%'],

            itemStyle : {
              normal : {
                color:function(params) {
                  //自定义颜色
                  var colorList = ['#00a9ff','#ffb840','#ff5a46','#00bd9f','#785fff'];
                  return colorList[params.dataIndex]
                },
                label : {
                  position: 'inner',
                  formatter: '{d}%',
                },
                labelLine : {
                  show : false
                }
              },
            },
            data: [{name:'医院A',value:180},{name:'医院B',value:20},{name:'医院C',value:50},{name:'医院D',value:10}],
            animationEasing: 'cubicInOut',
            animationDuration
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['80%', '85%'],
            itemStyle : {
              normal : {
                color:function(params) {
                  //自定义颜色
                  var colorList = ['#00a9ff','#ffb840','#ff5a46','#00bd9f','#785fff'];
                  return colorList[params.dataIndex]
                },
                label : {
                  show : true
                },
                labelLine : {
                  show : false
                }
              },

            },
            data: [{name:'医院A',value:180},{name:'医院B',value:20},{name:'医院C',value:50},{name:'医院D',value:10}],
            animationEasing: 'cubicInOut',
            animationDuration
          }
        ]

      }
    }
  },
  created() {
    this.getData();
    this.getList()
  },
  methods: {
    getData() {

      var barLegendData = [];
      var barLegendOne = [];
      totalTurnover().then(response => {
        barLegendData.push(response.data.series[0].name);
        this.barChartDataOne.xAxis.data=response.data.categories;
        this.barChartDataOne.series[0].name = response.data.series[0].name;
        this.barChartDataOne.series[0].data = response.data.series[0].data;
        this.barChartDataOne.legend.data = barLegendData;

        let that = this;
        this.BarChartLegendOne = response.data.series.map(function (i,index) {
          that.$delete(i,'data')
          that.$set(i, 'color' , colorList[index])
          return i
        })
      });
      projectMonth().then(response => {
        // barLegendData.push(response.data.series[0].name)
        // this.barChartDataOne.series[0].name = response.data.series[0].name
        // this.barChartDataOne.series[0].data = response.data.series[0].data;
        // this.barChartDataOne.legend.data =  barLegendData
        this.pieChartDataOne.series[0].data=response.data.series
        this.pieChartDataOne.series[1].data=response.data.series
      })
    },
    async getList(){
      //近6个月项目营收
      const {data}  = await projectsName();
      var list=[];
      var legentList=[];
      let liss = data;
      for(let i=0;i<data.length;i++){
        const {data}  = await projectTurnover({project_name:liss[i]});
          if(i==0){
            this.barChartDataTwo.xAxis.data = data.categories;
          }
          let bar = {
            name: data.series[0].name,
            type: 'bar',
            itemStyle:{
              normal:{
                color:colorList[i]
              }
            },
            barWidth : '20%',
            barGap:'0',/*多个并排柱子设置柱子之间的间距*/
            barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
            data: data.series[0].data,
            animationDuration
          };
          list.push(bar);
          this.barChartDataTwo.series = list;
        legentList.push({name:liss[i],color:colorList[i]});
      }

      this.BarChartLegendTwo = legentList

    },


  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
  .chart{
    background:#fff;padding:16px 16px 0;margin-bottom:32px;
  }
</style>

