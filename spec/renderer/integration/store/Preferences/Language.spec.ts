import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { ipcMain, ipcRenderer } from '~/spec/mock/electron'
import Language, { LanguageState } from '@/store/Preferences/Language'
import DefaultLanguage from '~/src/constants/language'
import { MyWindow } from '~/src/types/global'
;((window as any) as MyWindow).ipcRenderer = ipcRenderer

const state = (): LanguageState => {
  return {
    language: {
      language: DefaultLanguage.en.key
    }
  }
}

const initStore = () => {
  return {
    namespaced: true,
    state: state,
    actions: Language.actions,
    mutations: Language.mutations
  }
}

describe('Preferences/Language', () => {
  let store
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Vuex.Store({
      modules: {
        Language: initStore()
      }
    })
  })

  describe('loadLanguage', () => {
    beforeEach(() => {
      ipcMain.handle('get-preferences', () => {
        return {
          language: {
            language: DefaultLanguage.ja.key
          }
        }
      })
    })
    afterEach(() => {
      ipcMain.removeHandler('get-preferences')
    })
    it('should be updated', async () => {
      await store.dispatch('Language/loadLanguage')
      expect(store.state.Language.language.language).toEqual(DefaultLanguage.ja.key)
    })
  })

  describe('changeLanguage', () => {
    beforeEach(() => {
      ipcMain.handle('change-language', (_, key: string) => {
        return key
      })
    })
    afterEach(() => {
      ipcMain.removeHandler('change-language')
    })
    it('should be changed', async () => {
      await store.dispatch('Language/changeLanguage', DefaultLanguage.ja.key)
      expect(store.state.Language.language.language).toEqual(DefaultLanguage.ja.key)
    })
  })
})
