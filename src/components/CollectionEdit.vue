<template>
    <div class="sql-collection-edit">
        <wwEditorFormRow label="Client" required>
            <wwEditorSelect :options="clientOptions" :value="query.client" @input="setProp('client', $event)" large />
        </wwEditorFormRow>
        <wwEditorFormRow label="Host" required>
            <wwEditorFormInput
                type="text"
                name="host"
                :value="query.host"
                @input="setProp('host', $event)"
                placeholder="host.com"
                v-on:keyup.native.enter="$emit('next')"
                large
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="Port" required>
            <wwEditorFormInput
                type="number"
                name="port"
                :value="query.port"
                @input="setProp('port', $event)"
                placeholder="5432"
                v-on:keyup.native.enter="$emit('next')"
                large
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="Database" required>
            <wwEditorFormInput
                type="text"
                name="database"
                :value="query.database"
                @input="setProp('database', $event)"
                placeholder="SchoolDB"
                v-on:keyup.native.enter="$emit('next')"
                large
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="User" required>
            <wwEditorFormInput
                type="text"
                name="user"
                :value="query.user"
                @input="setProp('user', $event)"
                placeholder="admin"
                v-on:keyup.native.enter="$emit('next')"
                large
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="Password" required>
            <wwEditorFormInput
                type="password"
                name="password"
                :value="query.password"
                @input="setProp('password', $event)"
                placeholder="********"
                v-on:keyup.native.enter="$emit('next')"
                large
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="Query" required>
            <wwCodeEditor name="query" :value="query.query" @input="setProp('query', $event)" large language="sql" />
        </wwEditorFormRow>
    </div>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        config: { type: Object, required: true },
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
        };
    },
    watch: {
        isSetup: {
            immediate: true,
            handler(value) {
                this.$emit('update-is-valid', value);
            },
        },
        'query.client'() {
            switch (this.query.client) {
                case 'pg':
                    this.setProp('port', '5432');
                    break;
                case 'pg-redshift':
                    this.setProp('port', '5439');
                    break;
                case 'mssql':
                    this.setProp('port', '1433');
                    break;
                case 'mysql':
                case 'mysql-mariadb':
                    this.setProp('port', '3306');
                    break;
                case 'oracledb':
                    this.setProp('port', '1521');
                    break;
            }
        },
    },
    computed: {
        isSetup() {
            return (
                !!this.query.host &&
                !!this.query.port &&
                !!this.query.user &&
                !!this.query.password &&
                !!this.query.database &&
                !!this.query.query
            );
        },
        query() {
            return {
                client: 'pg',
                host: undefined,
                port: '5432',
                user: undefined,
                password: undefined,
                database: undefined,
                query: 'SELECT * FROM Student',
                ...this.config,
            };
        },
    },
    methods: {
        setProp(key, value) {
            this.$emit('update-config', { ...this.query, [key]: value });
        },
    },
};
</script>

<style scoped lang="scss">
.sql-collection-edit {
    display: flex;
    flex-direction: column;
}
</style>
