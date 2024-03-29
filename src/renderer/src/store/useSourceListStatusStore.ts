// Utilities
import { defineStore } from 'pinia'
import { SourcesArray } from '../type'

export const useSourceListStatusStore = defineStore('SourceListStatus', {
  state: () => ({
    expand:"" as string,
    OpenApplySheet:false as boolean,
    ChooseSource:{} as SourcesArray,
    Apply_expand:"" as string,
  }),
  actions: {
  }
})
