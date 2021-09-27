export default {
    editor: {
        collection: {
            edit: () => import('./src/components/CollectionEdit.vue'),
            summary: () => import('./src/components/CollectionSummary.vue'),
            getIsValid(config) {
                return (
                    !!config.host &&
                    !!config.port &&
                    !!config.user &&
                    !!config.password &&
                    !!config.database &&
                    !!config.query
                );
            },
        },
    },
};
