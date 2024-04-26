DELETE FROM device_list WHERE wiz_ip = 'tmp';
alter table device_list auto_increment = 1;
INSERT INTO device_list (device_id, SSID, wiz_ip, wiz_port) VALUES (0, 0, 'tmp', 0);