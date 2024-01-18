create database if not exists sources_system;
USE sources_system;

create table if not exists sources_list
(
    SSID            int auto_increment                                        not null
        primary key,
    nuclide         tinytext                                                  not null,
    nuclide_id      int                                                       not null,
    nuclide_name    tinytext                                                  not null,
    nuclide_index   tinyint                                                   null,
    nuclide_quality int                                                       not null,
    nuclide_rate    text                                                      not null,
    nuclide_type    text                                                      not null,
    nuclide_energy  json                                                      null,
    status          enum ('READY', 'OUT', 'ALARM', 'PROCESS', 'PROCESS-PASS') not null
);

create table if not exists user_list
(
    user      varchar(16)                      not null
        primary key,
    password  varchar(18)                      null,
    authority enum ('root', 'normal', 'guest') not null,
    name      text                             null,
    card      varchar(16)                      null
);

create table if not exists cupboard_list
(
    cupbox_id varchar(8) not null
        primary key,
    SSID      int        null,
    device_id int        null
);

create table if not exists apply_list
(
    apply_id     int auto_increment                                                   not null
        primary key,
    SSID         int                                                                  not null,
    user         varchar(16)                                                          not null,
    first_time   datetime                                                             not null,
    last_time    datetime                                                             not null,
    process_time datetime                                                             null,
    back_time    datetime                                                             null,
    reason       text                                                                 null,
    apply_status enum ('process', 'process-pass', 'process-forbid') not null,
    event_status enum ('wait','out', 'normal')                                          null,
    user_status  enum ('overdue', 'normal')                                           not null
);

create table if not exists device_list
(
    device_id     int auto_increment not null
        primary key,
    device_index  int                not null,
    device_number int                not null,
    SSID          int                not null,
    wiz_ip        varchar(14)        not null,
    wiz_port      int                not null
);
