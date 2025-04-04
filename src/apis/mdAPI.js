import myAxios from "./base"

/**
 * 根据文章ID获取指定的markdown文章内容
 * @param {string|number} id - 文章ID
 * @returns {Promise<string>} 返回文章内容
 */
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

/**
 * 获取所有markdown文章的列表
 * @returns {Promise<Array>} 返回文章列表数组
 */
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

/**
 * 上传markdown文件及其相关信息
 * @param {FormData} formData - 包含文件和元数据的表单数据
 * @returns {Promise<boolean>} 上传是否成功
 */
export const uploadMd = async (formData) => {
  let result = {
    success: false,
    msg: ''
  }
  await myAxios({
    method: 'post',
    url: '/md/upload',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(() => {
    result.success = true
  }).catch((err) => {
    // console.dir(err)
    result.msg = err.response.data.message
  })
  return result
}