<template>
  <div class="app-container" style="background-color: rgb(240, 242, 245);">
    <!--<chart height="100%" width="100%" />-->
    <div class="title"> 运营报表</div>
    <el-row style="margin-bottom: 30px">
      <LineChart :chart-data="lineChartData" :lineChartLegend="lineChartLegend" :divWidth="'90%'" />
    </el-row>
    <!--<div class="title"> 渠道统计</div>-->
    <el-row style="margin-bottom: 30px">
      <!--<LineChart :chart-data="barChartDataTwo" :lineChartLegend="BarChartLegendTwo" :divWidth="'90%'" />-->
      <BarChartFour :chart-data="barChartDataTwo" :BarChartLegend="BarChartLegendTwo" inputName="barChartTwo" :divwidth="'80%'"/>
    </el-row>
    <!--<div class="title">咨询内容</div>-->
    <!--<el-row :gutter="32">-->
      <!--<el-col :xs="24" :sm="24" :lg="12" class="card-panel-col">-->
        <!--<div class="chart-wrapper">-->
          <!--<RingChart :chart-data="ringChartData" :PieChartLegend="PieChartLegend"/>-->
        <!--</div>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <div class="title">病人</div>
    <el-row>
      <BarChartTwo :chart-data="barChartDataOne" :BarChartLegend="BarChartLegendOne" :divwidth="'80%'"/>
    </el-row>
    <el-row>
      <MapChart :chart-data="mapChina"/>
    </el-row>



  </div>
</template>

