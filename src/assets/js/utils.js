export default {
    /**
     * 
     * @desc   判断是否为手机号
     * @param  {String|Number} str 
     * @return {Boolean} 
     */
    isPhoneNum(str) {
        return /^(\+?0?86\-?)?1[3456789]\d{9}$/.test(str)
    },

    /**
     * 
     * @desc   判断是否为邮箱地址
     * @param  {String}  str
     * @return {Boolean} 
     */
    isEmail(str) {
        return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
    },
    /**
     * 
     * @desc  判断是否为身份证号
     * @param  {String|Number} str 
     * @return {Boolean}
     */
    isIdCard(str) {
        return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
    }


}