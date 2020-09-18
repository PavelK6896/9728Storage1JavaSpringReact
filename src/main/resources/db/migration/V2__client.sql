
create table clients
(
    id    bigserial,
    phone VARCHAR(30)  not null UNIQUE,
    name  VARCHAR(250),
    title VARCHAR(250) not null,
    PRIMARY KEY (id)
);


insert into clients (phone, name, title)
values ('7920887', 'Vasy', 'ooo company 12414'),
       ('7920889', 'Valentin', 'ooo company 342324'),
       ('7920889', 'Valentin', 'ooo eee 342324'),
       ('7920889', 'Valentin', 'ooo www 342324'),
       ('79208815', 'Viktor', 'ooo rr 342324'),
       ('79208815', 'Viktor', 'ww asd 342324'),
       ('79208815', 'Viktor', 'ee 3'),
       ('79208815', 'Vany', 'rr 3'),
       ('79208815', 'Vany', 'qq 3'),
       ('79208815', 'Vany', 'ssss 3'),
       ('79208815', 'Vova', 'hhh 3'),
       ('79208815', 'Vova', 'ddddd 3'),
       ('79208956', 'Vika', 'sssssss 4');




