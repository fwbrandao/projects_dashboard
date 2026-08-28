import type { ComponentType } from 'react'
import TicTacToe from './TicTacToe'
import DrumKit from './DrumKit'
import AnalogClock from './AnalogClock'
import CitySearch from './CitySearch'
import SpaceRagArchitecture from './SpaceRagArchitecture'

/** Maps a project id to its live, in-browser demo component. */
export const demos: Record<string, ComponentType> = {
  'tic-tac-toe': TicTacToe,
  'js30-drum-kit': DrumKit,
  'js30-clock': AnalogClock,
  'js30-city-search': CitySearch,
}

/** Optional architecture panel on the project detail page. */
export const architecturePanels: Record<string, ComponentType> = {
  'rag-space-chatbot': SpaceRagArchitecture,
}

export const hasDemo = (id: string) => id in demos
