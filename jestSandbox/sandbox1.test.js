const {
    sum,
    twoNumbers,
    strings,
    arr3,
    string4,
    isAnagram,
    chunkArray,
    profile,
    reverseString

} = require('./sandbox1')

const axios = require('axios')

let letter = 'a'

beforeAll(() => {
    letter = 'kar'
})

afterAll(() => {
    letter = 'done!'
})

test('should expect to check if the value of letter is NOT equal to a before running this test', () => {
    expect(letter).not.toBe('a')
})


// ############################################

describe('sum function', () => {
    test('should return the total of num1 and num2', () => {
        expect(sum(2, 3)).toBe(5)
    })
    
    test('should return a test that says missing numbers if arguments are missing', () => {
        expect(sum(1)).toBe('missing numbers!')
    })
})

// ############################################

describe('twoNumbers function', () => {
    test('should return the difference of num1 and num2 if num1 > num2', () => {
        expect(twoNumbers(10, 5)).toBe(5)
    })
    
    test('should return the squared value of num1 if num1 equals num2', () => {
        expect(twoNumbers(2, 2)).toBe(4)
    })
    
    test('should return the total of num1 and num2 if num1 < num2', () => {
        expect(twoNumbers(5,10)).toBe(15)
    })
    
    test('should return missing numbers if num1 or num2 are missing', () => {
        expect(twoNumbers(5)).toBe('missing numbers!')
    })
})

// ############################################

describe('objects', () => {
    const data = {
        firstName: 'Tony',
        lastName: 'Kim'
    }

    test('should return object with new property called age with value of 57', () => {
        data.age = 57;

        expect(data).toEqual({ firstName: 'Tony', lastName: 'Kim', age: 57 })
    })

    test('should return true if address is property is not contained in this data object', () => {
        expect(data).not.toContain({ address: 'some address'})
    })

    test('should return true if firstName property exists with value of Tony', () => {
        expect(data).toEqual({ firstName: 'Tony', lastName: 'Kim', age: 57})
    })

})

// ############################################

describe('arrays', () => {
    const arr = [];

    test('should return false if array is empty', () => {
        expect(arr.length).toBeFalsy()
    })
})

// ############################################

describe('arrays 2', () => {
    const arr = [
        'chicken',
        'nuggets',
        'chicken burger',
        'fries',
        'sundae'
    ]

    test('should return true if fries exists in the array', () => {
        expect(arr).toContain('fries')
    }) 
})

// ############################################

describe('strings', () => {
    test('should return an array of letters', () => {
        expect(strings('chicken nuggets')).toEqual(['chicken','nuggets'])
    })
    test('should return an error if no string is attached', () => {
        expect(() => strings()).toThrow(Error)
    })
})

// ############################################

describe('objects 2', () => {
    const emptyObject = {};

    test('should expect to return an empty object', () => {
        expect(Object.values(emptyObject).length).toBeFalsy()
        expect(Object.values(emptyObject).length).toBe(0)
        expect(Object.values(emptyObject)).toEqual([])
    })
})

// ############################################

describe('undefined', () => {
    let thisIsUndefined;

    test('should expect to be truthy if value is undefined', () => {
        expect(thisIsUndefined).toBeUndefined();
    })
})

// ############################################

describe('null', () => {
    let thisIsNull = null;

    test('should expect to be truthy if value is null', () => {
        expect(thisIsNull).toBeNull();
    })
})

// ############################################

describe('arr 3', () => {
    let numbers = [1, 2, 3];

    test('should expect to return a new array', () => {
        expect(arr3([1, 2, 3])).toEqual([2,3,4])
    })
})

// ############################################

describe('string 4', () => {
    test('should expect to return index of t', () => {
        expect(string4('tony')).toBe(0)
    })
})

// ############################################

describe('isAnagram', () => {
    test('should return true if isAnagram is a function', () => {
        expect(typeof isAnagram).toEqual('function')
    })
    test('should return true if iceman is a anagram of cinema', () => {
        expect(isAnagram('iceman','cinema')).toBeTruthy()
    })
    test('should return false if kassandra and kara is not a anagram', () => {
        expect(isAnagram('kassandra','kara')).toBeFalsy()
    })

    test('should return true if ARE and is anagram of ear', () => {
        expect(isAnagram('ARE','ear')).toBeTruthy()
    })
})

// ############################################

describe('chunkedArray', () => {

    test('should return true if chunkArray is a function', () => {
        expect(typeof chunkArray).toEqual('function')
    })

    test('should return a chunked array in sizes of 2', () => {
        const numbers = [1, 2, 3, 4, 5, 6]
        const length = 3;

        expect(chunkArray(numbers, length)).toEqual([[1,2,3],[4,5,6]])

    })

    test('should return a chunked array in sizes of 1', () => {
        const numbers = [1, 2, 3]
        const length = 1;

        expect(chunkArray(numbers, length)).toEqual([[1],[2],[3]])
    })

})

// ############################################

describe('profile', () => {

    describe('add()', () => {
        test('should return 4 when passing in 2 and 2 as arguments', () => {
            expect(profile.add(2, 2)).toEqual(4)
        })
        test('should return false when you pass 2 and 3 as arguments', () => {
            expect(profile.add(2, 3)).not.toEqual(4)
        })

    })

    describe('null', () => {
        test('should return null', () => {
            expect(profile.isNull()).toBeNull();
        })
    })

    describe('checkValue', () => {
        test('should return false if passed in undefined', () => {
            expect(profile.checkValue()).toBeUndefined();
        })
        test('should return true if passed in a positive number', () => {
            expect(profile.checkValue(10)).toBeTruthy()
        })
    })
    describe('createUser', () => {
        test('should return object with firstame and lastName of Tony Kim', () => {
            expect(profile.createUser()).toEqual({firstName: 'Tony', lastName: 'Kim'})
        })
    })

    describe('fetchUser', () => {
        test('should return the name of Leanne Graham', async () => {
            // fetch data
            const data = await profile.fetchUser();

            expect(data.name).toEqual('Leanne Graham')

        })
        test('should return company name of Romaguera-Crona', async () => {
            const data = await profile.fetchUser();

            expect(data.company.name).toEqual('Romaguera-Crona')
        })
    })


})


describe('reverseString', () => {

    test('should return olleh from hello', () => {
        expect(reverseString('hello')).toBe('olleh')
    })

    test('should return olleh from Hello', () => {
        expect(reverseString('Hello')).toBe('olleh')
    })

})

