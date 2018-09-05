<template>
  <!-- 日历选择 -->
  <div class="cal-wrapper">
    <div class="cal-header">
      <div class="l" @click="preMonth"><div class="arrow-left icon">&nbsp;</div></div>
      <div class="title">{{curYearMonth}}</div>
      <div class="r" @click="nextMonth"><div class="arrow-right icon">&nbsp;</div></div>
    </div>
    <div class="cal-body">
      <div class="weeks">
        <span
          v-for="(dayName, dayIndex) in i18n[calendar.options.locale].dayNames"
          class="item"
          :key="dayIndex"
          >
          {{i18n[calendar.options.locale].dayNames[(dayIndex + calendar.options.weekStartOn) % 7]}}
        </span>
      </div>
      <div class="dates" >
        <div v-for="date in dayList" class="item" :key="date.date">
          <p ref="dateNum" class="date-num" :class="{'is-selected-day': (isBeginEndDate(date.date,feedbackDayData.beginDate, feedbackDayData.endDate)), 'is-gray':!date.status}"
            @click="handleChangeCurday(date)"
            :style="{color: date.type=='2' ? festivalColor : (date.type=='1' ? restDayColor : (!date.status ? '#BCBDBF' : customColor))}">
            {{date.date.split('/')[2]}}</p>
          <span v-if="today == date.date" class="is-today" :style="{backgroundColor: customColor }" ></span>
          <span v-if="date.type=='2'" class="is-festival"></span>
          <span v-if="date.type=='1'" class="is-restday"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '../i18n.js'
import { dateTimeFormatter, isBeginEndDate} from '../tools.js'

const inBrowser = typeof window !== 'undefined'
export default {
  name: 'cal-panel',
  data () {
    return {
      i18n,
      curYear: this.calendar.params.curYear,
      curMonth: this.calendar.params.curMonth,
      feedbackDayData: {}
    }
  },
  props: {
    events: {
      type: Array,
      required: true
    },
    calendar: {
      type: Object,
      required: true
    },
    feedbackDay: {
      type: Object,
      required: false
    }
  },
  watch: {
    feedbackDay: function(val) {
      this.feedbackDayData = val;
    }
  },
  computed: {
    dayList () {
      if (this.feedbackDayData && this.feedbackDayData.beginDate) {
        let currDay = new Date(this.feedbackDayData.beginDate);
        this.curYear = currDay.getFullYear();
        this.curMonth = currDay.getMonth();
        this.$EventCalendar.setCurYear(this.curYear);
        this.$EventCalendar.setCurMonth(this.curMonth);
      }

      let firstDay = new Date(this.curYear, this.curMonth, 1);
      let dayOfWeek = firstDay.getDay()
      // 根据当前日期计算偏移量
      if (this.calendar.options.weekStartOn > dayOfWeek) {
        dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn + 7
      } else {
        dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn
      }

      //闰月列表
      let leapMonth = [1, 3, 5, 7, 8, 10, 12];
      let startDate = new Date(firstDay)
      let isLeapMonth = leapMonth.includes(this.curMonth + 1);
      startDate.setDate(firstDay.getDate() - dayOfWeek)
      let item, status, tempArr = [], tempItem, end = (dayOfWeek == 6 || dayOfWeek == 5 && isLeapMonth) ? 42 : 35;
      for (let i = 0 ; i < end ; i++) {
          item = new Date(startDate);
          item.setDate(startDate.getDate() + i);
          let month =  item.getMonth();
          if (this.curMonth === month) {
            status = 1
          } else {
            status = 0
          }

          tempItem = {
            index: i,
            date: `${item.getFullYear()}/${item.getMonth()+1}/${item.getDate()}`,
            status: status,
            customClass: []
          }
          this.events.forEach((event) => {
            if (isBeginEndDate(tempItem.date, event.beginDate, event.endDate)) {
              tempItem.type = event.type
              tempItem.title = event.title
              tempItem.desc = event.desc || ''
              if (event.customClass) tempItem.customClass.push(event.customClass)
            }
          })
          tempArr.push(tempItem)
      }
      return tempArr
    },
    today () {
      let dateObj = new Date()
      return `${dateObj.getFullYear()}/${dateObj.getMonth()+1}/${dateObj.getDate()}`
    },
    curYearMonth () {
      let tempDate = Date.parse(new Date(`${this.curYear}/${this.curMonth+1}/01`))
      return dateTimeFormatter(tempDate, this.i18n[this.calendar.options.locale].format)
    },
    customColor () {
      return this.calendar.options.color
    },
    restDayColor () {
      //休息日字体颜色
      return this.calendar.options.restDayColor
    },
    festivalColor () {
      //节假日字体颜色
      return this.calendar.options.festivalColor
    }
  },
  methods: {
    isBeginEndDate: isBeginEndDate,
    nextMonth () {
      this.$EventCalendar.nextMonth();
      this.curYear = this.calendar.params.curYear;
      this.curMonth = this.calendar.params.curMonth;
      this.$emit('month-changed', this.curYearMonth);
    },
    preMonth () {
      this.$EventCalendar.preMonth();
      this.curYear = this.calendar.params.curYear;
      this.curMonth = this.calendar.params.curMonth;
      this.$emit('month-changed', this.curYearMonth);
    },
    handleChangeCurday (date) {
      if (date.status) {
        this.$refs.dateNum.forEach(function(ele, index) {
          if (index == date.index) {
            ele.style.border = '3px solid #59C4EE';
          } else {
            ele.style.border = 'unset';
          }
        });
        this.$emit('cur-day-changed', date.date)
      }
    }
  }
}
</script>
<style scoped>

