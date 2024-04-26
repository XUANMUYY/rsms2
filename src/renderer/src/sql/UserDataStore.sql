select ul.user,
       ul.authority,
       ul.name,
       ul.card,
       al.SSID,
       al.apply_id,
       sl.nuclide,
       sl.nuclide_id,
       sl.nuclide_name,
       sl.nuclide_quality,
       sl.SourceStatus,
       cl.cupbox_id,
       cl.device_id,
       dl.wiz_ip,
       dl.wiz_port
from user_list ul
         join apply_list al on al.user = ul.user
         join sources_list sl on sl.SSID = al.SSID
         join device_list dl on dl.SSID = sl.SSID
         join cupboard_list cl on cl.device_id = dl.device_id
where (ul.user = ? or ul.authority = ? or ul.name = ? or ul.card = ?)
  and (al.apply_status = 'process-pass')
  and (al.event_status = 'wait' or al.event_status = 'out')