create table members
(
    no integer,
    username varchar(50),
    email varchar(320),
    password varchar(255),
    createdat varchar(32),
    updatedat varchar(32)
);

alter table members
    add constraint member_pk primary key (no);

alter table members
    add constraint username_uq unique (username);

create sequence member_no
    start with 1
    increment by 1;

alter table members alter column no set default nextval('member_no');
