import gql from 'graphql-tag'
import { TableHeader } from '@/types'

interface Page {
  id: string
  publishState: string
  isPublished: boolean
}

export interface JobItem {
  id: string
  code: string
  name: string
  page: Page
}

export const jobHeaders: TableHeader[] = [
  {
    text: '求人コード',
    align: 'left',
    value: 'code'
  },
  { text: '求人', value: 'name' },
  { text: '公開ステータス', value: 'page.publishState' },
  { text: '前回の広報日', value: 'last_announced_at' },
  { text: '', value: 'edit' },
  { text: '', value: 'others' }
]

export const getJobs = gql`
  query getJobs {
    jobs {
      id
      code
      name
      job_content
      last_announced_at
      page {
        id
        slug
        published_at
        publishState
        isPublished
      }
    }
  }
`

export const deleteJob = gql`
  mutation($id: ID!) {
    deleteJob(id: $id) {
      code
    }
  }
`
