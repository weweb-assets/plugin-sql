<template>
    <div class="ww-popup-sql-requests">
        <button class="sql-requests__all ww-editor-button -primary" @click="addRequest">Add REQUEST</button>
        <div class="sql-requests__row" v-for="(request, index) in settings.privateData.requests" :key="index">
            <div class="paragraph-m">{{ request.name || request.url }}</div>
            <button class="ww-editor-button -secondary -small m-auto-left" @click="editRequest(index, request)">
                Edit
            </button>
            <div class="sql-requests__button-delete m-left" @click="deleteRequest(index)">
                <wwEditorIcon name="delete" small />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RequestsPopup',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            settings: {
                privateData: {},
            },
        };
    },
    watch: {
        isSetup() {
            this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
        },
    },
    computed: {
        isSetup() {
            return this.settings.privateData.requests && this.settings.privateData.requests.length;
        },
    },
    methods: {
        async addRequest() {
            try {
                const result = await wwLib.wwPopups.open({
                    firstPage: 'REST_REQUEST_ADD_REQUEST_POPUP',
                });
                this.settings.privateData.requests.push(result.request);
            } catch (err) {
                wwLib.wwLog.error(err);
            }
        },
        async editRequest(index, request) {
            try {
                const result = await wwLib.wwPopups.open({
                    firstPage: 'REST_REQUEST_EDIT_REQUEST_POPUP',
                    data: { request },
                });
                this.settings.privateData.requests.splice(index, 1, result.request);
            } catch (err) {
                wwLib.wwLog.error(err);
            }
        },
        async deleteRequest(index) {
            const confirm = await wwLib.wwModals.open({
                title: {
                    en: 'Delete data source?',
                    fr: 'Supprimer la source de données?',
                },
                text: {
                    en:
                        'Are you sure you want to delete this data source? All elements binded to this data source will be unbind.',
                    fr:
                        'Voulez-vous vraiment supprimer la source de données ? Tous les éléments liés à cette source de données seront dissociés.',
                },
                buttons: [
                    {
                        text: {
                            en: 'Cancel',
                            fr: 'Annuler',
                        },
                        color: '-secondary',
                        value: false,
                        escape: true,
                    },
                    {
                        text: {
                            en: 'Delete',
                            fr: 'Supprimer',
                        },
                        color: '-primary -red',
                        value: true,
                        enter: true,
                    },
                ],
            });
            if (!confirm) return;
            this.settings.privateData.requests.splice(index, 1);
        },
        async beforeNext() {
            this.options.setLoadingStatus(true);
            try {
                const plugin = wwLib.wwPlugins.pluginRestRequest;
                plugin.settings = await wwLib.wwPlugin.saveSettings(
                    plugin.id,
                    plugin.settings.id,
                    this.settings.data,
                    this.settings.privateData
                );

                const oldRequests = this.options.data.settings.privateData.requests;
                const newRequests = this.options.result.settings.privateData.requests;
                const deletedRequests = oldRequests.filter(
                    request => !newRequests.find(elem => elem.id === request.id)
                );
                deletedRequests.forEach(request => wwLib.wwPlugin.deleteCmsDataSet(request.id));

                wwLib.wwPlugins.pluginRestRequest.settings = plugin.settings;
                this.options.data.settings = plugin.settings;
            } catch (err) {
                wwLib.wwLog.error(err);
            }
            this.options.setLoadingStatus(false);
        },
    },
    created() {
        this.settings = _.cloneDeep(this.options.data.settings || this.settings);
        this.options.result.settings = this.settings;
        this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
    },
};
</script>

<style scoped lang="scss">
.ww-popup-sql-requests {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .sql-requests {
        &__all {
            margin: 0 auto var(--ww-spacing-02) auto;
        }
        &__row {
            display: flex;
            align-items: center;
            margin-bottom: var(--ww-spacing-04);
        }
        &__button-delete {
            margin: 0 var(--ww-spacing-03);
            cursor: pointer;
            transition: color 0.3s ease;
            &:hover {
                color: var(--ww-color-red-500);
            }
        }
    }
    .m-auto-left {
        margin-left: auto;
    }
    .m-left {
        margin-left: var(--ww-spacing-03);
    }
}
</style>
