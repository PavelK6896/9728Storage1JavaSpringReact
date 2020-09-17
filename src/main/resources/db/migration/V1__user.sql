drop table if exists users;
create table users
(
    id       bigserial,
    password VARCHAR(80) not null,
    email    VARCHAR(50) not null UNIQUE,
    username VARCHAR(50) not null UNIQUE,
    PRIMARY KEY (id)
);


insert into users (password, email, username)
values ('$2y$12$6ZsHZWHxdMbC8OVCdoZSoOH6PES3wAOAB6NXqJhkV/lTlTh570i3W', 'admin@gmail.com', '1'),
       ('$2y$12$6ZsHZWHxdMbC8OVCdoZSoOH6PES3wAOAB6NXqJhkV/lTlTh570i3W', 'user@gmail.com', '2');

drop table if exists roles;
create table roles
(
    id   serial,
    name VARCHAR(50) not null,
    primary key (id)
);

insert into roles (name)
values ('ROLE_ADMIN'),
       ('ROLE_USER');

drop table if exists users_roles;
create table users_roles
(
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    primary key (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (role_id) REFERENCES roles (id)
);

insert into users_roles (user_id, role_id)
values (1, 1),
       (1, 2),
       (2, 2);
