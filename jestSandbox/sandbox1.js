const axios = require('axios')

const sum = (num1, num2) => {
    if (!num1 || !num2) return 'missing numbers!'

    return num1 + num2
}

const twoNumbers = (num1, num2) => {
    if (num1 && num2) {
        if (num1 > num2){
            return num1 - num2
        } else if (num1 === num2){
            return num1 ** 2
        } else {
            return num1 + num2
        }
    } else {
        return ('missing numbers!')
    }
}

const strings = (str) => {
    if (str){
        return str.split(' ');
    } else {
        throw new Error('no string found');
    }
}

const arr3 = (arr) => {
    return arr.map(arr => arr + 1)
}


const string4 = (str) => {
    return str.indexOf('t')
}

const isAnagram = (str1, str2) => {
    return formatString(str1) == formatString(str2)
}

const formatString = (str) => {
    return str
        .replace(/[^\w]/g, '')
        .toLowerCase()
        .split('') // split the letters in to an array
        .sort()
        .join('')
}

const chunkArray = (arr, length) => {
    // init chunked arr
    const chunkedArr = []; // null, [[1]], [[1,2]], [[1,2], [3]]

    arr.forEach(val => { // 1, 2
        const last = chunkedArr[chunkedArr.length - 1]; // null, 0, 0

        // check if last and if last length is equal to the chunk length
        if(!last || last.length === length) { // null, 1 ≠ 2
            chunkedArr.push([val]) //
        } else { // 2 = 2
            last.push(val) 
        }
    })
    return chunkedArr;
}

const profile = {
    add: (num1, num2) => num1 + num2,
    isNull: () => null,
    checkValue: (x) => x,
    createUser: () => {
        const user = {
            firstName: 'Tony',
            lastName: 'Kim'
        }
        return user;
    },
    fetchUser: async () => {
        try {
            const result = await axios.get('https://jsonplaceholder.typicode.com/users/1')
            
            return result.data
        } catch (err) {
            return 'error'
        }
    }
}

// console.log(profile.fetchUser())

const reverseString = (str) => { //Hello

    return str
        .toLowerCase() // hello
        .split('') //['h', 'e', 'l', 'l', 'o']
        .reverse() // ['o', 'l', 'l', 'e', 'h']
        .join('')

}


module.exports = {
    sum,
    twoNumbers,
    strings,
    arr3,
    string4,
    isAnagram,
    chunkArray,
    profile,
    reverseString
}