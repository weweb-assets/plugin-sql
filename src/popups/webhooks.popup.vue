<template>
    <div class="ww-popup-sql-webhooks">
        <div class="sql-webhooks__row" v-for="(request, index) in settings.privateData.requests" :key="index">
            <div class="paragraph-m">{{ request.name || request.url }}</div>
            <button class="ww-editor-button -primary -green -small m-auto-left" @click="copyUrl(request)">
                <wwEditorIcon class="ww-editor-button-icon -left" name="copy-paste" small />
                Copy url
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WebhooksPopup',
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
    methods: {
        async copyUrl(request) {
            const designId = wwLib.wwWebsiteData.getInfo().id;
            await wwLib
                .getManagerWindow()
                .navigator.clipboard.writeText(
                    `https://data.weweb.io/designs/${designId}/cms_data_set/${request.id}/callback`
                );
            wwLib.wwNotification.open({
                text: {
                    en: 'Url copied to clipboard',
                },
                color: 'green',
            });
        },
    },
    created() {
        this.settings = this.options.data.settings;
    },
};
</script>

<style scoped lang="scss">
.ww-popup-sql-webhooks {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .sql-webhooks {
        &__row {
            display: flex;
            align-items: center;
            margin-bottom: var(--ww-spacing-04);
        }
    }
    .m-auto-left {
        margin-left: auto;
    }
    .m-left {
        margin-left: var(--ww-spacing-02);
    }
}
</style>
