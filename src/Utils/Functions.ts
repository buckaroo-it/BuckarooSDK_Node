export function uniqid(prefix = '', random = false) {
    const sec = Date.now() * 1000 + Math.random() * 1000
    const id = sec.toString(16).replace(/\./g, '').padEnd(14, '0')
    return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}` : ''}`
}

export function firstUpperCase(propertyName) {
    return propertyName.charAt(0).toUpperCase() + propertyName.slice(1)
}

export function firstLowerCase(propertyName) {
    return propertyName.charAt(0).toLowerCase() + propertyName.slice(1)
}
