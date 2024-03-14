select cl.cupbox_id,
       cl.SSID,
       sl.*,
       al.*
from cupboard_list cl
         join sources_list sl on sl.SSID = cl.SSID
         join apply_list al on al.SSID = cl.SSID
where cl.cupbox_id = ? and al.item_status = 'run' and (al.event_status = 'wait' or al.event_status = 'out')