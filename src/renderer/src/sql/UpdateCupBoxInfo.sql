select cl.cupbox_id, cl.device_id, dl.SSID
from cupboard_list cl
         join device_list dl on dl.device_id = cl.device_id
where cl.cupbox_id = ?