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
         join apply_list al on ul.user = al.user
         join sources_list sl on al.SSID = sl.SSID
         join cupboard_list cl on sl.SSID = cl.SSID
         join device_list dl on cl.device_id = dl.device_id
where (ul.user = ? or ul.authority = ? or ul.name = ? or ul.card = ?)
  and (al.apply_status = 'process-pass')
  and (al.event_status = 'wait' or al.event_status = 'out')