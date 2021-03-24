import settingsPopup from './settings.popup.vue';
import requestsPopup from './requests.popup.vue';
import requestPopup from './request.popup.vue';
import synchronizationPopup from './synchronization.popup.vue';
import webhooksPopup from './webhooks.popup.vue';

wwLib.wwPopups.addPopup('sqlSettingsPopup', settingsPopup);
wwLib.wwPopups.addPopup('sqlRequestsPopup', requestsPopup);
wwLib.wwPopups.addPopup('sqlRequestPopup', requestPopup);
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

wwLib.wwPopups.addStory('SQL_REQUESTS_POPUP', {
    title: {
        en: 'SQL - requests',
        fr: 'SQL - requests',
    },
    type: 'sqlRequestsPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Save requests',
                fr: 'Enregistrer les requests',
            },
            next: 'SQL_SYNCHRONIZATION_POPUP',
        },
    },
});

wwLib.wwPopups.addStory('SQL_ADD_REQUEST_POPUP', {
    title: {
        en: 'SQL - Add request',
        fr: 'SQL - Ajouter une requete',
    },
    type: 'sqlRequestPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Add request',
                fr: 'Ajouter une requete',
            },
        },
    },
});

wwLib.wwPopups.addStory('SQL_EDIT_REQUEST_POPUP', {
    title: {
        en: 'SQL - Edit request',
        fr: 'SQL - Editer la requete',
    },
    type: 'sqlRequestPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Edit request',
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
