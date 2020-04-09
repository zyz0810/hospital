<template>
  <div class="app-container" style="background-color: rgb(240, 242, 245);">
    <!--<chart height="100%" width="100%" />-->
    <div class="title" style="margin-top: 20px;">医院报表</div>
    <!--<el-row>-->
      <!--&lt;!&ndash;<bar-chart :chart-data="lineChartData" />&ndash;&gt;-->
      <!--<BarChartTwo :chart-data="barChartDataOne" :BarChartLegend="BarChartLegendOne" :divwidth="'80%'"/>-->
    <!--</el-row>-->
    <el-row>
      <BarChartFour :chart-data="barChartDataOne" :BarChartLegend="BarChartLegendOne" inputName="barChartOne" :divwidth="'80%'"/>
    </el-row>
    <el-row>
      <LineChart :chart-data="lineChartDataOne" :lineChartLegend="LineChartLegendOne" :divWidth="'90%'"/>
      <!--<LineChart :chart-data="lineChartData" :lineChartLegend="lineChartLegend" :divWidth="'90%'" />-->
    </el-row>
    <!--<el-row>-->
      <!--<BarChartFour :chart-data="barChartDataFour" :BarChartLegend="BarChartLegendFour" inputName="barChartThree" :divwidth="'80%'"/>-->
    <!--</el-row>-->

    <el-row style="margin-top: 20px;">
      <BarChartThree :chart-data="barChartDataTwo" :BarChartLegend="[]" :height="'500px'" :divwidth="'100%'"/>
    </el-row>

  </div>
</template>

<script>
import BarChartFour from '@/components/Charts/BarChartFour'
import LineChart from '@/components/Charts/LineChart'
import BarChartThree from '@/components/Charts/BarChartThree'
import { hospitalNameList,hospitalTurnover,hospitalOut,doctorTurnover } from '@/api/hospital'

const animationDuration = 2000;
const colorList= ['#00a9ff','#ffb840','#ff5a46','#00bd9f','#785fff','#f28b8c','#eb7df5','#6a5195','#3bf209','#17400c','#3c789b','#62f421','#09e4f2','#f20955','#5d182f',
  '#ec06b3','#7c0cab','#ae8d7f','#d07045','#ff061d','#107f6b','#a7a210','#f8f47c','#789808','#927009','#cb9b6f','#51845a','#54947b','#82d0dc','#37476c'];
export default {
  name: 'KeyboardChart',
  components: { BarChartFour,LineChart,BarChartThree },
  data() {
    return {
      BarChartLegendOne:[],
      barChartDataOne:{
        title: {
          text: '营收',
          // subtext: '数据来自网络'
          textStyle:{
            color :'#666',
            fontSize :'18'
          }
        },
        // tooltip: {
        //   trigger: 'item',
        //   axisPointer: {
        //     type: 'shadow'
        //   },
        //   // formatter: '{a}</br>{b} : {c}元'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
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
          splitLine:{
            show:false     //去掉网格线
          },
          splitArea : {show : false},//保留网格区域
          boundaryGap: [0, 0.01]
        },
        series: [
          {
            name: '营业额',
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
            name: '营业额',
            type: 'line',
            symbol:'circle',
            symbolSize: 10,
            itemStyle:{
              normal:{
                color:colorList[1],
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
      LineChartLegendOne:[],
      lineChartDataOne:{
        title:{
          text: '各医院门诊次数',
          // subtext: '数据来自网络'
          textStyle:{
            color :'#666',
            fontSize :'18'
          }
        },
        xAxis: {
          data: [],
          boundaryGap: false,
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
            show: false
          }
        },
        grid: {
          left: 10,
          right: 20,
          bottom: 20,
          top: 50,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
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
            show: false
          }
        },
        legend: {
          data: [],
          show:false
        },
        series: []
      },
      barChartDataTwo:{
        title: {
          text: '医生平均创收',
          // subtext: '各医院营收排行',
          left:'0',
          top:'0',
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
          data: ['医院']
        },
        grid: {
          top: 30,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          name:'元',
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
          },
          splitLine:{
            show:false     //去掉网格线
          },
          splitArea : {show : false},//保留网格区域
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
          splitLine:{
            show:false     //去掉网格线
          },
          splitArea : {show : false},//保留网格区域
          data: []
        },
        series: []

      },
    }
  },
  created() {
    this.getData();
    this.getDoctor();
  },
  methods: {
    getDoctor(){
      doctorTurnover().then(response => {

        this.barChartDataTwo.yAxis.data = response.data.categories;

        let barTwo = [{
          name: response.data.series[0].name,
          type: 'bar',
          data: response.data.series[0].data,
          itemStyle: {
            normal: {
              color: '#00a9ff',
              label: {
                show: true,
                position: 'right',
                color: '#999'
              }
            }
          },
          barWidth : '30%',
        }];
        // barListTwo.push(barTwo);
        this.barChartDataTwo.series = barTwo;
      });
    },
    async getData(){
      //近6个月项目营收
      const {data}  = await hospitalNameList();
      var barListData=[];
      var barlegentList=[];
      let barList = data;
      var lineList=[];
      var linelegentList=[];
      var barListTwo = [];
      var barlegentListTwo=[];
      let barWidth='10%';
      for(let i=0;i<data.length;i++){
        const {data}  = await hospitalTurnover({hospital_id:barList[i].id});
          if(i==0){
            this.barChartDataOne.xAxis.data = data.categories;
          }
          let bar = {
            name: data.series[0].name,
            type: 'bar',
            itemStyle:{
              normal:{
                color:colorList[i]
              }
            },
            barWidth : barWidth,
            barGap:'0',/*多个并排柱子设置柱子之间的间距*/
            barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
            data: data.series[0].data,
            animationDuration
          };
        barListData.push(bar);
          this.barChartDataOne.series = barListData;
        barlegentList.push({name:barList[i].name,color:colorList[i]});
      }
      this.BarChartLegendOne = barlegentList;

      for(let i=0;i<data.length;i++){
        const {data}  = await hospitalOut({hospital_id:barList[i].id});
        if(i==0){
          this.lineChartDataOne.xAxis.data = data.categories;
        }
        let line ={
          name: data.series[0].name,
          itemStyle: {
            normal: {
              color: colorList[i],
              lineStyle: {
                color: colorList[i],
                width: 5
              }
            }
          },
          smooth: false,
          type: 'line',
          data: data.series[0].data,
          animationDuration:1,
          // animationEasing: 'cubicInOut'
        };
        lineList.push(line);
        this.lineChartDataOne.series = lineList;
        linelegentList.push({name:barList[i].name,color:colorList[i]});
      }
      this.LineChartLegendOne = linelegentList;

      // for(let i=0;i<data.length;i++){
      //   const {data}  = await doctorTurnover({hospital_id:barList[i].id});
      //   if(i==0){
      //     this.barChartDataTwo.yAxis.data = data.categories;
      //   }
      //   let barTwo = {
      //     name: data.series[0].name,
      //     type: 'bar',
      //     data: data.series[0].data,
      //     itemStyle: {
      //       normal: {
      //         color: '#00a9ff',
      //         label: {
      //           show: true,
      //           position: 'right',
      //           color: '#999'
      //         }
      //       }
      //     },
      //   };
      //   barListTwo.push(barTwo);
      //   this.barChartDataTwo.series = barListTwo;
      //   // linelegentList.push({name:barList[i].name,color:colorList[i]});
      // }

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

