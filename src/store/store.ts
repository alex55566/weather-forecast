import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { nanoid } from 'nanoid'

export interface State {
  location: Array<{id: string, location: object, order: number}>,
  order: number,
  isShowPopup: boolean,
  currentLocation: {id: string, location: object, order: number},
  id: string,
  isLoad: boolean,
  isError: boolean,
  isEmpty: boolean,
}

interface IPaylodChange {
  id: string,
  value: string,
  data: ICurrentLocation,
}

interface ICurrentLocation {
  cod: number|string
 }

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    location: [],
    order: 0,
    isShowPopup: true,
    currentLocation: {id: '', location: {}, order: 0},
    id: '928ac46e8ffbf411e62f28f0e5d6efb9',
    isLoad: false,
    isError: false,
    isEmpty: false,
  },
  mutations: {
    addLocation(state, currentLocation: ICurrentLocation) {
      state.isError = false
      let currentOrder
      const checkStorage = sessionStorage.getItem('locations')
      if (checkStorage) {
        let check = Math.max.apply(Math, JSON.parse(sessionStorage.getItem('locations')!).map(o => o.order))
  
        currentOrder = check+1
      }
      if(currentLocation.cod === '404') {
        state.isError = true
      }
      if(currentLocation.cod === 200) {
        state.location.push({order: sessionStorage.getItem('locations') ? currentOrder : state.order, id: nanoid(), location: currentLocation})
        state.order++
        sessionStorage.setItem('locations', JSON.stringify(state.location))
      }
    },
    deleteLocation(state, currentId: string) {
      state.location = state.location.filter(el => el.id !== currentId )
      sessionStorage.setItem('locations', JSON.stringify(state.location))
    },
    changeLocation(state, payload: IPaylodChange) {
      state.isError = false
      if(payload.data.cod === '404') {
        state.isError = true
      }
      if(payload.data.cod === 200) {
        state.location.forEach(loc => {
          if (loc.id === payload.id) {
            loc.location = payload.data
          }
        })
        sessionStorage.setItem('locations', JSON.stringify(state.location))
      }
    },

    changePopup(state) {
      state.isShowPopup = false
    },

    changeEmpty(state, payload) {
      state.isEmpty = payload
    },

    loadSession(state) {
      state.location = JSON.parse(sessionStorage.getItem('locations')!)
      state.isShowPopup = false
    },

    changeError(state) {
      state.isError = false
    },

    // дрэг дроп

    dragStartHandler(state, currentLocation) {
      state.currentLocation = currentLocation
    },

    dropHandler(state, payload) {
      state.location = state.location.map(c => {
          if(c.id === payload.loc.id) {
              return {...c, order: state.currentLocation.order}
          }
          if(c.id === state.currentLocation.id) {
              return {...c, order: payload.loc.order}
          }
          return c 
      })
    },

    // ошибки, загрузка

    showLoader(state, load) {
      state.isLoad = load
    },
    showError(state, error) {
        state.isError = error
    },
  },
  actions: {
    async addLocation(context, payload: string) {
      try {
        context.commit('showLoader', true)

        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=${context.state.id}&units=metric`)
        let data = await response.json()

        context.commit('addLocation', data);
      } catch (e) {
          context.commit('showError', true)

      } finally {
          context.commit('showLoader', false)

      }
    },
    async changeLocation(context, payload: IPaylodChange) {
      try {
        context.commit('showLoader', true)

        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${payload.value}&appid=${context.state.id}`)
        let data = await response.json()

        context.commit('changeLocation', {data: data, id: payload.id });
      } catch (e) {
          context.commit('showError', true)

      } finally {
          context.commit('showLoader', false)

      }
    },
  },
  getters: {
  
    sortedLocations(state) {
   
      state.location.sort((a,b) => {
        if (a.order > b.order) {
          return 1
        }
        else { 
          return -1
        }
      })
      if(state.location.length) {
        sessionStorage.setItem('locations', JSON.stringify(state.location))
      }
      return state.location
    }
  }
})

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}

