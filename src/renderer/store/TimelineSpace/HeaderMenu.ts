import generator, { Entity } from 'megalodon'
import { Module, MutationTree, ActionTree } from 'vuex'
import { RootState } from '@/store'
import AxiosLoading from '@/utils/axiosLoading'

export type HeaderMenuState = {
  title: string
  reload: boolean
  loading: boolean
}

const state = (): HeaderMenuState => ({
  title: 'Home',
  reload: false,
  loading: false
})

export const MUTATION_TYPES = {
  UPDATE_TITLE: 'updateTitle',
  CHANGE_RELOAD: 'changeReload',
  CHANGE_LOADING: 'changeLoading'
}

const mutations: MutationTree<HeaderMenuState> = {
  [MUTATION_TYPES.UPDATE_TITLE]: (state, title: string) => {
    state.title = title
  },
  [MUTATION_TYPES.CHANGE_RELOAD]: (state, value: boolean) => {
    state.reload = value
  },
  [MUTATION_TYPES.CHANGE_LOADING]: (state, value: boolean) => {
    state.loading = value
  }
}

const actions: ActionTree<HeaderMenuState, RootState> = {
  fetchList: async ({ commit, rootState }, listID: string): Promise<Entity.List> => {
    const client = generator(
      rootState.TimelineSpace.sns,
      rootState.TimelineSpace.account.baseURL,
      rootState.TimelineSpace.account.accessToken,
      rootState.App.userAgent
    )
    const res = await client.getList(listID)
    commit(MUTATION_TYPES.UPDATE_TITLE, `#${res.data.title}`)
    return res.data
  },
  setupLoading: ({ commit }) => {
    const axiosLoading = new AxiosLoading()
    axiosLoading.on('start', (_: number) => {
      commit(MUTATION_TYPES.CHANGE_LOADING, true)
    })
    axiosLoading.on('done', () => {
      commit(MUTATION_TYPES.CHANGE_LOADING, false)
    })
  }
}

const HeaderMenu: Module<HeaderMenuState, RootState> = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions
}

export default HeaderMenu
