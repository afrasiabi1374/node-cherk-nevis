export const perssons = [
    {
        name: 'ali',
        lastName: 'afrasiabi',
        age: 28,
        id: 1
    },
    {
        name: 'rasoul',
        lastName: 'afrasiabi',
        age: 55,
        id: 2
    },
    {
        name: 'mahdi',
        lastName: 'afrasiabi',
        age: 25,
        id: 3
    },
    {
        name: 'amir hossein',
        lastName: 'afrasiabi',
        age: 16,
        id:4
    },
    {
        name: 'maryam',
        lastName: 'kamali hosseini',
        age: 54,
        id:5
    },
]

export const deletePersson = function(id) {
    let index = perssons.findIndex(p => p.id == id)
    console.log(index);
    perssons.splice(index, 1)
}

export const addPersson = function(user) {
    perssons.push({...user, id: perssons.length+1})
}

export const perssonById = function (id) {
    return new Promise((reject, resolve) => {
        try {
            let filtered = perssons.find( p => p.id == id)
            setTimeout(() => {
                if (filtered?.name) {
                    
                    resolve(filtered?.name)
                }else {
                    resolve('persson not found')
                }
            }, 5000);
        } catch (e) {
            reject(e)
        }
    })
}

export const changeLang = function (l) {
    return new Promise((reject, resolve) => {
        try {
                if (l == 'en') {
                    
                    resolve('fa')
                } else if(l == 'fa') {
                    resolve('en')
                } else {
                    resolve('en')
                }
        } catch (e) {
            reject(e)
        }
    })
}