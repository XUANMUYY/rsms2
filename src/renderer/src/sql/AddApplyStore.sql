DELETE
FROM apply_list
WHERE user = 'tmp';
alter table apply_list
    auto_increment = 1;
INSERT INTO apply_list (SSID, user, first_time, last_time, reason, apply_status, user_status,item_status)
VALUES (0, 'tmp', '1000-01-01 00:00:00', '1000-01-01 00:00:00', 'tmp', 'process-forbid', 'normal','run');