CREATE PROCEDURE if not exists fetch_data_from_dl_and_sl()
BEGIN
    -- 声明变量
    DECLARE dl_SSID_value INT;
    DECLARE dl_id_value INT;
    DECLARE dl_ip_value text;
    DECLARE done INT DEFAULT FALSE;

    -- 声明游标
    DECLARE dl_cursor CURSOR FOR
        SELECT device_id, SSID, wiz_ip FROM device_list;

    -- 声明异常处理
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- 打开游标
    OPEN dl_cursor;

    -- 循环遍历dl表中的每一行
    dl_loop:
    LOOP
        FETCH dl_cursor INTO dl_id_value, dl_SSID_value,dl_ip_value;

        -- 如果没有更多行，则退出循环
        IF done or dl_ip_value = 'tmp' THEN
            LEAVE dl_loop;
        END IF;

        -- 如果SSID不为零
        IF dl_SSID_value != 0 THEN
            -- 从sl表中获取对应的数据并返回
            SELECT dl.*, sl.*, cl.*
            FROM device_list dl
                     JOIN cupboard_list cl ON cl.device_id = dl.device_id
                     JOIN sources_list sl ON dl.SSID = sl.SSID
            WHERE dl.device_id = dl_id_value;
        ELSE
            -- 如果SSID为零，则返回dl.*和一个额外生成的sl的行
            SELECT dl.*,
                   cl.*,
                   0      AS SSID,
                   0      AS nuclide,
                   0      AS nuclide_id,
                   0      AS nuclide_name,
                   0      AS nuclide_quality,
                   'NONE' AS SourceStatus
            FROM device_list dl
                     JOIN cupboard_list cl ON cl.device_id = dl.device_id
            WHERE dl.device_id = dl_id_value;
        END IF;
    END LOOP;

    -- 关闭游标
    CLOSE dl_cursor;
END;

-- 调用存储过程
CALL fetch_data_from_dl_and_sl();

-- 删除存储过程
DROP PROCEDURE fetch_data_from_dl_and_sl;
