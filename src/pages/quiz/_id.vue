<template>
    <div id="quiz" class="col-a-center">
        <div class="page">
            <div id="question" class="page-item">
    
            </div>
            <div id="article" class="page-item">
                {{ quiz.article }}
            </div>
        </div>
    
        <button id="btn-check" class="button is-primary">Check Answers</button>
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
#quiz {
    gap: 32px;
}

.page {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 18px;
    
    width: 1376px;
    min-height: 632px;

    margin-top: 106px;
}

.page-item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 64px;
    gap: 8px;
    
    width: 679px;
    min-height: 632px;
    
    background: #FFFFFF;
    
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
}

#article {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;

    color: #000000;
}

#btn-check {
    width: 180px;
    height: 40px;
    
    background: #5076CB;
    
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 20px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
}
</style>