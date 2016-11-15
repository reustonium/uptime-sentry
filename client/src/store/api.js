import axios from 'axios'

export function fetchJobs () {
  return axios.get('http://localhost:3000/jobs')
    .then(function (response) {
      return response.data
    })
}
