import gql from 'graphql-tag'

export const getEmploymentCategories = gql`
  query {
    employmentCategories {
      id
      name
    }
  }
`

export const updateJobPublishAt = gql`
  mutation($id: ID!, $published_at: DateTime) {
    updateJobPublishAt(id: $id, published_at: $published_at) {
      id
      isPublished
      publishState
      published_at
    }
  }
`

export const getJob = gql`
  query($id: ID!) {
    job(id: $id) {
      id
      code
      name
      expired_at
      job_content
      employment_category_id
      contract_period
      place
      work_datetime
      salary
      welfare
      industry
      info
      page {
        publishState
        released_at
        isReleased
      }
    }
  }
`

export const upsertJob = gql`
  mutation($input: UpsertJobInput!) {
    upsertJob(input: $input) {
      id
      code
      name
      isPublished
      publishState
      published_at
      expired_at
      job_content
      employment_category_id
      contract_period
      place
      work_datetime
      salary
      welfare
      industry
      info
    }
  }
`
