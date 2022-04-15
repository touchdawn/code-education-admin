
const utils = {
    merge (target, source) {
        for (let key in source) {
            target[key] = source[key]
        }
    },
    trim: function(str) {
        if (typeof str === 'string') {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
        return str
    },
    isEmpty: function (obj) {
        console.log('OKOK')
        if (!obj && obj !== 0) { return true }
        if (typeof obj === 'string') {
            return obj === ''
        } else if (obj instanceof Array) {
            return obj.length === 0
        }
        return false
    },
    data2Number (form, arr) {
        if (Array.isArray(arr)) {
            arr.forEach((item) =>　{
                if (form.hasOwnProperty(item)) {
                    let number = + form[item]
                    form[item] = number || + form[item]
                }
            })
        }
    }
}
export default {
    methods:{
        getFormData () {
            let formData = {}
            let searchForm = cloneObj(this.searchForm)
            for (let variable in searchForm) {
                if (searchForm.hasOwnProperty(variable)) {
                    let innerVal = searchForm[variable]
                    if (!utils.isEmpty(innerVal)) {
                        formData[variable] = utils.trim(innerVal)
                    }
                }
            }
            utils.data2Number(formData, this.settings.isNumber)
            return formData
        },


        getReqPrepared (initPage) {
            //从原来的searchdata中获取数据
            let formData = this.getFormData()
            formData.current = this.pageInfo.current
            formData.size = this.pageInfo.size
            return formData
        },

    }


}