.cal-wrapper {
  width: 414px;
  padding: 0;
  display: inline-block;
  border: 1px solid #e0e3ec;
}
.cal-wrapper .date-num {
  line-height: 37px;
  cursor: pointer;
}

.cal-wrapper .cal-header {
  position: relative;
  width: 414px;
  height: 42px;
  background-color: #ffffff;
  font-weight: 500;
  overflow: hidden;
  padding-bottom: 10px;
  border-right: 1px solid #e0e3ec;
  border-bottom: 1px solid #e0e3ec;
}
.cal-wrapper .cal-header  > div {
  float: left;
  line-height: 20px;
  padding: 15px 0;
}
.cal-wrapper .cal-header .title {
  margin-left: 100px;
  margin-right: 100px;
  text-align: center;
}
.cal-wrapper .cal-header .l {
  text-align: left;
  width: 60px;
  height: 52px;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.cal-wrapper .cal-header .r {
  text-align: right;
  width: 60px;
  height: 52px;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.cal-wrapper .cal-body {
  width: 414px;
}
.cal-wrapper .cal-body .weeks {
  width: 100%;
  overflow: hidden;
  text-align: center;
  font-size: 1rem;
  padding: 0 11px;
}
.cal-wrapper .cal-body .weeks .item {
  line-height: 35px;
  float: left;
  height: 35px;
  width: 56px;
  color: #333333;
  font-size:15px;
  font-family:MicrosoftYaHei;
  font-weight:400;
}
.cal-wrapper .cal-body .dates {
  width: 414px;
  overflow: hidden;
  text-align: center;
  font-size: 1rem;
  padding: 0 11px;
}
.cal-wrapper .cal-body .dates .item {
  position: relative;
  float: left;
  display: block;
  height: 43px;
  width: 56px;
  line-height: 43px;
  cursor: default;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border-top: 1px solid #e0e3ec;
}
.cal-wrapper .cal-body .dates .item .date-num {
  cursor: pointer;
  font-size: 1rem;
  position: relative;
  z-index: 3;
  line-height: 37px;
}

.cal-wrapper .cal-body .dates .item .date-num.is-gray {
  color: #BCBDBF;
}

.cal-wrapper .cal-body .dates .item.event {
  cursor: pointer;
}
.cal-wrapper .cal-body .dates .item.selected-day .is-event {
  background-color: #f29543;
}
.cal-wrapper .cal-body .dates .item .is-selected-day {
  border: 3px solid #59c4ee;
}
.cal-wrapper .cal-body .dates .item .is-festival {
  content: "";
  background-color: #fff1ef;
  width: 56px;
  height: 43px;
  position: absolute;
  top: 50%;
  z-index: 1;
  margin-left: -28px;
  margin-top: -22px;
}
.cal-wrapper .cal-body .dates .item .is-restday {
  content: "";
  background-color: #eef9fd;
  width: 56px;
  height: 43px;
  position: absolute;
  top: 50%;
  z-index: 1;
  margin-left: -28px;
  margin-top: -22px;
}
.cal-wrapper .cal-body .dates .item .is-today {
  content: "";
  background-color: #f29543;
  border-radius: 50%;
  opacity: 0.8;
  width: 12px;
  height: 4px;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  margin-left: -6px;
  margin-top: 8px;
}
.arrow-left.icon {
  color: #E0E3EC;
  position: absolute;
  left: 27px;
  margin-top: 10px;
}
.arrow-left.icon:before {
  content: "";
  position: absolute;
  left: 1px;
  top: -5px;
  width: 10px;
  height: 10px;
  border-top: solid 1px currentColor;
  border-right: solid 1px currentColor;
  -webkit-transform: rotate(-135deg);
  transform: rotate(-135deg);
}
.arrow-right.icon {
  color: #E0E3EC;
  position: absolute;
  right: 25px;
  margin-top: 10px;
}
.arrow-right.icon:before {
  content: "";
  position: absolute;
  right: 1px;
  top: -5px;
  width: 10px;
  height: 10px;
  border-top: solid 1px currentColor;
  border-right: solid 1px currentColor;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

</style>

