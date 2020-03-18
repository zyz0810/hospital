<template>
  <div class="dashboard-editor-container">
    <!--    <github-corner class="github-corner" />-->

    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <!--<svg-icon icon-class="peoples" class-name="card-panel-icon" />-->
            <i class="iconfont iconzixun"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              今日咨询次数
            </div>
            <count-to :start-val="0" :end-val="todayConsults" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <i class="iconfont iconyiyuan"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              今日门诊次数
            </div>
            <count-to :start-val="0" :end-val="todayOut" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <i class="iconfont iconai-profit"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              今日营收额
            </div>
            <count-to :start-val="0" :end-val="todayTurnover" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <i class="iconfont iconlixibao"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              今日毛利润
            </div>
            <count-to :start-val="0" :end-val="todayProfit" :duration="3600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>

    <!--<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
      <!--<line-chart :chart-data="lineChartData" />-->
    <!--</el-row>-->

    <div style="font-size: 20px;margin-bottom: 15px;">今日营收报表</div>
    <el-row style="margin-bottom:32px;" :gutter="32">

      <el-col :xs="24" :sm="24" :lg="12" class="card-panel-col">
        <div class="chart-wrapper">
          <BarChartThree :chart-data="BarChartOneData" :BarChartLegend="[]" :height="'300px'" :divwidth="'100%'"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="10" class="card-panel-col">
        <div class="chart-wrapper">
          <PieChart :chart-data="PieChartData"  :PieChartLegend="PieChartLegend" :height="'300px'" :divWidth="'55%'"/>
        </div>
      </el-col>
    </el-row>
    <!--<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
      <!--<BarChartThree :chart-data="BarChartTwoData" :BarChartLegend="[]" :height="'400px'" :divwidth="'100%'"/>-->
    <!--</el-row>-->
    <div style="font-size: 20px;margin-bottom: 15px;">今日运营报表</div>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <BarChartThree :chart-data="BarChartThreeData" :BarChartLegend="BarChartLegend" :height="'500px'" :divwidth="'90%'"/>
    </el-row>
  </div>
</template>

<script>
  import CountTo from 'vue-count-to'
  import PanelGroup from './components/PanelGroup'
  import PieChart from '@/components/Charts/PieChartTwo'
  import BarChartThree from '@/components/Charts/BarChartThree'
  import { todayConsults,todayTurnover,todayProfit,todayOut,hospitalMoney,projectsMoney,outPatients } from '@/api/index'

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
const animationDuration=2000;
  const colorList=['#00a9ff','#ffb840','#ff5a46','#00bd9f','#785fff'];