<script>
  import { weekCount,ageStatics,patientsArea,sourceOut } from '@/api/operate'
  import { sourceList } from '@/api/source'
  import LineChart from '@/components/Charts/LineChart'
  import RingChart from '@/components/Charts/RingChart'
  import MapChart from '@/components/Charts/MapChart'
  import BarChartTwo from '@/components/Charts/BarChartTwo'
  import BarChartFour from '@/components/Charts/BarChartFour'
  import ErrorLog from "../../components/ErrorLog/index";

  const colorList= ['#00a9ff','#ffb840','#ff5a46','#00bd9f','#785fff','#f28b8c','#eb7df5','#6a5195','#3bf209','#17400c','#3c789b','#62f421','#09e4f2','#f20955','#5d182f',
    '#ec06b3','#7c0cab','#ae8d7f','#d07045','#ff061d','#107f6b','#a7a210','#f8f47c','#789808','#927009','#cb9b6f','#51845a','#54947b','#82d0dc','#37476c'];
  const animationDuration = 2000;
  export default {
    name: 'KeyboardChart',
    components: {ErrorLog,BarChartTwo, LineChart,RingChart,MapChart,BarChartFour },
    data() {
      return {
        lineChartLegend:[],
        lineChartData: {
          title:{
            text: '最近7天咨询/门诊/住院人数',
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
            data: ['咨询人数', '门诊人数', '住院人数'],
            show:false
          },
          series: [{
            name: '咨询人数',
            itemStyle: {
              normal: {
                color: '00a9ff',
                lineStyle: {
                  color: '#00a9ff',
                  width: 5
                }
              }
            },
            smooth: false,
            type: 'line',
            data: [],
            animationDuration:1,
            // animationEasing: 'cubicInOut'
          },
            {
              name: '门诊人数',
              smooth: false,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#ffb840',
                  lineStyle: {
                    color: '#ffb840',
                    width: 5
                  }
                }
              },
              data:  [],
              animationDuration:1,
              // animationEasing: 'quadraticOut'
            },
            {
              name: '住院人数',
              smooth: false,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#ff5a46',
                  lineStyle: {
                    color: '#ff5a46',
                    width: 5
                  },
                }
              },
              data: [],
              animationDuration:1,
              // animationEasing: 'quadraticOut'
            }]
        },
        BarChartLegendOne:[],
        barChartDataOne:{
          title: {
            text: '客户年龄分布',
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
            right: '3%',
            bottom: '3%',
            containLabel: true
          },

          xAxis: {
            type: 'category',
            name:'年龄',
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
            splitLine:{
              show:false     //去掉网格线
            },
            splitArea : {show : false},//保留网格区域
            data: []
          },
          yAxis: {
            type: 'value',
            name:'人数        ',
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
          series: []
        },
        BarChartLegendTwo:[],
        barChartDataTwo:{
          title: {
            text: '渠道统计',
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
            },
          },
          legend: {
            data: ['住院费', '心电图费','治疗费','诊疗费'],
            show:false
          },
          grid: {
            top: 70,
            left: '2%',
            right: '50',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            name:'渠道',
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
            splitLine:{
              show:false     //去掉网格线
            },
            splitArea : {show : false},//保留网格区域
            data: ['2019-07', '2019-08', '2019-09', '2019-10', '2019-11', '2019-12','2020-01']
          },
          yAxis: {
            type: 'value',
            name:'人数        ',
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
          series: []
        },
        mapChina:{
          mapData:[]
        }
      }
    },
    created() {
      this.getData();
      this.getSource();
    },
    methods: {
      getData() {
        weekCount().then(response => {
          // barLegendData.push(response.data.series[0].name);
          this.lineChartData.xAxis.data=response.data.categories;
          let lineChartArr = [];
          var lineChartLegendArr = []
          for(let i=0;i<response.data.series.length;i++){
            let obj={
              name: response.data.series[i].name,
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
              data: response.data.series[i].data,
              animationDuration,
              animationEasing: 'cubicInOut'
            };
            lineChartArr.push(obj);
            lineChartLegendArr.push({name:response.data.series[i].name,color:colorList[i]})
          }
          this.lineChartData.series=lineChartArr;
          this.lineChartLegend=lineChartLegendArr

          // this.barChartDataOne.series[0].name = response.data.series[0].name;
          // this.barChartDataOne.series[0].data = response.data.series[0].data;
          // this.barChartDataOne.legend.data = barLegendData;
          //
          // let that = this;
          // this.BarChartLegendOne = response.data.series.map(function (i,index) {
          //   that.$delete(i,'data')
          //   that.$set(i, 'color' , colorList[index])
          //   return i
          // })
        });
        patientsArea().then(response=>{
          this.mapChina.mapData=response.data.series
        });
        ageStatics().then(response=>{
          this.barChartDataOne.xAxis.data=response.data.categories;
          let barChartArr = [];
          var barChartLegendArr = []
          for(let i=0;i<response.data.series.length;i++){
            let obj={
              name: response.data.series[i].name,
              type: 'bar',
              itemStyle:{
                normal:{
                  color:colorList[i]
                }
              },
              barWidth : '20%',
              barGap:'0',/*多个并排柱子设置柱子之间的间距*/
              barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
              data: response.data.series[i].data,
              animationDuration
            };
            barChartArr.push(obj);
            barChartLegendArr.push({name:response.data.series[i].name,color:colorList[i]})
          }
          this.barChartDataOne.series=barChartArr;
          this.BarChartLegendOne=barChartLegendArr
        });
      },
      async getSource(){
        //近6个月来源营收
        const {data}  = await sourceList();
        var list=[];
        var legentList=[];
        let liss = data;
        let barWidth='10%';

        for(let i=0;i<data.length;i++){
          const {data}  = await sourceOut({source_id:liss[i].id});
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
            barWidth : barWidth,
            barGap:'0',/*多个并排柱子设置柱子之间的间距*/
            barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
            data: data.series[0].data,
            animationDuration
          };
          list.push(bar);
          this.barChartDataTwo.series = list;
          legentList.push({name:liss[i].name,color:colorList[i]});
        }
        this.BarChartLegendTwo = legentList
      },
    }
  }
</script>

<style scoped>
  .chart{
    background:#fff;padding:16px 16px 0;margin-bottom:32px;
  }
</style>

