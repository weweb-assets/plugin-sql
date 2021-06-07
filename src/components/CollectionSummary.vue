<template>
    <div class="sql-collection-summary">
        <div class="sql-collection-summary__elem caption-s">Client: {{ config.client || '-' }}</div>
        <div class="sql-collection-summary__elem caption-s">Host: {{ config.host || '-' }}</div>
        <div class="sql-collection-summary__elem caption-s">Database: {{ config.database || '-' }}</div>
        <div class="sql-collection-summary__elem caption-s">Query: {{ config.query || '-' }}</div>
    </div>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        config: { type: Object, required: true },
    },
    watch: {
        isSetup: {
            immediate: true,
            handler(value) {
                this.$emit('update-is-valid', value);
            },
        },
    },
    computed: {
        isSetup() {
            return (
                !!this.config.host &&
                !!this.config.port &&
                !!this.config.user &&
                !!this.config.password &&
                !!this.config.database &&
                !!this.config.query
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.sql-collection-summary {
    &__elem {
        margin-bottom: var(--ww-spacing-01);
    }
}
</style>
