import Vue from 'vue'
import lrz from 'lrz';
import {
  ToastPlugin,
  ConfirmPlugin
} from 'vux'
Vue.use(ToastPlugin, {
  position: 'middle',
  type: 'text',
  isShowMask: true
})
Vue.use(ConfirmPlugin)
export default {
  tools: {
    // 获取手机唯一码
    getUnique_code: function () {
      let uuid = ''
      try {
        // ios先获取uuid 防止其他的出现空格影响
        uuid = plus.device.uuid || plus.device.imsi || plus.device.imei || (new Date().getTime())
        // alert('uuid=' + uuid)
        plus.device.getInfo({
          success: function (e) {
            uuid = plus.device.uuid || plus.device.imsi || plus.device.imei || (new Date().getTime())
          },
          fail: function (e) {}
        });
      } catch (e) {

      }
      localStorage.setItem('unique_code', uuid)
    },
    // 获取手机的通讯录
    getPhoneList: function () {
      try {
        // let user_address_book = ""
        let phone_list = []
        plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, function (addressbook) {
          addressbook.find(["displayName", "phoneNumbers"], function (contacts) {
            // content = "联系人数量：" + contacts.length;
            // content += "<br>";
            for (var i = 0; i < contacts.length; i++) {
              for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                var str = contacts[i].displayName + "," + contacts[i].phoneNumbers[j].value;
                str = str.replace(/\s+|-/g, "")
                if (phone_list.indexOf(str) === -1) {
                  phone_list.push(str)
                }
              }
              // user_address_book += str;
            }
            localStorage.setItem('user_address_book', phone_list.join(',') || '')
          }, function () {
            Vue.$vux.toast.text('请授权手机通讯录')
            setTimeout(_ => {
              plus.runtime.quit();
            }, 2000)
          }, {
            multiple: true
          });
        }, function (e) {
          Vue.$vux.toast.text('请授权手机通讯录')
          setTimeout(_ => {
            plus.runtime.quit();
          }, 2000)
        });
      } catch (e) {
        // Vue.$vux.toast.text('请授权手机通讯录')
        // setTimeout(_ => {
        //   plus.runtime.quit();
        // }, 2000)
      }
    },

    isFirstVisitOfTody: function () {
      let firstVisitTimeOfTody = localStorage.getItem('firstVisitTimeOfTody');
      if (!firstVisitTimeOfTody) {
        return true;
      }

      firstVisitTimeOfTody = new Date(firstVisitTimeOfTody);
      if ((new Date() - firstVisitTimeOfTody - (1000 * 60 * 60 * 24)) >= 0) {
        return true;
      }

      return false;
    },
    formate: function (fmt) {
      // author: meizz
      let o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'h+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        S: this.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
          )
        }
      }
      return fmt
    },
    async base64Img(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      let isLt = files[0].size < 1048576 * 10;
      if (!isLt) {
        // this.$message.error('上传图片大小不能超过 10MB');
        return 'big';
      }
      const rst = await lrz(files[0], {
        quality: 0.1
      })
      //  await this.createImage(files[0]);
      // console.log(url, '--url---')
      return rst.base64
    },
    createImage(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        // reader.onload = e => {
        //   this.firImg = e.target.result
        // };
        reader.readAsDataURL(file);
        reader.onload = function () {
          resolve(this.result)
        }
      })
    },
    isPhone(val) {
      if (!(/^1[3456789]\d{9}$/.test(val))) {
        return true;
      }
      return false
    },
    /**
     * 长按保存图片
     * 1. 获取图片链接
     * 2. 创建下载并下载图片
     * 3. 保存至相册
     */
    savePic(src) {
      if (!window.plus) return;
      plus.gallery.save(src, function () {
        plus.nativeUI.alert("保存图片到相册成功");
      }, function () {
        plus.nativeUI.alert("保存失败");
      });
    },
    // 截取图片后缀用于重命名图片，防止%E5%85%89%E6%98%8E%E8%A1%8C编码的文件不被系统相册识别；
    cutImageSuffix(imageUrl) {
      var index = imageUrl.lastIndexOf('.');
      return imageUrl.substring(index);
    }
  },
  cookies: {
    setCookie: function (c_name, value, expire = 90 * 24 * 3600) {
      var date = new Date()
      date.setSeconds(date.getSeconds() + expire)
      document.cookie = c_name + "=" + escape(value) + "; expires=" + date.toGMTString() + ";path=/"
    },
    /*获取cookie*/
    getCookie: function (c_name) {
      if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
          c_start = c_start + c_name.length + 1
          let c_end = document.cookie.indexOf(";", c_start)
          if (c_end == -1) c_end = document.cookie.length
          return unescape(document.cookie.substring(c_start, c_end))
        }
      }
      return ""
    },
    /*删除cookie*/
    delCookie: function (c_name) {
      this.setCookie(c_name, "", -1)
    },
    delAllCookie: function () {
      this.setCookie("userInfo", "", -1)
      this.setCookie("token", "", -1)
    }
  },
  storage: {
    //存储
    set: function (key, value) {
      localStorage.setItem(key, JSON.stringify(value))
    },
    //取出数据
    get: function (key) {
      return JSON.parse(localStorage.getItem(key))
    },
    // 删除数据
    remove: function (key) {
      localStorage.removeItem(key)
    }
  }
}
