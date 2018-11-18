const BASE_URL = 'https://locally.uieee.com/'

export default fetch = (url,data={},method="GET")=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url: `${BASE_URL}${url}`,
      data,
      method,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}