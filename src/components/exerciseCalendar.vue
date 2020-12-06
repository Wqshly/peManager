<template>
  <div id="calendar">
    <h3>近期打卡情况</h3>
    <el-calendar>
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template
        slot="dateCell"
        slot-scope="{date, data}"
        class="item">

        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1)[1] }} {{ data.isSelected ? '✔️' : ''}}
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    },
    mounted() {

    },
    created() {

    },
  }
</script>

<style scoped>
  #calendar {
    width: 550px;
  }
  h3 {
    font-weight: 400;
    padding-left: 20px;
  }

  .is-selected {

  }

</style>
