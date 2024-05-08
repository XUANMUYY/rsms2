// Utilities
import { defineStore } from 'pinia'
import { SQLCallback, SQLJson, UserData, SourcesArray, DeviceArray, CupboardArray } from '../type'
import ManageGetDeviceListSQL from '../sql/ManageGetDeviceList.sql?raw'

const path = await window.api.getPath()
const PoolOptions: SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)
const ManageGetDeviceList = ManageGetDeviceListSQL as string


export const useManageStore = defineStore('Manage', {
  state: () => ({}),
  actions: {
    async ManageGetUserList() {
      return SQLPool.execute('select ul.user,ul.name,ul.authority,ul.card,ul.state from user_list ul where name!=\'tmp\'', []).then((resolve: any) => {
        return resolve[0] as unknown as UserData[]
      })
    },
    async ChangeUser(user: string, UserData: UserData) {
      return SQLPool.execute('update user_list set name=?, authority=?,card=?,state=? where user=?', [UserData.name, UserData.authority, UserData.card, UserData.state, user]) as Promise<[SQLCallback, any]>
    },
    async ManageGetSourcesList() {
      return SQLPool.execute('select sl.*,0 as device_id,0 as cupbox_id from sources_list sl where nuclide!=\'tmp\'', []).then((resolve: any) => {
        return resolve[0] as unknown as SourcesArray[]
      })
    },
    async ChangeSource(SSID: string, SourcesArray: SourcesArray) {
      await SQLPool.execute('update device_list set SSID=? WHERE SSID=?', [0,SSID]).then(() => {
        SQLPool.execute('update device_list set SSID=? WHERE device_id=?', [SSID,SourcesArray.device_id])
      })
      return SQLPool.execute('update sources_list set nuclide=?, nuclide_id=?,nuclide_name=?,nuclide_index=?,nuclide_quality=?,nuclide_rate=?,nuclide_type=?,nuclide_energy=?,SourceStatus=? where SSID=?', [SourcesArray.nuclide, SourcesArray.nuclide_id, SourcesArray.nuclide_name, SourcesArray.nuclide_index, SourcesArray.nuclide_quality, SourcesArray.nuclide_rate, SourcesArray.nuclide_type, SourcesArray.nuclide_energy, SourcesArray.SourceStatus, SSID]) as Promise<[SQLCallback, any]>
    },
    async FindBand(SSID:string){
      return new Promise<any>((resolve, _reject) => {
        const band =  SQLPool.execute('SELECT IF(COUNT(*) = 1, TRUE, FALSE) AS result FROM `device_list` WHERE SSID = ?', [SSID]) as Promise<[SQLCallback, any]>
        return band.then((bandBool)=>{
          if(bandBool){
            const device_id_callback = SQLPool.execute('SELECT device_id from device_list where SSID = ?', [SSID]) as Promise<[SQLCallback, any]>
            device_id_callback.then((res)=>{
              const cupbox_id_callback = SQLPool.execute('SELECT cupbox_id from cupboard_list where device_id = ?', [res[0][0].device_id])
              cupbox_id_callback.then((res2)=>{
                if(res2[0].length>0){
                  resolve ({device_id:res[0][0].device_id,cupbox_id:res2[0][0].cupbox_id})
                }
                resolve ({device_id:res[0][0].device_id,cupbox_id:'0'})
              })
            })
          }else {
            resolve ({device_id:'0',cupbox_id:'0'})
          }
        })
      })
    },
    async ManageGetDeviceList() {
      return SQLPool.query(ManageGetDeviceList, []).then((resolve: any) => {
        const callback = resolve[0]
        const res:DeviceArray[] = []
        for(let i:number = 0; i < callback.length; i++) {
          const item_array = callback[i] as unknown as any[]
          if(!callback[i].hasOwnProperty('affectedRows')&& item_array.length>0){
            res.push(callback[i][0])
          }
        }
        return res
      })
    },
    async ManageGetDeviceListAll() {
      return SQLPool.execute("select dl.* from device_list dl where wiz_ip!='tmp'", []).then((resolve: any) => {
        return resolve[0] as unknown as DeviceArray[]
      })
    },
    async ChangeDevice(device_id: string, DeviceArray: DeviceArray) {
      return SQLPool.execute('update device_list set SSID=?,wiz_ip=?,wiz_port=? where device_id=?', [DeviceArray.SSID,DeviceArray.wiz_ip,DeviceArray.wiz_port,device_id]) as Promise<[SQLCallback, any]>
    },
    async ManageGetCupboardList() {
      return SQLPool.execute('select cl.* from cupboard_list cl', []).then((resolve: any) => {
        return resolve[0] as unknown as CupboardArray[]
      })
    },
    async ChangeCupboard(cupbox_id: string, CupboardArray: CupboardArray) {
      return SQLPool.execute('update cupboard_list set device_id=? where cupbox_id=?', [CupboardArray.device_id, cupbox_id]) as Promise<[SQLCallback, any]>
    },
  }
})
