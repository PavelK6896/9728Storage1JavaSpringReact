
create table clients
(
    id    bigserial,
    phone VARCHAR(30)  not null UNIQUE,
    name  VARCHAR(250),
    title VARCHAR(250) not null,
    PRIMARY KEY (id)
);


insert into clients (phone, name, title)
values ('71', 'Vasia', 'ooo 1'),
       ('72', 'Valentin', 'ooo 2'),
       ('73', 'Vova', 'ooo 3'),
       ('74', 'Vika', 'ooo 4');




