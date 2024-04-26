select al.apply_id,
       al.SSID,
       al.user,
       ul.name,
       al.reason,
       al.apply_status,
       al.event_status,
       al.user_status,
       DATE_FORMAT(al.first_time, '%Y-%m-%d %H:%i:%s')   AS first_time,
       DATE_FORMAT(al.last_time, '%Y-%m-%d %H:%i:%s')    AS last_time,
       DATE_FORMAT(al.process_time, '%Y-%m-%d %H:%i:%s') AS process_time,
       DATE_FORMAT(al.out_time, '%Y-%m-%d %H:%i:%s')     AS out_time,
       DATE_FORMAT(al.back_time, '%Y-%m-%d %H:%i:%s')    AS back_time
from apply_list al
         join user_list ul on ul.user = al.user
where al.SSID = ?
  and al.item_status = 'run'