/**
 * 文件工具
 * @author john.gao
 */
'use strict';

export default {
  /**
   * convert base64 to file
   * @param  {String} base64      base64
   * @param  {String} contentType file type
   * @return {Blob}
   */
  convertBase64ToFile(base64, contentType) {
    var byteCharacters = atob(base64);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], {
      type: contentType
    });
    return blob;
  },

  /**
   * upload file
   * @param  {Array} list An Array of base64 string
   */
  upload(params) {
    var self = this;
    var url = params.url,
      token = params.token,
      deviceid = params.deviceid,
      list = params.list,
      paramsJson = params.paramsJson,
      contentType = params.contentType;
    var formData = new FormData();
    if(token)formData.append('token', token);
    if(deviceid)formData.append('deviceid', deviceid);
    if(paramsJson){
      Object.keys(paramsJson).map(key=>{
        if(paramsJson[key])formData.append(key,paramsJson[key])
      })
    }
    var fileList = list.map(function(item, index) {
      var realBase64 = item.split(',')[1];
      var name = 'file-' + index;
      var value = self.convertBase64ToFile(realBase64, contentType)
      if(value)formData.append(name, value, name + '.png')
    })
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(res) {
          resolve(typeof res === 'string' ? JSON.parse(res) : res)
        },
        error: function(err) {
          reject(err)
        }
      })
    })
  }
}