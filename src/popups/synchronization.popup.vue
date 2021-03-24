<template>
    <div class="ww-popup-sql-sync">
        <button class="sql-sync__all ww-editor-button -primary -green" @click="syncAll" :disabled="isFetching">
            <div v-if="!isFetching">Synchronize all</div>
            <div v-else>Fetching...</div>
        </button>
        <div class="sql-sync__row" v-for="(request, index) in settings.privateData.requests" :key="index">
            <div class="paragraph-m">{{ request.name || request.url }}</div>
            <div class="caption-m m-auto-left">
                <template v-if="!isRequestFetching(request)">
                    <template v-if="getSource(request).lastSyncDate">
                        {{ getSource(request).lastSyncDate | dateFromNow }}
                    </template>
                    <template v-else>never synchronized</template>
                </template>
            </div>
            <button
                :disabled="isRequestFetching(request)"
                class="ww-editor-button -primary -green -small m-left"
                @click="sync(request)"
            >
                <div v-if="!isRequestFetching(request)">Synchronize REQUEST</div>
                <div v-else>Fetching...</div>
            </button>
        </div>
        <div class="sql-sync__separator"></div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'SynchronizationPopup',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    filters: {
        dateFromNow(date) {
            return moment(date).fromNow();
        },
    },
    data() {
        return {
            isFetching: false,
            requestsFetching: [],
            settings: {
                privateData: {},
            },
        };
    },
    methods: {
        getSource(request) {
            return wwLib.$store.getters['cms/getData'][request.id] || {};
        },
        isRequestFetching(request) {
            return this.requestsFetching.indexOf(request.id) !== -1;
        },
        requestFetching(request, value) {
            if (value) {
                this.requestsFetching.push(request.id);
            } else {
                const index = this.requestsFetching.indexOf(request.id);
                if (index !== -1) this.requestsFetching.splice(index, 1);
            }
        },
        async sync(request) {
            this.requestFetching(request, true);
            await wwLib.wwPlugins.pluginSql.sync(request);
            this.requestFetching(request, false);
        },
        async syncAll() {
            this.isFetching = true;
            for (const request of this.settings.privateData.requests) await this.sync(request);
            this.isFetching = false;
        },
    },
    created() {
        this.settings = this.options.data.settings;
    },
    mounted() {
        if (this.options.data.isFirstTime) this.syncAll();
    },
};
</script>

<style scoped lang="scss">
.ww-popup-sql-sync {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .sql-sync {
        &__all {
            margin: 0 auto var(--ww-spacing-02) auto;
        }
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
