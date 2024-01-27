// Utilities
import { defineStore } from 'pinia'
import { SQLJson, UserDataSources, UserSource } from '../type'
import UserDataStoreSQL from '../sql/UserDataStore.sql'

const path = await window.api.getPath()
const PoolOptions:SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)

export const useUserDataStore = defineStore('UserData', {
  state: () => ({
    UserStatus:"Logout" as "Logout"|"Login",
    UserData: {
      user: '',
      authority: '',
      name: '',
      card: '-1'
    } as UserSource,
    UserPass: {CupBoard:[],Sources:[]} as UserDataSources,
    UserOut: {CupBoard:[],Sources:[]} as UserDataSources,
    Login:false as boolean,
  }),
  getters:{
  },
  actions: {
    async GetUserData(_user:string,_password:string, _card: string) {
      try {
        if (_password!=""&&_user!=""){
          const _result =   await SQLPool.execute('SELECT IF(COUNT(*) > 0 AND SUM(password = ?), TRUE, FALSE) AS result FROM user_list WHERE user =?', [_password,_user])
          if(_result[0][0]['result'] != 1){
            //noinspection JSUnresolvedVariable
            this.UserStatus = "Logout"
            //noinspection JSUnresolvedVariable
            this.UserData = {
              user: '',
              authority: '',
              name: '',
              card: '-1'
            } as UserSource
          }
          else {
            const _UserData = await SQLPool.execute('SELECT user,authority,name,card FROM user_list where user=?',[_user])
            //noinspection JSUnresolvedVariable
            this.UserStatus = "Login"
            //noinspection JSUnresolvedVariable
            this.UserData = _UserData[0][0] as unknown as UserSource
          }
        }
        else if(_card!=""&&_card!="-1"){
          const _UserData =   await SQLPool.execute('SELECT user,authority,name,card FROM user_list where card=?', [_card])
          if(_UserData[0].length!=0){
            //noinspection JSUnresolvedVariable
            this.UserStatus = "Login"
            //noinspection JSUnresolvedVariable
            this.UserData = _UserData[0][0] as unknown as UserSource
          }
          else {
            //noinspection JSUnresolvedVariable
            this.UserStatus = "Logout"
            //noinspection JSUnresolvedVariable
            this.UserData = {
              user: '',
              authority: '',
              name: '',
              card: '-1'
            } as UserSource
          }
        }
        else {
          //noinspection JSUnresolvedVariable
          this.UserStatus = "Logout"
          //noinspection JSUnresolvedVariable
          this.UserData = {
            user: '',
            authority: '',
            name: '',
            card: '-1'
          } as UserSource
        }
        //noinspection JSUnresolvedVariable
        if(this.UserStatus=="Login"){
          const _UserSources = await SQLPool.execute(UserDataStoreSQL as string, ["","","", (_card!="-1"&&_card!="")?_card:this.UserData.card]) as unknown as UserSource[]
          const UserSources = _UserSources[0] as unknown as UserSource[]
          //noinspection JSUnresolvedVariable
          this.UserPass = {CupBoard:[],Sources:[]}
          //noinspection JSUnresolvedVariable
          this.UserOut = {CupBoard:[],Sources:[]}
          if(UserSources.length!=0){
            UserSources.forEach((_UserSources)=>{
              if(_UserSources.status=="PROCESS-PASS"){
                //noinspection JSUnresolvedVariable
                this.UserPass.CupBoard.push(_UserSources.cupbox_id)
                //noinspection JSUnresolvedVariable
                this.UserPass.Sources.push({
                  SSID:_UserSources.SSID,
                  cupbox_id:_UserSources.cupbox_id,
                  nuclide:_UserSources.nuclide,
                  nuclide_id:_UserSources.nuclide_id,
                  nuclide_name:_UserSources.nuclide_name,
                  nuclide_quality:_UserSources.nuclide_quality,
                  tcp_ip:_UserSources.wiz_ip,
                  tcp_port:_UserSources.wiz_port,
                  device_id:_UserSources.device_id,
                  device_number:_UserSources.device_number,
                  status:_UserSources.status,
                })
              }
              else {
                //noinspection JSUnresolvedVariable
                this.UserOut.CupBoard.push(_UserSources.cupbox_id)
                //noinspection JSUnresolvedVariable
                this.UserOut.Sources.push({
                  SSID:_UserSources.SSID,
                  cupbox_id:_UserSources.cupbox_id,
                  nuclide:_UserSources.nuclide,
                  nuclide_id:_UserSources.nuclide_id,
                  nuclide_name:_UserSources.nuclide_name,
                  nuclide_quality:_UserSources.nuclide_quality,
                  tcp_ip:_UserSources.wiz_ip,
                  tcp_port:_UserSources.wiz_port,
                  device_id:_UserSources.device_id,
                  device_number:_UserSources.device_number,
                  status:_UserSources.status,
                })
              }
            })
          }
        }
        else {
          //noinspection JSUnresolvedVariable
          this.UserPass = {CupBoard:[],Sources:[]}
          //noinspection JSUnresolvedVariable
          this.UserOut = {CupBoard:[],Sources:[]}
        }
      } catch (error) {
        console.error(error)
      }
    },
    ConsoleUserData(){
      console.log(this.UserData)
    },
    Clear() {
      //noinspection JSUnresolvedVariable
      this.UserData = {
        user: '',
        authority: '',
        name: '',
        card: '-1'
      } as UserSource
      //noinspection JSUnresolvedVariable
      this.UserPass = {CupBoard:[],Sources:[]}
      //noinspection JSUnresolvedVariable
      this.UserOut = {CupBoard:[],Sources:[]}
      //noinspection JSUnresolvedVariable
      this.UserStatus = "Logout"
    }
  }
})
