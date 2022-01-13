<template>
</template>

<script>
export default {
    // name:domTitle,
    created(){
        document.title = this.$route.meta.title;
    },
}
</script>
