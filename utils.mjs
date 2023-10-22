
export function log(obj) {
    console.log('from loger =>>', obj);
}
export function toNumber(str){
    try {
        const ret = Number(str)
        return isNaN(ret) ? 0 : ret
    } catch (e) {
        return 0
    }
}

export function sleep(ms)
{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, ms);
    })
}

export function random(min, max){
    try {
        return Math.floor(
            Math.random()*(max-min+1)+min
        )
    } catch (e) {
        return 0
    }
}
export function stringify(obj) {
    try {
        return JSON.stringify(obj)
    } catch (e) {
        return ''
    }
}

export   function isJSON(str)
{
    try {
        JSON.parse(str)
    } catch (e) {
        return false
    }
    return true
}

export   function toJSON(str)
{
    try {
       return JSON.parse(str)
    } catch (e) {
        return {}
    }
}