select user_list.user,
       user_list.authority,
       user_list.name,
       user_list.card,
       al.SSID,
       sl.nuclide,
       sl.nuclide_id,
       sl.nuclide_name,
       sl.nuclide_quality,
       sl.status,
       cl.cupbox_id,
       cl.device_id,
       dl.wiz_ip,
       dl.wiz_port,
       dl.device_index,
       dl.device_number
from `user_list`
         join apply_list al on user_list.user = al.user
         join sources_list sl on al.SSID = sl.SSID
         join cupboard_list cl on sl.SSID = cl.SSID
         join device_list dl on cl.device_id = dl.device_id
where (user_list.user = ? or user_list.authority = ? or user_list.name = ? or user_list.card = ?)
  and (al.apply_status = 'process-pass')
  and (al.event_status = 'wait' or al.event_status = 'out')