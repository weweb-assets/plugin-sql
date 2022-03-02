/* wwEditor:start */
import './components/SettingsEdit.vue';
import './components/SettingsSummary.vue';
import './components/CollectionEdit.vue';
import './components/CollectionSummary.vue';
import './components/SQLRequest.vue';
/* wwEditor:end */

export default {
    /*=============================================m_ÔÔ_m=============================================\
        Collection API
    \================================================================================================*/
    /* wwEditor:start */
    // eslint-disable-next-line no-unused-vars
    async fetchCollection(_collection) {
        return { data: null, error: null };
    },
    /* wwEditor:end */
    async sqlRequest(connection, query, wwUtils) {
        const websiteId = wwLib.wwWebsiteData.getInfo().id;
        /* wwEditor:start */
        wwUtils.log({ label: 'Query', preview: query });
        /* wwEditor:end */
        const { data } = await axios.post(`${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/sql/query`, {
            connection,
            query,
        });
        return data;
    },
};
