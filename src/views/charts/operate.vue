<template>
  <div class="app-container" style="background-color: rgb(240, 242, 245);">
    <!--<chart height="100%" width="100%" />-->
    <div class="title">近6个月总营收</div>
    <el-row style="margin-bottom: 30px">
      <LineChart :chart-data="lineChartData" :lineChartLegend="lineChartLegend" :divWidth="'90%'" />
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
  import { weekCount,patientsArea } from '@/api/operate'
  import LineChart from '@/components/Charts/LineChart'
  import RingChart from '@/components/Charts/RingChart'
  import MapChart from '@/components/Charts/MapChart'
  import BarChartTwo from '@/components/Charts/BarChartTwo'
  import ErrorLog from "../../components/ErrorLog/index";

  const colorList=['#00a9ff','#ffb840','#ff5a46','#00bd9f','#785fff'];
  const animationDuration = 2000;
  export default {
    name: 'KeyboardChart',
    components: {ErrorLog,BarChartTwo, LineChart,RingChart,MapChart },
    data() {
      return {
        // lineChartLegend:[],
        // PieChartLegend:[{
        //   color:'#00a9ff',
        //   name:'头痛'
        // },{
        //   color:'#ffb840',
        //   name:'心脏'
        // },{
        //   color:'#ff5a46',
        //   name:'感冒'
        // },{
        //   color:'#00bd9f',
        //   name:'肺'
        // },{
        //   color:'#785fff',
        //   name:'其它'
        // }],
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
        // ringChartData:{
        //   title: {
        //     text: '咨询内容占比',
        //     textStyle:{
        //       color :'#666',
        //       fontSize :'18'
        //     }
        //   },
        //   tooltip: {
        //     trigger: 'item',
        //     formatter: '{a} <br/>{b}: {c} ({d}%)'
        //   },
        //   legend: {
        //     bottom: 10,
        //     left: 'center',
        //     data: ['头痛', '心脏', '感冒', '肺', '其它'],
        //     show: false
        //   },
        //   series: [
        //     {
        //       name: '咨询内容占比',
        //       type: 'pie',
        //       radius: ['25%', '80%'],
        //       avoidLabelOverlap: false,
        //       label: {
        //         normal: {
        //           show:true,
        //           position:'inner', //标签的位置
        //           textStyle : {
        //             fontWeight : 300 ,
        //             fontSize : 16    //文字的字体大小
        //           },
        //           formatter:'{d}%'
        //         },
        //         emphasis: {
        //           show: true,
        //           // textStyle: {
        //           //   fontSize: '30',
        //           //   fontWeight: 'bold'
        //           // }
        //         }
        //       },
        //       itemStyle: {
        //         normal: {
        //           color:function(params) {
        //             //自定义颜色
        //             var colorList = ['#00a9ff','#ffb840','#ff5a46','#00bd9f','#785fff'];
        //             return colorList[params.dataIndex]
        //           }
        //         }
        //       },
        //       labelLine: {
        //         normal: {
        //           show: false
        //         }
        //       },
        //       data: [{value: 1335, name: '头痛'},
        //         {value: 910, name: '心脏'},
        //         {value: 234, name: '感冒'},
        //         {value: 135, name: '肺'},
        //         {value: 548, name: '其它'}]
        //     }
        //   ]
        // },
        BarChartLegendOne:[{
          color:colorList[0],
          name:'营业额'
        },{
          color:colorList[1],
          name:'纯利润'
        }],
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
              data: [100, 90, 160, 126, 130, 101,80],
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
              data: [80, 50, 120, 100, 124, 80,50],
              animationDuration
            }
          ]
        },
        mapChina:{
          mapData:[]
        }
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {

        var barLegendData = [];
        var barLegendOne = [];
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
          // console.log(lineChartArr)
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
        })
      },
    }
  }
</script>

<style scoped>
  .chart{
    background:#fff;padding:16px 16px 0;margin-bottom:32px;
  }
</style>

