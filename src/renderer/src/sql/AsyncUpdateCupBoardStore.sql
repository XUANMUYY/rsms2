select cl.cupbox_id,
       dl.SSID,
       sl.*,
       al.*
from cupboard_list cl
         join device_list dl on dl.device_id = cl.device_id
         join sources_list sl on sl.SSID = dl.SSID
         join apply_list al on al.SSID = sl.SSID
where cl.cupbox_id = ?
  and al.item_status = 'run'
  and (al.event_status = 'wait' or al.event_status = 'out')