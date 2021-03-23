/* wwEditor:start */
import './popups';
/* wwEditor:end */

export default {
    /* wwEditor:start */
    /*=============================================m_ÔÔ_m=============================================\
        Data
    \================================================================================================*/
    settings: {
        data: {},
        privateData: {
            APIs: [],
        },
    },
    /* wwEditor:end */
    /*=============================================m_ÔÔ_m=============================================\
        Init
    \================================================================================================*/
    async init() {
        /* wwEditor:start */
        const plugin = wwLib.wwPlugins.pluginSql;
        plugin.settings = (await wwLib.wwPlugin.getSettings(plugin.id)) || this.settings;
        if (!plugin.settings.privateData.APIs) plugin.settings.privateData.APIs = [];
        if (plugin.isNew && !plugin.settings.privateData.APIs.length) {
            this.sidebarButton();
        }
        /* wwEditor:end */
    },
    /* wwEditor:start */
    /*=============================================m_ÔÔ_m=============================================\
        SYNCHRONIZE
    \================================================================================================*/
    async sync(api) {
        try {
            await wwLib.wwPlugin.saveCmsDataSet(this.settings.id, api.id, api.name, api.displayBy, 'Sql');

            wwLib.wwNotification.open({
                text: {
                    en: `Api "${api.name}" succesfully fetched`,
                },
                color: 'green',
            });
        } catch (err) {
            wwLib.wwNotification.open({
                text: {
                    en: 'An error occured, please try again later.',
                    fr: 'Une erreur est survenue. Veuillez réessayer plus tard.',
                },
                color: 'red',
            });
            wwLib.wwLog.error(err);
        }
    },
    async syncAll() {
        for (const api of this.settings.privateData.APIs) await this.sync(api);
    },
    /*=============================================m_ÔÔ_m=============================================\
        SIDEBAR POPUP
    \================================================================================================*/
    async sidebarButton() {
        try {
            const { id, settings, isNew } = wwLib.wwPlugins.pluginSql;
            const isSetup = !isNew;
            const isFirstTime = !settings.privateData.APIs.length;
            await wwLib.wwPopups.open({
                firstPage: isSetup ? 'SQL_POPUP' : 'SQL_APIS_POPUP',
                data: {
                    isFirstTime,
                    pluginId: id,
                    settings,
                },
            });
        } catch (err) {
            wwLib.wwLog.error(err);
        }
        wwLib.wwPlugins.pluginSql.isNew = false;
    },

    /* wwEditor:end */
};
