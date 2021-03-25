import settingsPopup from './settings.popup.vue';
import queriesPopup from './queries.popup.vue';
import queryPopup from './query.popup.vue';
import synchronizationPopup from './synchronization.popup.vue';
import webhooksPopup from './webhooks.popup.vue';

wwLib.wwPopups.addPopup('sqlSettingsPopup', settingsPopup);
wwLib.wwPopups.addPopup('sqlQueriesPopup', queriesPopup);
wwLib.wwPopups.addPopup('sqlQueryPopup', queryPopup);
wwLib.wwPopups.addPopup('sqlSynchronizationPopup', synchronizationPopup);
wwLib.wwPopups.addPopup('sqlWebhooksPopup', webhooksPopup);

wwLib.wwPopups.addStory('SQL_POPUP', {
    title: {
        en: 'SQL',
        fr: 'SQL',
    },
    type: 'sqlSettingsPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
});

wwLib.wwPopups.addStory('SQL_QUERIES_POPUP', {
    title: {
        en: 'SQL - Queries',
        fr: 'SQL - Queries',
    },
    type: 'sqlQueriesPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Save queries',
                fr: 'Enregistrer les queries',
            },
            next: 'SQL_SYNCHRONIZATION_POPUP',
        },
    },
});

wwLib.wwPopups.addStory('SQL_ADD_QUERY_POPUP', {
    title: {
        en: 'SQL - Add query',
        fr: 'SQL - Ajouter une requete',
    },
    type: 'sqlQueryPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Add query',
                fr: 'Ajouter une requete',
            },
        },
    },
});

wwLib.wwPopups.addStory('SQL_EDIT_QUERY_POPUP', {
    title: {
        en: 'SQL - Edit query',
        fr: 'SQL - Editer la requete',
    },
    type: 'sqlQueryPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Edit query',
                fr: 'Editer la requete',
            },
        },
    },
});

wwLib.wwPopups.addStory('SQL_WEBHOOKS_POPUP', {
    title: {
        en: 'SQL - Webhooks',
        fr: 'SQL - Webhooks',
    },
    type: 'sqlWebhooksPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        DONE: {
            text: {
                en: 'Done',
                fr: 'Done',
            },
        },
    },
});

wwLib.wwPopups.addStory('SQL_SYNCHRONIZATION_POPUP', {
    title: {
        en: 'SQL - Synchronization',
        fr: 'SQL - Synchronization',
    },
    type: 'sqlSynchronizationPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        DONE: {
            text: {
                en: 'Done',
                fr: 'Done',
            },
        },
    },
});
