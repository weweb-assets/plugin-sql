<template>
    <div class="ww-popup-sql-api">
        <label class="sql-api__label caption-s" for="user-sql">
            User
            <div class="sql-api__label-required">required</div>
        </label>
        <input
            type="text"
            name="user-sql"
            class="sql-api__input caption-m ww-editor-input -large"
            placeholder="admin"
            v-model="api.config.user"
            autofocus
        />
        <label class="sql-api__label caption-s" for="password-sql">
            Password
            <div class="sql-api__label-required">required</div>
        </label>
        <input
            type="password"
            name="password-sql"
            class="sql-api__input caption-m ww-editor-input -large"
            placeholder="********"
            v-model="api.config.password"
        />
        <label class="sql-api__label caption-s" for="server-sql">
            Server
            <div class="sql-api__label-required">required</div>
        </label>
        <input
            type="text"
            name="server-sql"
            class="sql-api__input caption-m ww-editor-input -large"
            placeholder="https://server-url.com"
            v-model="api.config.server"
        />
        <label class="sql-api__label caption-s" for="database-sql">
            Database
            <div class="sql-api__label-required">required</div>
        </label>
        <input
            type="text"
            name="database-sql"
            class="sql-api__input caption-m ww-editor-input -large"
            placeholder="SchoolDB"
            v-model="api.config.database"
        />
        <label class="sql-api__label caption-s" for="query-sql">
            Query
            <div class="sql-api__label-required">required</div>
        </label>
        <input
            type="text"
            name="query-sql"
            class="sql-api__input caption-m ww-editor-input -large"
            placeholder="select * from Student"
            v-model="api.config.query"
        />
        <label class="sql-api__label caption-s" for="name-sql">
            Name
            <div class="sql-api__label-required">required</div>
        </label>
        <input
            type="text"
            name="name-sql"
            class="sql-api__input caption-m ww-editor-input -large"
            placeholder="Name"
            v-model="api.name"
        />
        <label class="sql-api__label caption-s" for="display-by-sql">
            Display by
            <div class="sql-api__label-required">optional</div>
        </label>
        <input
            type="text"
            name="display-by-sql"
            class="sql-api__input caption-m ww-editor-input -large"
            placeholder="name"
            v-model="api.displayBy"
        />
    </div>
</template>

<script>
export default {
    name: 'ApiPopup',
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
            api: {
                id: wwLib.wwUtils.getUid(),
                config: {
                    user: undefined,
                    password: undefined,
                    server: undefined,
                    database: undefined,
                },
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
    },
    computed: {
        isSetup() {
            return (
                !!this.api.config &&
                !!this.api.config.user &&
                !!this.api.config.user.length &&
                !!this.api.config.password &&
                !!this.api.config.password.length &&
                !!this.api.config.server &&
                !!this.api.config.server.length &&
                !!this.api.config.database &&
                !!this.api.config.database.length &&
                !!this.api.config.query &&
                !!this.api.config.query.length &&
                !!this.api.name &&
                !!this.api.name.length
            );
        },
    },
    created() {
        this.api = this.options.data.api || this.api;
        this.options.result.api = this.api;
        this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
    },
};
</script>

<style scoped lang="scss">
.ww-popup-sql-api {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .sql-api {
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
