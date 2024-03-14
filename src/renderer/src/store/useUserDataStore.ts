// Utilities
import { defineStore } from 'pinia'
import { SQLJson, UserApply, UserDataSources, UserSource, UserRegister, UserDataSourcesSource, UserData,User } from '../type'
import UserDataStoreSQL from '../sql/UserDataStore.sql?raw'
import AddApplyStoreSQL from '../sql/AddApplyStore.sql?raw'
import AddUserStoreSQL from '../sql/AddUserStore.sql?raw'

const path = await window.api.getPath()
const PoolOptions: SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)
const AddApplyStore = AddApplyStoreSQL as string
const AddUserStore = AddUserStoreSQL as string
const EmptyUserData = {
  user: '',
  authority: 'guest',
  name: '',
  card: '-1',
  state: 'freeze'
} as UserData

export const useUserDataStore = defineStore('UserData', {
  state: () => ({
    UserStatus: 'Logout' as 'Logout' | 'Login',
    UserData: EmptyUserData,
    UserPass: { CupBoard: [], Sources: [] } as UserDataSources,
    UserOut: { CupBoard: [], Sources: [] } as UserDataSources,
    apply_id: 0,
    UserApply: {
      SSID: '0',
      first_time: '0000-00-00 00:00:00',
      last_time: '0000-00-00 00:00:00',
      reason: 'tmp',
      apply_status: 'process-forbid',
      event_status: 'normal',
      user_status: 'normal'
    } as UserApply,
    UserRegister: {
      UserResult: false,
      CardResult: false,
      authority: 'guest',
      Card: '',
      User: '',
      name: '',
      password: '',
      Result: 0
    } as UserRegister,
    Login: false as boolean,
    Register: false as boolean,
    Register_step: 1
  }),
  getters: {},
  actions: {
    async GetUserData(_user: string, _password: string, _card: string):Promise<User> {
      return new Promise(async (resolve, _reject) => {
        try {
          if (_password != '' && _user != '') {
            const _result = await SQLPool.execute('SELECT IF(COUNT(*) > 0 AND SUM(password = ?), TRUE, FALSE) AS result FROM user_list WHERE user =?', [_password, _user])
            if (_result[0][0]['result'] != 1) {
              this.Clear()
              resolve({
                UserStatus:this.UserStatus,
                UserData:this.UserData
              } as User)
            }
            else {
              const _UserData = await SQLPool.execute('SELECT user,authority,name,card,state FROM user_list where user=?', [_user])
              this.UserStatus = 'Login'
              this.UserData = _UserData[0][0] as unknown as UserData
              resolve({
                UserStatus:this.UserStatus,
                UserData:this.UserData
              } as User )
            }
          } else if (_card != '' && _card != '-1') {
            const _UserData = await SQLPool.execute('SELECT user,authority,name,card,state FROM user_list where card=?', [_card])
            if (_UserData[0].length != 0) {
              this.UserStatus = 'Login'
              this.UserData = _UserData[0][0] as unknown as UserData
              resolve({
                UserStatus:this.UserStatus,
                UserData:this.UserData
              } as User)
            } else {
              this.Clear()
              resolve({
                UserStatus:this.UserStatus,
                UserData:this.UserData
              } as User)
            }
          } else {
            this.Clear()
            resolve({
              UserStatus:this.UserStatus,
              UserData:this.UserData
            } as User)
          }
          if (this.UserStatus == 'Login') {
            const _UserSources = await SQLPool.execute(UserDataStoreSQL as string, ['none', 'none', 'none', (_card != '-1' && _card != '') ? _card : this.UserData.card]) as unknown as UserSource[]
            const UserSources = _UserSources[0] as unknown as UserSource[]

            this.UserPass = { CupBoard: [], Sources: [] }

            this.UserOut = { CupBoard: [], Sources: [] }
            if (UserSources.length != 0) {
              UserSources.forEach((_UserSources) => {
                if (_UserSources.SourceStatus == 'PROCESS-PASS') {

                  this.UserPass.CupBoard.push(_UserSources.cupbox_id)

                  this.UserPass.Sources.push(_UserSources as unknown as UserDataSourcesSource)
                } else {

                  this.UserOut.CupBoard.push(_UserSources.cupbox_id)

                  this.UserOut.Sources.push(_UserSources as unknown as UserDataSourcesSource)
                }
              })
            }
          } else {
            this.Clear()
          }
        } catch (error) {
          console.error(error)
          this.Clear()
          resolve({
            UserStatus:this.UserStatus,
            UserData:this.UserData
          } as User)
        }
      })
    },
    async RefreshApply() {
      await SQLPool.query(AddApplyStore)
      const _apply_id = await SQLPool.execute('SELECT apply_id  FROM `apply_list` WHERE user = \'tmp\'', [])
      this.apply_id = _apply_id[0][0]['apply_id']
    },
    async AddApply() {

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
    async RefreshRegister() {
      await SQLPool.query(AddUserStore)
    },
    async RefreshUser(user: string) {
      const _result = await SQLPool.execute('SELECT IF(COUNT(*) > 0, TRUE, FALSE) AS result FROM `user_list` WHERE user = ?', [user])
      this.UserRegister.UserResult = _result[0][0]['result'] == 1
    },
    async RefreshCard(card: string) {
      const _result = await SQLPool.execute('SELECT IF(COUNT(*) > 0, TRUE, FALSE) AS result FROM `user_list` WHERE card = ?', [card])
      this.UserRegister.CardResult = _result[0][0]['result'] == 1
    },
    async AddUser(user: string, name: string, password: string, authority: 'root' | 'normal' | 'guest', card: string) {
      const result = await SQLPool.execute('update user_list set user = ?, name = ?, password = ?, authority = ?, card = ?,state=? where name = ?',
        [
          user,
          name,
          password,
          authority,
          card,
          'normal',
          'tmp'
        ])

      this.UserRegister.Result = result[0]['changedRows']
    },
    ConsoleUserData() {
      console.log(this.UserData)
    },
    Clear() {
      this.UserData = EmptyUserData
      this.UserPass = { CupBoard: [], Sources: [] }
      this.UserOut = { CupBoard: [], Sources: [] }
      this.UserStatus = 'Logout'
    }
  }
})
