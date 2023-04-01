<template>
    <div id="quiz" class="mt-6 col-a-center">
        <div class="columns">
            <div class="column">
    
            </div>
            <div class="column">
                {{ quiz.article }}
            </div>
        </div>
    
        <button class="button is-primary">채점하기</button>
    </div>
</template>
    
<script>
export default {
    layout: 'quiz',
    
    computed: {
        quiz() {
            return this.$store.state.quiz.item
        }
    }
}
</script>
    
<style>
.column {
    background-color: white;
}
</style>