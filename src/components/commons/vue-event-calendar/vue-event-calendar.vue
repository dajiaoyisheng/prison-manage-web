<template>
  <div class="__vue_calendar-wrapper">
    <cal-panel
      :events="events"
      :feedbackDay="feedbackDay"
      :calendar="calendarOptions"
      @cur-day-changed="handleChangeCurDay"
      @month-changed="handleMonthChanged">
    </cal-panel>
  </div>
</template>
<script>
import { isBeginEndDate } from "./tools.js";

//日历选择
import calPanel from "./components/cal-panel.vue";

const inBrowser = typeof window !== "undefined";
export default {
  name: "vue-event-calendar",
  components: {
    "cal-panel": calPanel
  },
  props: {
    title: String,
    feedbackDay: Object,
    events: {
      type: Array,
      required: true,
      default: [],
      validator(events) {
        let validate = true;
        events.forEach((event, index) => {
          if (!event.beginDate || !event.endDate) {
            console.error(
              "Vue-Event-Calendar-Error:" +
                "Prop events Wrong at index " +
                index
            );
            validate = false;
          }
        });
        return validate;
      }
    }
  },
  computed: {
    calendarOptions() {
      let dateObj = new Date();
      if (inBrowser) {
        return window.VueCalendarBarEventBus.CALENDAR_EVENTS_DATA;
      } else {
        return {
          options: {
            locale: "zh", //默认中文显示
            color: " #f29543"
          },
          params: {
            curYear: dateObj.getFullYear(),
            curMonth: dateObj.getMonth(),
            curDate: dateObj.getDate(),
            curEventsDate: "all"
          }
        };
      }
    },
    calendarParams() {
      let dateObj = new Date();
      if (inBrowser) {
        return window.VueCalendarBarEventBus.CALENDAR_EVENTS_DATA.params;
      } else {
        return {
          curYear: dateObj.getFullYear(),
          curMonth: dateObj.getMonth(),
          curDate: dateObj.getDate(),
          curEventsDate: "all"
        };
      }
    }
  },
  created() {
    if (this.calendarParams.curEventsDate !== "all") {
      this.handleChangeCurDay(this.calendarParams.curEventsDate);
    }
  },
  methods: {
    handleChangeCurDay(date) {
      let events = this.events.filter(function(event) {
        return isBeginEndDate(date, event.beginDate, event.endDate);
      });

      this.$emit("day-changed", {
        date: date,
        event: events[0]
      });
    },
    handleMonthChanged(yearMonth) {
      this.$emit("month-changed", yearMonth);
    }
  }
};
</script>
<style scoped>
.__vue_calendar-wrapper {
  display: inline-block;
}

</style>
