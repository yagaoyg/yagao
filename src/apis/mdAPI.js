import myAxios from "./base"

export const getMd = async (id) => {
  let data = ''
  await myAxios({
    method: 'get',
    url: `/md/${id}`
  }).then((res) => {
    // console.log(res.data)
    // return res.data
    data = res.data
  }).catch((err) => {
    console.dir(err)
  })
  return data
}

export const getMdList = async () => {
  let data = []
  await myAxios({
    method: 'get',
    url: '/md'
  }).then((res) => {
    // console.log(res)
    // return res.data
    data = res.data
  }).catch((err) => {
    console.dir(err)
  })
  return data
}