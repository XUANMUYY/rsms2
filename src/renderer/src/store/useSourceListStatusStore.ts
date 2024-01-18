// Utilities
import { defineStore } from 'pinia'

export const useSourceListStatusStore = defineStore('SourceListStatus', {
  state: () => ({
    expand:"" as string,
    OpenApplySheet:false as boolean,
    OpenAddSource:false as boolean,
    ChooseSourceSSID:"" as string
  }),
  actions: {
  }
})
