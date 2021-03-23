import settingsPopup from './settings.popup.vue';
import apisPopup from './apis.popup.vue';
import apiPopup from './api.popup.vue';
import synchronizationPopup from './synchronization.popup.vue';
import webhooksPopup from './webhooks.popup.vue';

wwLib.wwPopups.addPopup('sqlSettingsPopup', settingsPopup);
wwLib.wwPopups.addPopup('sqlApisPopup', apisPopup);
wwLib.wwPopups.addPopup('sqlApiPopup', apiPopup);
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

wwLib.wwPopups.addStory('SQL_APIS_POPUP', {
    title: {
        en: 'SQL - APIs',
        fr: 'SQL - APIs',
    },
    type: 'sqlApisPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Save APIs',
                fr: 'Enregistrer les APIs',
            },
            next: 'SQL_SYNCHRONIZATION_POPUP',
        },
    },
});

wwLib.wwPopups.addStory('SQL_ADD_API_POPUP', {
    title: {
        en: 'SQL - Add API',
        fr: 'SQL - Ajouter une API',
    },
    type: 'sqlApiPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Add API',
                fr: 'Ajouter une API',
            },
        },
    },
});

wwLib.wwPopups.addStory('SQL_EDIT_API_POPUP', {
    title: {
        en: 'SQL - Edit API',
        fr: "SQL - Editer l'API",
    },
    type: 'sqlApiPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Edit API',
                fr: "Editer l'API",
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
