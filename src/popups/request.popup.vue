<template>
    <div class="ww-popup-sql-request">
        <label class="sql-request__label caption-s" for="client-sql">
            Client
            <div class="sql-request__label-required">required</div>
        </label>
        <wwEditorSelect
            type="text"
            name="client-sql"
            class="sql-request__input caption-m ww-editor-input -large"
            :options="clientOptions"
            v-model="request.client"
        />
        <label class="sql-request__label caption-s" for="name-sql">
            Name
            <div class="sql-request__label-required">required</div>
        </label>
        <input
            type="text"
            name="name-sql"
            class="sql-request__input caption-m ww-editor-input -large"
            placeholder="Name"
            v-model="request.name"
        />
        <label class="sql-request__label caption-s" for="host-sql">
            Host
            <div class="sql-request__label-required">required</div>
        </label>
        <input
            type="text"
            name="host-sql"
            class="sql-request__input caption-m ww-editor-input -large"
            placeholder="host.com"
            v-model="request.host"
        />
        <label class="sql-request__label caption-s" for="port-sql">
            Port
            <div class="sql-request__label-required">required</div>
        </label>
        <input
            type="number"
            name="port-sql"
            class="sql-request__input caption-m ww-editor-input -large"
            placeholder="5432"
            v-model="request.port"
        />
        <label class="sql-request__label caption-s" for="database-sql">
            Database
            <div class="sql-request__label-required">required</div>
        </label>
        <input
            type="text"
            name="database-sql"
            class="sql-request__input caption-m ww-editor-input -large"
            placeholder="SchoolDB"
            v-model="request.database"
        />
        <label class="sql-request__label caption-s" for="user-sql">
            User
            <div class="sql-request__label-required">required</div>
        </label>
        <input
            type="text"
            name="user-sql"
            class="sql-request__input caption-m ww-editor-input -large"
            placeholder="admin"
            v-model="request.user"
        />
        <label class="sql-request__label caption-s" for="password-sql">
            Password
            <div class="sql-request__label-required">required</div>
        </label>
        <input
            type="password"
            name="password-sql"
            class="sql-request__input caption-m ww-editor-input -large"
            placeholder="********"
            v-model="request.password"
        />
        <label class="sql-request__label caption-s" for="query-sql">
            Query
            <div class="sql-request__label-required">required</div>
        </label>
        <input
            type="text"
            name="query-sql"
            class="sql-request__input caption-m ww-editor-input -large"
            placeholder="select * from Student"
            v-model="request.query"
        />
        <label class="sql-request__label caption-s" for="display-by-sql">
            Display by
            <div class="sql-request__label-required">optional</div>
        </label>
        <input
            type="text"
            name="display-by-sql"
            class="sql-request__input caption-m ww-editor-input -large"
            placeholder="id"
            v-model="request.displayBy"
        />
    </div>
</template>

<script>
export default {
    name: 'requestPopup',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            clientOptions: [
                { label: 'PostgreSQL', value: 'pg' },
                { label: 'MSSQL', value: 'mssql' },
                { label: 'MySQL', value: 'mysql' },
                { label: 'MariaDB', value: 'mysql-mariadb' },
                { label: 'Oracle', value: 'oracledb' },
                { label: 'Amazon Redshift', value: 'pg-redshift' },
            ],
            request: {
                id: wwLib.wwUtils.getUid(),
                client: 'pg',
                host: undefined,
                port: undefined,
                user: undefined,
                password: undefined,
                database: undefined,
                query: undefined,
                name: undefined,
                displayBy: undefined,
            },
        };
    },
    watch: {
        isSetup() {
            this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
        },
        'request.client': {
            immediate: true,
            handler() {
                switch (this.request.client) {
                    case 'pg':
                        return (this.request.port = 5432);
                    case 'pg-redshift':
                        return (this.request.port = 5439);
                    case 'mssql':
                        return (this.request.port = 1433);
                    case 'mysql':
                    case 'mysql-mariadb':
                        return (this.request.port = 3306);
                    case 'oracledb':
                        return (this.request.port = 1521);
                }
            },
        },
    },
    computed: {
        isSetup() {
            return (
                !!this.request.host &&
                !!this.request.host.length &&
                !!this.request.port &&
                !!this.request.port.length &&
                !!this.request.user &&
                !!this.request.user.length &&
                !!this.request.password &&
                !!this.request.password.length &&
                !!this.request.database &&
                !!this.request.database.length &&
                !!this.request.query &&
                !!this.request.query.length &&
                !!this.request.name &&
                !!this.request.name.length
            );
        },
    },
    created() {
        this.request = this.options.data.request || this.request;
        this.options.result.request = this.request;
        this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
    },
};
</script>

<style scoped lang="scss">
.ww-popup-sql-request {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .sql-request {
        &__label {
            display: flex;
            align-items: center;
            font-weight: 500;
            color: var(--ww-color-dark-500);
            margin-bottom: var(--ww-spacing-01);
            &-required {
                margin-left: auto;
                color: var(--ww-color-dark-400);
            }
        }
        &__link {
            color: var(--ww-color-blue-500);
            margin-left: var(--ww-spacing-02);
        }
        &__input {
            margin-bottom: var(--ww-spacing-03);
        }
        &__select {
            min-width: 65px;
            margin-left: var(--ww-spacing-02);
        }
        &__row {
            display: flex;
            align-items: center;
            &.-space-between {
                justify-content: space-between;
            }
            &-item {
                display: flex;
                flex-direction: column;
                width: 100%;
                margin-right: var(--ww-spacing-02);
                &:last-child {
                    margin-right: 0;
                    margin-left: var(--ww-spacing-02);
                }
            }
        }
        &__button-delete {
            margin-right: var(--ww-spacing-03);
            cursor: pointer;
            transition: color 0.3s ease;
            &:hover {
                color: var(--ww-color-red-500);
            }
        }
    }
    .m-auto-left {
        margin-left: auto;
    }
}
</style>
