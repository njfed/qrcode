import {AsyncStorage} from 'react-native'
import Storage from 'react-native-storage'

const FAV_KEY = 'favorites'

const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true
})

const saveFav = (fav) => {
    return getFavList().then((ret=[]) => {
        if (!~ret.indexOf(fav)) {
            ret.push(fav)
        }

        return ret
    }).then(ret => {
        storage.save({key: FAV_KEY, data: ret})
    })
}

const removeFav = (fav) => {
    return getFavList().then((ret=[]) => {
        const index = ret.indexOf(fav)
        if (index > -1) {
            ret.splice(index, 1)
        }
        return ret
    }).then(ret => {
        storage.save({key: FAV_KEY, data: ret})
    })
}

const getFavList = () => {
    return storage.load({key: FAV_KEY}).catch(e => {
        return []
    })
}

const containsFav = (fav) => {
    return getFavList().then((data = []) => {
        return ~data.indexOf(fav)
    })
}

const clearFav = () => {
    storage.remove({key: FAV_KEY})
}

export default {
    getFavList,
    saveFav,
    removeFav,
    containsFav,
    clearFav
}