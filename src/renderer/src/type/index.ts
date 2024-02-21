import { PoolOptions } from 'mysql2'

export declare interface SourcesArray {
  nuclide_index: number,
  nuclide: string,
  nuclide_name: string,
  nuclide_quality: number,
  nuclide_rate: string,
  nuclide_type: string,
  nuclide_energy: number[][],
  SSID: string,
  SourceStatus: 'READY'| 'OUT'| 'ALARM'| 'PROCESS'| 'PROCESS-PASS',
}
export declare interface SourcesFilterArray {
  nuclide_index?: number,
  nuclide?: string,
  nuclide_name?: string,
  nuclide_quality?: number,
  nuclide_rate?: string,
  nuclide_type?: string,
  nuclide_energy?: number[][],
  SSID?: string,
  SourceStatus?: string,
}
export declare interface UserSource{
  user:string,
  authority:'root'| 'normal'| 'guest',
  name:string,
  card:string,
  SSID:string,
  cupbox_id:string,
  nuclide:string,
  nuclide_id:string,
  nuclide_name:string,
  nuclide_quality:string,
  wiz_ip:string,
  wiz_port:string,
  device_id:string,
  device_index:string,
  device_number:string,
  status:string,
}
export declare interface CupBoardArray{
  cupBoardIndex:string,
  cupBoxLeftArray:string[],
  cupBoxRightArray:string[]
}
export declare interface CupBoardCallback{
  Callback:string,
  OnLineCupBoard:string[]
}
export declare interface UserDataSources{
  CupBoard:string[],
  Sources:{
    SSID:string,
    cupbox_id:string,
    nuclide:string,
    nuclide_id:string,
    nuclide_name:string,
    nuclide_quality:string,
    tcp_ip:string,
    tcp_port:string,
    device_id:string,
    device_number:string,
    status:string,}[]
}

export declare interface SQLJson{
  INIT_SQL:PoolOptions,
  SQL:PoolOptions
}

export declare interface Source_List_Data{
  nuclide?: string,
  nuclide_id?: number,
  nuclide_name?: string,
  nuclide_index?: number,
  nuclide_quality?: number,
  nuclide_rate?: string,
  nuclide_type?: string,
  nuclide_energy?: number[][],
  Status?: 'READY'| 'OUT'| 'ALARM'|'PROCESS'| 'PROCESS-PASS',
}

export declare interface Device_List_Data{
  device_id?: string,
  device_index?: number,
  device_number?: number,
  SSID?: string,
  wiz_ip?: string,
  wiz_port?: number,
}

export declare interface Cupboard_List_Data{
  cupbox_id:string,
  SSID:string,
}

export declare interface UserApply{
  SSID:string,
  user:string,
  first_time?:string,
  last_time?:string,
  process_time?:string,
  back_time?:string,
  reason?:string,
  apply_status?:'process'|'process-pass'|'process-forbid',
  event_status?:'wait'| 'out'| 'normal',
  user_status?:'overdue'| 'normal',
}

export declare interface CountRate {
  CountRateStatus:boolean,
  TimeStamp: number;
  Count: number;
  Sample_Count_Total: number;
  CountRate: number;
}

export declare interface SocketInfo{
  Address:{hostname:string,port:number},
  ID:string,
  Result:string,
  ResultCMD:any
}

export declare interface ADCPulse{
  ADCPulseStatus:boolean,
  Index:number,
  Ch:number,
  Peak:number
}

export declare interface UserRegister{
  CardResult:boolean,
  UserResult:boolean,
  Card:string,
  User:string,
  name:string,
  password:string,
  authority:'root'|'normal'|'guest',
  Result:number
}

export declare interface ApplyArray{
  apply_id:string,
  SSID:string,
  user:string,
  name:string,
  reason:string,
  apply_status:'process'|'process-pass'|'process-forbid',
  event_status:'wait'| 'out'| 'normal',
  user_status:'overdue'| 'normal',
  first_time:string,
  last_time:string,
  process_time:string,
  out_time:string,
  back_time:string,
  nuclide?: string,
  nuclide_id?: number,
  nuclide_name?: string,
  nuclide_index?: number,
  nuclide_quality?: number,
  nuclide_rate?: string,
  nuclide_type?: string,
  nuclide_energy?: number[][],
  Status?: 'READY'| 'OUT'| 'ALARM'|'PROCESS'| 'PROCESS-PASS',
}

export declare interface CupBoxSource{
  cupbox_id:string,
  SSID:string,
  nuclide:string,
  nuclide_index: number,
  nuclide_name: string,
  nuclide_quality: number,
  nuclide_rate: string,
  nuclide_type: string,
  nuclide_energy: number[][],
  SourceStatus: 'READY'| 'OUT'| 'ALARM'| 'PROCESS'| 'PROCESS-PASS',
}
