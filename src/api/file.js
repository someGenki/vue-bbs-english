import http from '/src/utils/request'

export function uploadFile(file) {
  const param = new FormData() // 创建form对象 blob格式
  param.append('file', file) // 通过append向form对象添加数据
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  }
  return http.post('file/upload', param, config)
}

export function getFileInfo(url){
  if(!url) return
  return http.get('file/info?url='+url)
}