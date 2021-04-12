<template>
    <div class="ww-popup-sql-query">
        <label class="sql-query__label caption-s" for="client-sql">
            Client
            <div class="sql-query__label-required">required</div>
        </label>
        <wwEditorSelect
            type="text"
            name="client-sql"
            class="sql-query__input caption-m ww-editor-input -large"
            :options="clientOptions"
            v-model="query.client"
        />
        <label class="sql-query__label caption-s" for="name-sql">
            Name
            <div class="sql-query__label-required">required</div>
        </label>
        <input
            type="text"
            name="name-sql"
            class="sql-query__input caption-m ww-editor-input -large"
            placeholder="Name"
            v-model="query.name"
        />
        <label class="sql-query__label caption-s" for="host-sql">
            Host
            <div class="sql-query__label-required">required</div>
        </label>
        <input
            type="text"
            name="host-sql"
            class="sql-query__input caption-m ww-editor-input -large"
            placeholder="host.com"
            v-model="query.host"
        />
        <label class="sql-query__label caption-s" for="port-sql">
            Port
            <div class="sql-query__label-required">required</div>
        </label>
        <input
            type="number"
            name="port-sql"
            class="sql-query__input caption-m ww-editor-input -large"
            placeholder="5432"
            v-model="query.port"
        />
        <label class="sql-query__label caption-s" for="database-sql">
            Database
            <div class="sql-query__label-required">required</div>
        </label>
        <input
            type="text"
            name="database-sql"
            class="sql-query__input caption-m ww-editor-input -large"
            placeholder="SchoolDB"
            v-model="query.database"
        />
        <label class="sql-query__label caption-s" for="user-sql">
            User
            <div class="sql-query__label-required">required</div>
        </label>
        <input
            type="text"
            name="user-sql"
            class="sql-query__input caption-m ww-editor-input -large"
            placeholder="admin"
            v-model="query.user"
        />
        <label class="sql-query__label caption-s" for="password-sql">
            Password
            <div class="sql-query__label-required">required</div>
        </label>
        <input
            type="password"
            name="password-sql"
            class="sql-query__input caption-m ww-editor-input -large"
            placeholder="********"
            v-model="query.password"
        />
        <label class="sql-query__label caption-s" for="query-sql">
            Query
            <div class="sql-query__label-required">required</div>
        </label>
        <textarea
            name="query-sql"
            class="sql-query__input caption-m ww-editor-input -textarea -large"
            placeholder="select * from Student"
            v-model="query.query"
            rows="5"
        />
        <label class="sql-query__label caption-s" for="display-by-sql">
            Display by
            <div class="sql-query__label-required">optional</div>
        </label>
        <input
            type="text"
            name="display-by-sql"
            class="sql-query__input caption-m ww-editor-input -large"
            placeholder="id"
            v-model="query.displayBy"
        />
    </div>
</template>

<script>
export default {
    name: 'queryPopup',
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
            query: {
                id: wwLib.wwUtils.getUid(),
                client: undefined,
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
        isSetup: {
            immediate: true,
            handler() {
                this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
            },
        },
        'query.client'() {
            switch (this.query.client) {
                case 'pg':
                    this.query.port = '5432';
                    break;
                case 'pg-redshift':
                    this.query.port = '5439';
                    break;
                case 'mssql':
                    this.query.port = '1433';
                    break;
                case 'mysql':
                case 'mysql-mariadb':
                    this.query.port = '3306';
                    break;
                case 'oracledb':
                    this.query.port = '1521';
                    break;
            }
        },
    },
    computed: {
        isSetup() {
            return (
                !!this.query.host &&
                !!this.query.host.length &&
                !!this.query.port &&
                !!this.query.port.length &&
                !!this.query.user &&
                !!this.query.user.length &&
                !!this.query.password &&
                !!this.query.password.length &&
                !!this.query.database &&
                !!this.query.database.length &&
                !!this.query.query &&
                !!this.query.query.length &&
                !!this.query.name &&
                !!this.query.name.length
            );
        },
    },
    created() {
        this.query = this.options.data.query || this.query;
        if (!this.query.client) this.query.client = 'pg';
        this.options.result.query = this.query;
        this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
    },
};
</script>

<style scoped lang="scss">
.ww-popup-sql-query {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .sql-query {
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
