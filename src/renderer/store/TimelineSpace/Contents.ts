import SideBar, { SideBarModuleState } from './Contents/SideBar'
import Home from './Contents/Home'
import Notifications from './Contents/Notifications'
import Favourites from './Contents/Favourites'
import Local from './Contents/Local'
import Public from './Contents/Public'
import Search from './Contents/Search'
import Lists from './Contents/Lists'
import Hashtag from './Contents/Hashtag'
import DirectMessages from './Contents/DirectMessages'
import Mentions from './Contents/Mentions'
import { Module } from 'vuex'
import { RootState } from '@/store'

export interface ContentsState {}

export interface ContentsModuleState extends ContentsState {
  SideBar: SideBarModuleState
}

const state = (): ContentsState => ({})

const Contents: Module<ContentsState, RootState> = {
  namespaced: true,
  state: state,
  modules: {
    SideBar,
    Home,
    Notifications,
    Favourites,
    Local,
    DirectMessages,
    Mentions,
    Public,
    Search,
    Lists,
    Hashtag
  }
}

export default Contents
