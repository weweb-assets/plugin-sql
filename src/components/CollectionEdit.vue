<template>
    <div class="sql-collection-edit">
        <wwEditorFormRow label="Client" required>
            <wwEditorInputTextSelect
                :options="clientOptions"
                :model-value="query.client"
                large
                @update:modelValue="setProp('client', $event)"
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="Host" required>
            <wwEditorInputText
                type="text"
                name="host"
                :model-value="query.host"
                placeholder="host.com"
                large
                @update:modelValue="setProp('host', $event)"
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="Port" required>
            <wwEditorInputText
                type="number"
                name="port"
                :model-value="query.port"
                placeholder="5432"
                large
                @update:modelValue="setProp('port', $event)"
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="Database" required>
            <wwEditorInputText
                type="text"
                name="database"
                :model-value="query.database"
                placeholder="SchoolDB"
                large
                @update:modelValue="setProp('database', $event)"
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="User" required>
            <wwEditorInputText
                type="text"
                name="user"
                :model-value="query.user"
                placeholder="admin"
                large
                @update:modelValue="setProp('user', $event)"
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="Password" required>
            <wwEditorInputText
                type="password"
                name="password"
                :model-value="query.password"
                placeholder="********"
                large
                @update:modelValue="setProp('password', $event)"
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="Query" required>
            <wwEditorInputCode
                name="query"
                :model-value="query.query"
                large
                language="sql"
                @update:modelValue="setProp('query', $event)"
            />
        </wwEditorFormRow>
    </div>
</template>

<script>
export default {
    props: {
        config: { type: Object, required: true },
    },
    emits: ['update:config'],
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
    computed: {
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
    watch: {
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
    methods: {
        setProp(key, value) {
            this.$emit('update:config', { ...this.query, [key]: value });
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
