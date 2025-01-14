export default {
    features: {
        datasource: true,
    },
    editor: {
        settings: {
            edit: () => import('./src/components/SettingsEdit.vue'),
            summary: () => import('./src/components/SettingsSummary.vue'),
            getIsValid(settings) {
                const connections = settings.privateData.connections || [];
                return (
                    connections.length &&
                    !!connections.every(
                        connection =>
                            !!connection.host &&
                            !!connection.port &&
                            !!connection.user &&
                            !!connection.password &&
                            !!connection.database
                    )
                );
            },
        },
        collection: {
            edit: () => import('./src/components/CollectionEdit.vue'),
            summary: () => import('./src/components/CollectionSummary.vue'),
            getIsValid(config) {
                return !!config.connection && !!config.query;
            },
        },
    },
    actions: [
        {
            name: 'SQL Request',
            code: 'sqlRequest',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/SQLRequest.vue'),
            getIsValid({ connection, query }) {
                return !!connection && !!query;
            },
            copilot: {
                description: 'Execute a SQL query on the specified database connection',
                returns: 'array | object',
                schema: {
                    connection: {
                        type: 'string',
                        description: 'The ID of the database connection to use',
                        bindable: false
                    },
                    query: {
                        type: 'string',
                        description: 'The SQL query to execute',
                        bindable: true
                    }
                }
            },
            /* wwEditor:end */
        },
    ],
};