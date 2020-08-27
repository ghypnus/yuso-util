/**
 * 文件工具
 * @author john.gao
 */
import { v4 } from 'uuid';

export default {
  /**
   * convert base64 to file
   * @param  {String} base64      base64
   * @param  {String} contentType file type
   * @return {Blob}
   */
  convertBase64ToFile(base64, contentType = 'image/png') {
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
  upload({ url, token, file, contentType = 'image/png'}) {
    var formData = new FormData();
    if (token) formData.append('token', token);
    var realBase64 = file.split(',')[1];
    var value = this.convertBase64ToFile(realBase64, contentType);
    var suffix = '.' + contentType.split('/')[1];
    if (value) {
      formData.append('file', value, v4() + suffix);
    }
    return axios({
      url: url,
      method: 'POST',
      data: formData
    })
  }
}