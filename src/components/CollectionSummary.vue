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
        config: { type: Object, required: true },
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
