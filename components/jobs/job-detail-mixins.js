import { getEmploymentCategories } from '@/constants/jobs/job'
import jobForm from './job-form.vue'
import jobFooter from './job-footer.vue'

export default {
  components: { jobForm, jobFooter },
  data: () => ({
    jobValue: {
      page: {}
    }
  }),
  computed: {
    loading() {
      const queries = this.$apollo.queries
      const jobLoading = 'job' in queries && queries.job.loading
      return jobLoading || queries.employmentCategories.loading
    }
  },
  apollo: {
    employmentCategories: {
      query: getEmploymentCategories
    }
  }
}
