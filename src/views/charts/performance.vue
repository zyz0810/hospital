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

  import { consultantTurnover,doctorsTurnover,doctorsPayment } from '@/api/performance'
import MChart from '@/components/Charts/MixChart'
import MChartTwo from '@/components/Charts/MixChartTwo'
import BarChartThree from '@/components/Charts/BarChartThree'
const animationDuration = 2000;
const colorList= ['#00a9ff','#ffb840','#ff5a46','#00bd9f','#785fff','#f28b8c','#eb7df5','#6a5195','#3bf209','#17400c','#3c789b','#62f421','#09e4f2','#f20955','#5d182f',
    '#ec06b3','#7c0cab','#ae8d7f','#d07045','#ff061d','#107f6b','#a7a210','#f8f47c','#789808','#927009','#cb9b6f','#51845a','#54947b','#82d0dc','#37476c'];
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
          },
          splitLine:{
            show:false     //去掉网格线
          },
          splitArea : {show : false},//保留网格区域
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
          splitLine:{
            show:false     //去掉网格线
          },
          splitArea : {show : false},//保留网格区域
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
        name:'转换门诊人数',
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
          splitLine:{
            show:false     //去掉网格线
          },
          splitArea : {show : false},//保留网格区域
          axisTick: {
            alignWithLabel: true
          },
          data: []
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
          splitLine:{
            show:false     //去掉网格线
          },
          splitArea : {show : false},//保留网格区域
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
            data: [],
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

            data: [],
            animationDuration
          }
        ]
      },
      mixChartLegendTwo:[{
        type:'bar',
        color:colorList[0],
        name:'接诊人数',
      },{
        type:'line',
        color:colorList[1],
        name:'转换率',
      }],
      mixChartDataTwo:{
        title: {
          text: '当月医生接诊/转换率',
          // subtext: '数据来自网络'
          textStyle:{
            color :'#666',
            fontSize :'16'
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
          data: ['接诊次数', '转换率'],
          show:false
        },
        grid: {
          top: 70,
          left: '2%',
          right: '100',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
            name:'',
            type: 'category',
            data: [],
            axisPointer: {
              type: 'shadow'
            },
            splitLine:{
              show:false     //去掉网格线
            },
            splitArea : {show : false},//保留网格区域
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
          },
        yAxis: [{
          type: 'value',
          name: '医生接诊人数',
          splitLine:{
            show:false     //去掉网格线
          },
          splitArea : {show : false},//保留网格区域
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
        },{
          type: 'value',
          name: '转换率(元/病人)',
          splitLine:{
            show:false     //去掉网格线
          },
          splitArea : {show : false},//保留网格区域
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
        }],
        series: [
          {
            name: '接诊次数',
            type: 'bar',
            itemStyle:{
              normal:{
                color:colorList[0]
              }
            },
            barWidth : '20%',
            barGap:'0',/*多个并排柱子设置柱子之间的间距*/
            barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
            data: [],
            animationDuration
          },
          {
            name: '转换率',
            type: 'line',
            symbol:'circle',
            symbolSize: 10,
            itemStyle:{
              normal:{
                color:colorList[1],
                lineStyle: {
                  width:5
                }
              }
            },
            yAxisIndex: 1,
            data: [],
            animationDuration
          }
        ]
      },
    }
  },
  created() {
    this.getData();
    this.getData2();
    this.getDataCconsultant()
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
      this.BarChartLegend = legentList;
    },

    getData2(){
      doctorsPayment().then(response => {
        this.mixChartDataTwo.xAxis.data=response.data.categories;
        this.mixChartDataTwo.series[0].name=response.data.series[0].name;
        this.mixChartDataTwo.series[1].name=response.data.series[1].name;
        this.mixChartDataTwo.series[0].data=response.data.series[0].data;
        this.mixChartDataTwo.series[1].data=response.data.series[1].data;
      });
    },

    getDataCconsultant(){
      consultantTurnover().then(response => {
        this.mixChartData.xAxis.data=response.data.categories;
        this.mixChartData.series[0].name=response.data.series[0].name;
        this.mixChartData.series[1].name=response.data.series[1].name;
        this.mixChartData.series[0].data=response.data.series[0].data;
        this.mixChartData.series[1].data=response.data.series[1].data;
      });
    }
  }
}
</script>

<style scoped>
  .chart{
    background:#fff;padding:16px 16px 0;margin-bottom:32px;
  }
</style>

