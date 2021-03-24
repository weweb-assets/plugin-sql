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
            requests: [],
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
        if (!plugin.settings.privateData.requests) this.$set(plugin.settings.privateData, 'requests', []);
        if (plugin.isNew && !plugin.settings.privateData.requests.length) {
            this.sidebarButton();
        }
        /* wwEditor:end */
    },
    /* wwEditor:start */
    /*=============================================m_ÔÔ_m=============================================\
        SYNCHRONIZE
    \================================================================================================*/
    async sync(request) {
        try {
            await wwLib.wwPlugin.saveCmsDataSet(this.settings.id, request.id, request.name, request.displayBy, 'Sql');

            wwLib.wwNotification.open({
                text: {
                    en: `Request "${request.name}" succesfully fetched`,
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
        for (const request of this.settings.privateData.requests) await this.sync(request);
    },
    /*=============================================m_ÔÔ_m=============================================\
        SIDEBAR POPUP
    \================================================================================================*/
    async sidebarButton() {
        try {
            const { id, settings, isNew } = wwLib.wwPlugins.pluginSql;
            const isSetup = !isNew;
            const isFirstTime = !settings.privateData.requests.length;
            await wwLib.wwPopups.open({
                firstPage: isSetup ? 'SQL_POPUP' : 'SQL_REQUESTS_POPUP',
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
