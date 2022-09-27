'use strict';

module.exports = [
{
    name: "cliente",
    table: "cliente",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "nombre",
            type: "varchar(50)",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "apellido",
            type: "varchar(50)",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "oficina_id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        }
    ],
    PK: "id",
    FKs: [
        {
            table: "oficina",
            field: "oficina_id"
        }
    ]
},
{
    name: "inmueble",
    table: "inmueble",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "nombre",
            type: "varchar(100)",
            accept_null: false,
            validate: ["NOT_NULL"]
        }
    ],
    PK: "id",
    FKs: [

    ]
},
{
    name: "oficina",
    table: "oficina",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "inmueble_id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "nombre",
            type: "varchar(50)",
            accept_null: false,
            validate: ["NOT_NULL"]
        }
    ],
    PK: "id",
    FKs: [
        {
            table: "inmueble",
            field: "inmueble_id"
        }
    ]
},
{
    name: "access",
    table: "sys_access",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "activation_status",
            type: "int",
            accept_null: true,
            validate: []
        },
        {
            name: "activation_code",
            type: "varchar(45)",
            accept_null: true,
            validate: []
        },
        {
            name: "forgotten_password_code",
            type: "varchar(45)",
            accept_null: true,
            validate: []
        },
        {
            name: "expiration",
            type: "datetime",
            accept_null: true,
            validate: []
        },
        {
            name: "sys_user_id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        }
    ],
    PK: "id",
    FKs: [
        {
            table: "sys_user",
            field: "sys_user_id"
        }
    ]
},
{
    name: "email",
    table: "sys_email",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "email_to",
            type: "varchar(100)",
            accept_null: true,
            validate: []
        },
        {
            name: "cc",
            type: "varchar(500)",
            accept_null: true,
            validate: []
        },
        {
            name: "subject",
            type: "varchar(50)",
            accept_null: true,
            validate: []
        },
        {
            name: "body",
            type: "longtext",
            accept_null: true,
            validate: []
        },
        {
            name: "schedule",
            type: "varchar(1)",
            accept_null: true,
            validate: []
        },
        {
            name: "mailing_date",
            type: "datetime",
            accept_null: true,
            validate: []
        },
        {
            name: "sent",
            type: "varchar(1)",
            accept_null: true,
            validate: []
        },
        {
            name: "sys_email_config_id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        }
    ],
    PK: "id",
    FKs: [
        {
            table: "sys_email_config",
            field: "sys_email_config_id"
        }
    ]
},
{
    name: "email-config",
    table: "sys_email_config",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "name",
            type: "varchar(45)",
            accept_null: true,
            validate: []
        },
        {
            name: "email_from",
            type: "varchar(100)",
            accept_null: true,
            validate: []
        },
        {
            name: "password",
            type: "varchar(100)",
            accept_null: true,
            validate: []
        },
        {
            name: "smtp",
            type: "varchar(200)",
            accept_null: true,
            validate: []
        },
        {
            name: "port",
            type: "int",
            accept_null: true,
            validate: []
        },
        {
            name: "username",
            type: "varchar(50)",
            accept_null: true,
            validate: []
        }
    ],
    PK: "id",
    FKs: [

    ]
},
{
    name: "error",
    table: "sys_error",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "date_time",
            type: "datetime",
            accept_null: true,
            validate: []
        },
        {
            name: "ip_address",
            type: "varchar(100)",
            accept_null: true,
            validate: []
        },
        {
            name: "url",
            type: "varchar(500)",
            accept_null: true,
            validate: []
        },
        {
            name: "sys_session_id",
            type: "int",
            accept_null: true,
            validate: []
        },
        {
            name: "sys_error_code_id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        }
    ],
    PK: "id",
    FKs: [
        {
            table: "sys_session",
            field: "sys_session_id"
        },
        {
            table: "sys_error_code",
            field: "sys_error_code_id"
        }
    ]
},
{
    name: "error-code",
    table: "sys_error_code",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "description",
            type: "varchar(500)",
            accept_null: true,
            validate: []
        }
    ],
    PK: "id",
    FKs: [

    ]
},
{
    name: "fcm",
    table: "sys_fcm",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "platform",
            type: "varchar(45)",
            accept_null: true,
            validate: []
        },
        {
            name: "token",
            type: "varchar(5000)",
            accept_null: true,
            validate: []
        },
        {
            name: "sys_session_id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        }
    ],
    PK: "id",
    FKs: [
        {
            table: "sys_session",
            field: "sys_session_id"
        }
    ]
},
{
    name: "group",
    table: "sys_group",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "name",
            type: "varchar(20)",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "description",
            type: "varchar(100)",
            accept_null: false,
            validate: ["NOT_NULL"]
        }
    ],
    PK: "id",
    FKs: [

    ]
},
{
    name: "group-permission",
    table: "sys_group_permission",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "deny",
            type: "varchar(1)",
            accept_null: true,
            validate: []
        },
        {
            name: "sys_group_id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "sys_permission_id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        }
    ],
    PK: "id",
    FKs: [
        {
            table: "sys_group",
            field: "sys_group_id"
        },
        {
            table: "sys_permission",
            field: "sys_permission_id"
        }
    ]
},
{
    name: "login-attempt",
    table: "sys_login_attempt",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "ip_address",
            type: "varchar(15)",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "date_time",
            type: "datetime",
            accept_null: true,
            validate: []
        },
        {
            name: "sys_user_id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        }
    ],
    PK: "id",
    FKs: [
        {
            table: "sys_user",
            field: "sys_user_id"
        }
    ]
},
{
    name: "picture",
    table: "sys_picture",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "pic",
            type: "text",
            accept_null: true,
            validate: []
        },
        {
            name: "sys_user_id",
            type: "int",
            accept_null: true,
            validate: []
        }
    ],
    PK: "id",
    FKs: [
        {
            table: "sys_user",
            field: "sys_user_id"
        }
    ]
},
{
    name: "session",
    table: "sys_session",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "ip_address",
            type: "varchar(50)",
            accept_null: true,
            validate: []
        },
        {
            name: "dt_start",
            type: "datetime",
            accept_null: true,
            validate: []
        },
        {
            name: "dt_finished",
            type: "datetime",
            accept_null: true,
            validate: []
        },
        {
            name: "user_agent",
            type: "varchar(255)",
            accept_null: true,
            validate: []
        },
        {
            name: "status",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "sys_user_id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        }
    ],
    PK: "id",
    FKs: [
        {
            table: "sys_user",
            field: "sys_user_id"
        }
    ]
},
{
    name: "user",
    table: "sys_user",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "email",
            type: "varchar(100)",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "password",
            type: "varchar(255)",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "first_name",
            type: "varchar(45)",
            accept_null: true,
            validate: []
        },
        {
            name: "last_name",
            type: "varchar(45)",
            accept_null: true,
            validate: []
        },
        {
            name: "dni",
            type: "int",
            accept_null: true,
            validate: []
        },
        {
            name: "phone",
            type: "varchar(15)",
            accept_null: true,
            validate: []
        },
        {
            name: "security_code",
            type: "varchar(5)",
            accept_null: true,
            validate: []
        },
        {
            name: "created_on",
            type: "datetime",
            accept_null: true,
            validate: []
        },
        {
            name: "active",
            type: "int",
            accept_null: true,
            validate: []
        },
        {
            name: "is_admin",
            type: "int",
            accept_null: true,
            validate: []
        }
    ],
    PK: "id",
    FKs: [

    ]
},
{
    name: "user-group",
    table: "sys_user_group",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "sys_user_id",
            type: "int",
            accept_null: true,
            validate: []
        },
        {
            name: "sys_group_id",
            type: "int",
            accept_null: true,
            validate: []
        }
    ],
    PK: "id",
    FKs: [
        {
            table: "sys_user",
            field: "sys_user_id"
        },
        {
            table: "sys_group",
            field: "sys_group_id"
        }
    ]
},
{
    name: "tarea",
    table: "tarea",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "sys_user_id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "oficina_id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "tipo_tarea_id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "cliente_id",
            type: "int",
            accept_null: true,
            validate: []
        },
        {
            name: "comentario",
            type: "varchar(100)",
            accept_null: true,
            validate: []
        },
        {
            name: "observacion",
            type: "varchar(100)",
            accept_null: true,
            validate: []
        },
        {
            name: "created_at",
            type: "datetime",
            accept_null: true,
            validate: []
        }
    ],
    PK: "id",
    FKs: [
        {
            table: "sys_user",
            field: "sys_user_id"
        },
        {
            table: "oficina",
            field: "oficina_id"
        },
        {
            table: "tipo_tarea",
            field: "tipo_tarea_id"
        },
        {
            table: "cliente",
            field: "cliente_id"
        }
    ]
},
{
    name: "tipo-tarea",
    table: "tipo_tarea",
    enableRoute: true,
    freeAccess: false,
    fields: [
        {
            name: "id",
            type: "int",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "nombre",
            type: "varchar(100)",
            accept_null: false,
            validate: ["NOT_NULL"]
        },
        {
            name: "descripcion",
            type: "varchar(200)",
            accept_null: false,
            validate: ["NOT_NULL"]
        }
    ],
    PK: "id",
    FKs: [

    ]
}
];