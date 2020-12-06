<template>
  <div class="main-nav">
    <el-collapse v-model="activeNames" @change="handleChange">

      <el-collapse-item title="" name ="1">
        <template slot="title">
          <h2>基本信息</h2>
        </template>
        <n-base :data="data"/>
      </el-collapse-item>

      <el-collapse-item title="" name ="2">
        <template slot="title">
          <h2>个人健康信息</h2>
        </template>
        <n-health :data="data2"/>
      </el-collapse-item>

      <el-collapse-item title="" name ="3">
        <template slot="title">
          <h2>体测信息</h2>
        </template>
        <n-tice :data="data3"/>
      </el-collapse-item>

      <el-collapse-item title="" name ="4">
        <template slot="title">
          <h2>附录：国民健康标准</h2>
        </template>
        <n-hea/>
      </el-collapse-item>

      <el-collapse-item title="" name ="5">
        <template slot="title">
          <h2>附录2：评分标准</h2>
        </template>
        <n-fitness/>
      </el-collapse-item>

    </el-collapse>
  </div>
</template>

<script>
  import nFitness from '../../components/health/fitness'
  import nBase from '../../components/health/baseInfo'
  import nHealth from '../../components/health/healthInfo'
  import nTice from '../../components/health/ticeInfo'
  import nHea from '../../components/health/health'
  export default {

    components: {
      nFitness,
      nBase,
      nHealth,
      nTice,
      nHea
    },
    data() {
      return {
        activeNames: ['1','2','3'],
        data: {
          name: '1',
          school: '2',
          college: '3',
          classz: '4',
          number: '5'
        },
        data2: {
          height: '1',
          weight: '2',
          shili: '3',
        },
        data3: {
          1: '1',
          2: '1',
          3: '1',
          4: '1',
          5: '1',
          6: '1',
        }
      }
    },
    methods: {
      handleChange(val) {

      }
    },
    mounted() {

    },
    created() {

    },
  }
</script>

<style scoped>

  .main-nav {
    padding: 0;
    margin: 0;
    height: 100%;
    overflow: hidden;
  }

  h2 {
    font-weight: 300;
    color: #409EFF;
  }
</style>
