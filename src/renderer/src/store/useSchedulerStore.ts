// Utilities
import { defineStore } from 'pinia'
//Plugins

const SchedulerMax:number = 12
declare interface OPTION {
  delay: number,
  id: number
}
const CheckObject = (objectA: object, objectB: object, filter: string[]): boolean => {
  if(objectA==null||objectB==null) return false
  let Correct = 1
  const keys = Object.entries(objectA)
  for (let i = 0; i < keys.length; i++) {
    if (filter.includes(keys[i][0])) {
      Correct *= 1
    } else {
      if (typeof objectB[keys[i][0]] == typeof keys[i][1] && objectB[keys[i][0]] == keys[i][1]) {
        Correct *= 1
      } else {
        Correct *= 0
      }
    }
  }
  return Correct == 1
}

export const useSchedulerStore = defineStore('Scheduler', {
  state: () => ({
    max: SchedulerMax,
    count: 0 as number,
    queue0: Array.from({ length: SchedulerMax }, () => []) as any[][],
    queue0count: Array.from({ length: SchedulerMax }, () => 0) as number[],
    queue0status: Array.from({ length: SchedulerMax }, () => false) as boolean[],
    queue0recorder: Array.from({ length: SchedulerMax }, () => 0) as number[],
    queue0cache: Array.from({ length: SchedulerMax }, () => null) as any[],
    queue0enable: Array.from({ length: SchedulerMax }, () => true) as boolean[]
  }),
  actions: {
    async add(FUNCTION:Function, Value: any, Option: OPTION) {
      const executeID = this.queue0count.findIndex((count) => count == Math.min(...this.queue0count))
      this.queue0count[executeID]++
      await new Promise(resolve => this.queue0[executeID].push({ resolve: resolve, id: Option.id }))

      await new Promise(resolve => setTimeout(resolve, Option.delay))

      return await this.executeTask(FUNCTION, Value, executeID, Option)
    },
    start() {
      if (Math.max(...this.queue0count)) {
        for (let executeID = 0; executeID < 12; executeID++) {
          if(this.queue0enable[executeID])(!this.queue0status[executeID]) && this.queue0[executeID].length && (this.queue0[executeID].shift().resolve()||this.queue0count[executeID]--)
        }
      }
    },
    async executeTask(FUNCTION:Function, Value: any, executeID:number, _Option: OPTION) {
      const cache0index = this.queue0cache.findIndex((cache:any) =>{return CheckObject(cache,Value,[])})
      if(cache0index==-1){

        this.queue0cache[executeID] = Value
        this.queue0status[executeID] = true

        const res = await FUNCTION(Value)

        this.queue0cache[executeID] = null
        this.queue0status[executeID] = false

        this.queue0recorder[executeID]++

        if(this.queue0enable[executeID])(!this.queue0status[executeID]) && this.queue0[executeID].length && (this.queue0[executeID].shift().resolve()||this.queue0count[executeID]--)

        return res
      }
      else{
        this.queue0cache[executeID] = null
        this.queue0status[executeID] = true

        const res = "CACHE IN " + cache0index as unknown as number

        this.queue0cache[executeID] = null
        this.queue0status[executeID] = false

        this.queue0recorder[executeID]++

        if(this.queue0enable[executeID])(!this.queue0status[executeID]) && this.queue0[executeID].length && (this.queue0[executeID].shift().resolve()||this.queue0count[executeID]--)

        return res
      }
    }



  }
})