export default {
  name: 'DashboardAdmin',
  components: {
    CountTo,
    PanelGroup,
    PieChart,
    BarChartThree,
  },
  data() {
    return {
      todayConsults:0,
      todayTurnover:0,
      todayProfit:0,
      todayOut:0,
      lineChartData: lineChartData.newVisitis,
      BarChartLegend:[],
      PieChartLegend:[],
      PieChartData:{
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
        //   orient: 'vertical',
        //   right: 10,
        //   top: 20,
        //   bottom: '10',
        //   data: ['西药','心电图检查','B超检查','CT检查','其他'],
        //   // icon: ''
          show:false
        },
        series: [
          {
            type: 'pie',
            radius: '80%',
            center: ['40%', '50%'],
            data: [],
            itemStyle: {
              normal: {
                color:function(params) {
                  //自定义颜色
                  var colorList = ['#00a9ff','#ffb840','#ff5a46','#00bd9f','#785fff','#f28b8c'];
                  return colorList[params.dataIndex]
                },
                label : {
                  show : false
                },
                labelLine : {
                  show : false
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
            animationDuration
          }
        ]
      },
      BarChartOneData:{
        title: {
          text: '各医院营收排行',
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
          data: []
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: [],
            itemStyle:{
              normal:{
                color:'#00a9ff',
                label : {
                  show: true,
                  position: 'right',
                  color:'#999'
                }
              }
            },
            barWidth : 20,

            animationDuration
          },
        ]

      },
      // BarChartTwoData:{
      //   title: {
      //     text: '医生创收排行',
      //     // subtext: '各医院营收排行',
      //     left:'0',
      //     top:'0',
      //     textStyle:{
      //       color :'#666',
      //       fontSize :'14'
      //     }
      //
      //   },
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       type: 'shadow'
      //     }
      //   },
      //   legend: {
      //     data: ['门诊人数', '治疗人数']
      //   },
      //   grid: {
      //     top: 30,
      //     left: '2%',
      //     right: '2%',
      //     bottom: '3%',
      //     containLabel: true
      //   },
      //   xAxis: {
      //     type: 'value',
      //     boundaryGap: [0, 0.01],
      //     axisLine: {
      //       lineStyle: {
      //         type: 'solid',
      //         color: '#666',//左边线的颜色
      //         width:'1'//坐标线的宽度
      //       }
      //     },
      //     axisLabel: {
      //       textStyle: {
      //         color: '#666',//坐标值得具体的颜色
      //         fontSize:9
      //       }
      //     }
      //   },
      //   yAxis: {
      //     type: 'category',
      //     axisLine: {
      //       lineStyle: {
      //         type: 'solid',
      //         color: '#666',//左边线的颜色
      //         width:'1'//坐标线的宽度
      //       }
      //     },
      //     axisLabel: {
      //       textStyle: {
      //         color: '#666',//坐标值得具体的颜色
      //         fontSize:9
      //       }
      //     },
      //     data: [ '其他','医院D', '医院C', '医院B', '医院A']
      //   },
      //   series: [
      //     {
      //       name: '2011年',
      //       type: 'bar',
      //       data: [4000, 6000, 7000, 5000, 3000],
      //       itemStyle:{
      //         normal:{
      //           color:'#00a9ff',
      //           label : {
      //             show: true,
      //             position: 'right',
      //             color:'#999'
      //           }
      //         }
      //       },
      //       barWidth : 20,
      //
      //       animationDuration
      //     },
      //   ]
      //
      // },
      BarChartThreeData:{
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
          data: ['门诊人数', '治疗人数'],
          show:false
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
          data: []
        },
        series: [
          {
            name: '',
            type: 'bar',
            data: [],
            itemStyle:{
              normal:{
                color:'#00a9ff'
              }
            },
            barWidth : 20,
            barGap:'0',/*多个并排柱子设置柱子之间的间距*/
            barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
            // animationDuration
          },
          // {
          //   name: '治疗人数',
          //   type: 'bar',
          //   data: [3000, 5000, 2000, 7000, 1000],
          //   itemStyle:{
          //     normal:{
          //       color:'#ffb840'
          //     }
          //   },
          //   barWidth : 20,
          //   barGap:'0',/*多个并排柱子设置柱子之间的间距*/
          //   barCategoryGap:'3',/*多个并排柱子设置柱子之间的间距*/
          //   // animationDuration
          // }
        ]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
   getData(){
     todayConsults().then(response => {
       this.todayConsults = response.data
     });
     todayTurnover().then(response => {
       this.todayTurnover = response.data
     });
     todayProfit().then(response => {
       this.todayProfit = response.data
     });
     todayOut().then(response => {
       this.todayOut = response.data
     });
     hospitalMoney().then(response => {
       console.log(response)
       this.BarChartOneData.yAxis.data = response.data.categories;
       this.BarChartOneData.series[0].name = response.data.series[0].name;
       this.BarChartOneData.series[0].data = response.data.series[0].data;

     });
     outPatients().then(response => {
       this.BarChartThreeData.yAxis.data = response.data.categories;
       // this.BarChartThreeData.series[0].name = response.data.series[0].name;
       // this.BarChartThreeData.series[0].data = response.data.series[0].data;
       let BarChartThree = [];
       for(let i=0;i<response.data.series.length;i++){
         BarChartThree.push({
           name: response.data.series[i].name,
           type: 'bar',
           data: response.data.series[i].data,
           itemStyle:{
             normal:{
               color:colorList[i]
             }
           },
           barWidth : 20,
           barGap:'0',/*多个并排柱子设置柱子之间的间距*/
           barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
           // animationDuration
         },)
       }
       this.BarChartThreeData.series = BarChartThree;
       let that = this;
       this.BarChartLegend = response.data.series.map(function (i,index) {
         that.$delete(i,'data');
         that.$set(i, 'color' , colorList[index]);
         return i
       })
     });
     //今日各项目营业额
     projectsMoney().then(response => {
       let pieChartLegend = response.data.series;

        this.PieChartData.series[0].data = response.data.series;
       // this.PieChartLegend = response.data.series
       this.PieChartLegend = pieChartLegend.map((item,index) => ({
         ...item,
         color:colorList[index]
         // this.$delete(i,'value');
         // this.$set(i, 'color' , colorList[index]);
         // return i
       }))
     });
   }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}


@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}


.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
    padding-left: 10px !important;
    padding-right: 10px !important;
  }

  .card-panel {
    height: 125px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .iconfont {
      float: left;
      font-size: 58px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}

</style>
