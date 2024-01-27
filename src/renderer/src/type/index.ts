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
  SourceStatus: string,
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
  authority:string,
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

export declare interface UserApply{
  SSID:string,
  user:string,
  first_time:string,
  last_time:string,
  process_time:string,
  back_time:string,
  reason:string,
  apply_status:'process'|'process-pass'|'process-forbid',
  event_status:'wait'| 'out'| 'normal',
  user_status:'overdue'| 'normal',
}
