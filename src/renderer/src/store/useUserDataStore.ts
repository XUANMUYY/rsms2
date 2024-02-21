// Utilities
import { defineStore } from 'pinia'
import { SQLJson, UserApply, UserDataSources, UserSource,UserRegister } from '../type'
import UserDataStoreSQL from '../sql/UserDataStore.sql?raw'
import AddApplyStoreSQL from '../sql/AddApplyStore.sql?raw'
import AddUserStoreSQL from '../sql/AddUserStore.sql?raw'

const path = await window.api.getPath()
const PoolOptions:SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)
const AddApplyStore = AddApplyStoreSQL as string
const AddUserStore = AddUserStoreSQL as string

export const useUserDataStore = defineStore('UserData', {
  state: () => ({
    UserStatus:"Logout" as "Logout"|"Login",
    UserData: {
      user: '',
      authority: 'guest',
      name: '',
      card: '-1'
    } as UserSource,
    UserPass: {CupBoard:[],Sources:[]} as UserDataSources,
    UserOut: {CupBoard:[],Sources:[]} as UserDataSources,
    Login:false as boolean,
    Register:false as boolean,
    Register_step:1,
    apply_id:0,
    UserApply:{
      SSID:"0",
      first_time:"0000-00-00 00:00:00",
      last_time:"0000-00-00 00:00:00",
      reason:"tmp",
      apply_status:"process-forbid",
      event_status:"normal",
      user_status:"normal",
    } as UserApply,
    UserRegister:{
      UserResult: false,
      CardResult: false,
      authority: 'guest',
      Card: '',
      User: '',
      name: '',
      password: '',
      Result:0} as UserRegister
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
              authority: 'guest',
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
              authority: 'guest',
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
            authority: 'guest',
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
    async RefreshApply(){
      await SQLPool.query(AddApplyStore)
      const _apply_id = await SQLPool.execute('SELECT apply_id  FROM `apply_list` WHERE user = \'tmp\'', [])
      this.apply_id = _apply_id[0][0]['apply_id']
    },
    async AddApply(){
      //noinspection JSUnresolvedVariable
      const result = await SQLPool.execute('update apply_list set SSID = ?, user = ?, first_time = ?, last_time = ?, reason = ?, apply_status = ?, user_status = ?,event_status=? where apply_id = ?',
        [this.UserApply.SSID,
          this.UserApply.user,
          this.UserApply.first_time,
          this.UserApply.last_time,
          this.UserApply.reason,
          this.UserApply.apply_status,
          this.UserApply.user_status,
          this.UserApply.event_status,
          this.apply_id
        ])
      console.log(result)
    },
    async RefreshRegister(){
      await SQLPool.query(AddUserStore)
    },
    async RefreshUser(user:string){
      const _result = await SQLPool.execute('SELECT IF(COUNT(*) > 0, TRUE, FALSE) AS result FROM `user_list` WHERE user = ?', [user])
      this.UserRegister.UserResult = _result[0][0]['result'] == 1
    },
    async RefreshCard(card:string){
      const _result = await SQLPool.execute('SELECT IF(COUNT(*) > 0, TRUE, FALSE) AS result FROM `user_list` WHERE card = ?', [card])
      this.UserRegister.CardResult = _result[0][0]['result'] == 1
    },
    async AddUser(user:string,name:string,password:string,authority:'root'|'normal'|'guest',card:string){
      const result = await SQLPool.execute('update user_list set user = ?, name = ?, password = ?, authority = ?, card = ? where name = ?',
        [
          user,
          name,
          password,
          authority,
          card,
          'tmp'
        ])
      //noinspection JSUnresolvedVariable
      this.UserRegister.Result = result[0]['changedRows']
    },
    ConsoleUserData(){
      console.log(this.UserData)
    },
    Clear() {
      //noinspection JSUnresolvedVariable
      this.UserData = {
        user: '',
        authority: 'guest',
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
