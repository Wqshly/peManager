<template>
    <div ref="main" style="width: 300px;height:300px;"></div>
</template>

<script>
    import echarts from 'echarts'
    import {api} from "@/api/ajax"
    export default {
        data() {
            return {
                mark:60,
                pieXY:[],
                option:{
                    title: {
                        text: '学分情况',
                        subtext:this.$store.state.user.username,
                        show:true,
                    },
                    tooltip: {},
                    toolbox:{
                        show:true,
                        feature: {
                            dataView: {readOnly: false},
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        right: "center",   //所处位置
                        bottom: "0",
                        formatter: (params) => {  //格式化数据的函数
                            for (let a = 0; a < this.pieXY.length; a++) {// this.pieXY  这个数据中有名称和次数
                                if (this.pieXY[a].name === params) {   //两个名称进行对比，取出对应的次数
                                    return params + '   ' + this.pieXY[a].value + '分'  //然后return你需要的legend格式即可
                                }
                            }
                        }
                    },
                    series: [
                        {
                            name:this.$store.state.user.username+'学分情况',
                            type: 'pie',
                            radius: ['40%', '50%'],
                            label: {
                                show: false,
                            },
                            data: [
                                {
                                    value: 0,
                                    name: '理论知识得分'
                                },
                                {
                                    value: 0,
                                    name: '体育活动得分'
                                },
                                {
                                    value: 0,
                                    name: '还需得分'
                                },
                            ],
                        }
                    ]
                }
            }
        },
        methods: {
            getEchartData() {
                const chart = this.$refs.main;
                const myChart = echarts.init(chart);
                myChart.setOption(this.option);
            }

        },
        mounted() {
            this.getEchartData();
        },
        created() {
            //理论
            let temp = this.option.series[0].data[0].value = 20;
            //活动
            let temp2 = this.option.series[0].data[1].value = 30;
            let temp3 = temp+temp2;
            if(temp3 <= this.mark){
                this.option.series[0].data[2].value = this.mark - temp3;
            }
            this.pieXY = this.option.series[0].data;
        },
    }
</script>

<style scoped>

</style>
