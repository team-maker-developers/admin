<template>
  <v-stepper-content step="2">
    <h3 class="py-3">社員へ送信する広報文を入力してください。</h3>
    <h4 class="py-1">広報文</h4>
    <v-row justify="center">
      <v-col :lg="9">
        <!-- TODO: #52 リード文のデフォルト値を設定可能にする -->
        <!-- <p
          class="
          text-right
          caption
          font-weight-thin
          mb-1"
          style="text-decoration-line: underline;"
        >
          デフォルト文を編集する
        </p> -->
        <v-form ref="leadForm" v-model="valid">
          <v-textarea
            v-model="announce"
            :rules="[(value) => !!value || '広報文を入力してください。']"
            auto-grow
            autofocus
            rows="7"
            row-height="30"
          >
          </v-textarea>
        </v-form>
      </v-col>
    </v-row>
    <job-confirm :job="job" />
    <div class="text-right">
      <v-btn color="primary" justify-end :disabled="!valid" @click="changeStep">
        次へ
      </v-btn>
      <v-btn text @click="changeBeforeStep">戻る</v-btn>
    </div>
  </v-stepper-content>
</template>

<script>
import jobConfirm from '../job-confirm.vue'
import announceStepMixin from './announce-step-mixin.js'

export default {
  components: { jobConfirm },
  mixins: [announceStepMixin],
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data: () => ({
    valid: false
  }),
  computed: {
    announce: {
      get() {
        return this.value
      },
      set(lead) {
        this.$emit('input', lead)
      }
    }
  }
}
</script>
