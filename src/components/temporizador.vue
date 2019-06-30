<template>
  <section id="temp">
    <div class="outer-container">
      <div class="inner-container">
        <div class="countdown">
          <h2>Tempo Restante: {{ timeLeft }}</h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "temporizador",
  data() {
    return {
      intervalTimer: "",
      selectedTime: 0,
      timeLeft: "00:00",
      endTime: "0",
      secondsLeft: "",
      seconds: ""
    };
  },

  methods: {
    setTime(seconds) {
      clearInterval(this.intervalTimer);
      this.timer(seconds);
    },
    timer(seconds) {
      const now = Date.now();
      const end = now + seconds * 1000;
      this.displayTimeLeft(seconds);

      this.selectedTime = seconds;
      this.displayEndTime(end);
      this.countdown(end);
    },
    countdown(end) {
      this.intervalTimer = setInterval(() => {
        this.secondsLeft = Math.round((end - Date.now()) / 1000);
        if (this.secondsLeft === 0) {
          this.endTime = 0;
        }

        if (this.secondsLeft < 0) {
          this.$store.commit("SET_STATUS", false);
          clearInterval(this.intervalTimer);
          return;
        }
        if (this.$store.state.experimento.ativo)
          this.$store.commit("UPDATE_TIMER", this.secondsLeft);
        this.displayTimeLeft(this.secondsLeft);
      }, 1000);
    },
    displayTimeLeft(secondsLeft) {
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      this.timeLeft = `${zeroPadded(minutes)}:${zeroPadded(seconds)}`;
    },
    displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const hour = end.getHours();
      const minutes = end.getMinutes();

      this.endTime = `${hourConvert(hour)}:${zeroPadded(minutes)}`;
    }
  },
  created() {
    this.seconds = this.$store.state.experimento.tempoRestante;
    this.setTime(this.seconds);
  },
  watch: {},
  computed: {}
};

function zeroPadded(num) {
  // 4 --> 04
  return num < 10 ? `0${num}` : num;
}

function hourConvert(hour) {
  // 15 --> 3
  return hour % 12 || 12;
}
</script>

<style>
/* ==================
 *  BASE
 * ================== */
body {
  font-family: "Sarpanch", sans-serif;
  color: hsl(0, 0%, 7%);
}
.outer-container {
  display: flex;
  align-items: center;
  flex-direction: column;

  justify-content: center;
}
/* ==================
 *  APP
 * ================== */
.countdown {
  margin: 5px 0 30px;
}
h1 {
  text-align: center;
  font-size: 18px;
  color: hsl(204, 86%, 43%);
}
h2 {
  font-size: 80;
  line-height: 1;
  text-align: center;
}
h3 {
  font-size: 28px;
  display: flex;
  align-items: baseline;
  justify-content: center;
}
h3 span {
  width: 70px;
  border-bottom: 2px solid hsl(348, 100%, 71%);
  margin-left: 15px;
  text-align: center;
}
.time {
  display: flex;
  justify-content: center;
}
.columns {
  margin-left: 0;
  margin-right: 0;
}
</style>

# Template pronto do temporizador encontrado em:
# https://vuejsexamples.com/a-not-fancy-countdown-timer-with-vue-js/
#