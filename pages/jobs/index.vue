<template>
  <div>
    <v-container>
      <h2>求人一覧</h2>
      <v-row justify="center">
        <v-col :lg="9">
          <div class="text-right">
            <v-btn outlined small color="primary" to="/jobs/create/">
              新規作成
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col :lg="9">
          <job-table :jobs="jobs" :job-actions="jobActions" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { TableAction } from '@/types'
import { jobStore } from '@/store'
import { getJobs, JobItem } from '@/constants/jobs/jobs'
import jobTable from '@/components/jobs/job-table.vue'

@Component({
  components: { jobTable },
  apollo: {
    jobs: {
      query: getJobs
    }
  }
} as any)
export default class JobsIndexVue extends Vue {
  jobActions: TableAction<JobItem>[] = [
    {
      text: 'LINEで広報する',
      action: (job: JobItem) => {
        this.pushAnnounceCreate(job.id)
      },
      visible: (job: JobItem) => {
        return job.page.isPublished
      }
    },
    {
      text: '下書きに戻す',
      alterText: '公開する',
      action: async (job: JobItem) => {
        if (job.page.isPublished) {
          await jobStore.unpublishJob(job.page)
        } else {
          await jobStore.publishJob(job.page)
        }
        this.refetchJobs()
      }
    },
    {
      text: '削除',
      action: ({ id }: JobItem) => {
        jobStore.deleteJob(id)
      }
    }
  ]

  refetchJobs() {
    this.$apollo.queries.jobs.refetch()
  }

  pushAnnounceCreate(id: string) {
    this.$router.push({
      path: '/announces/create/',
      query: { jobId: id }
    })
  }
}
</script>
