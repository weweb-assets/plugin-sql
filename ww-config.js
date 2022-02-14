export default {
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
    functions: [
        {
            name: 'SQL Request',
            code: 'sqlRequest',
            parameters: [
                { name: 'connection', type: 'string' },
                { name: 'query', type: 'string' },
            ],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/SQLRequest.vue'),
            getIsValid([connection, query]) {
                return !!connection && !!query;
            },
            /* wwEditor:end */
        },
    ],
};
