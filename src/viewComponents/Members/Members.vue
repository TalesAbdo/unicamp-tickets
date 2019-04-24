<template>
    <div class="services-container">
        <div class="left-container">
            <Button icon="fa-user" value="Novo membro" @click="modalControl" />
        </div>

        <div class="right-container">
             <Title titleValue="Membros"/>

             <MemberCard v-for="item in members" :key="item.name" :member="item"/>
        </div>
        <NewMember :show="showNewMember" @hide="modalControl"/>
    </div>
</template>

<script>
import NewMember from 'modal/NewMember/NewMember.vue';
import Button from 'shared/Button.vue';
import Title from 'shared/Title.vue';
import MemberCard from './components/MemberCard.vue';

export default {
    name: 'members',
    components: {
        NewMember, Button, Title, MemberCard
    },
    data() {
        return {
            showNewMember: false,
            members: [
                { name: 'Tales de Mileto dos Santos Prado', email: 'tales@ft.unicamp.br', isAdmin: true },
                { name: 'Ana Carolina de Souza', email: 'ana@ft.unicamp.br' },
                { name: 'José Pedro Martins', email: 'jose@ft.unicamp.br' },
                { name: 'Maria dos Santos', email: 'maria@ft.unicamp.br' },
                { name: 'Ricardo José Pinheiros', email: 'ricardo@ft.unicamp.br' }
            ],
        };
    },
    methods: {
        modalControl() {
            this.showNewMember = !this.showNewMember;
        },
    }
};
</script>


<style lang="scss">

.services-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .left-container {
        width: 12.5%;
        margin-right: 2.5rem;
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        margin-top: .4rem;
    }

    .right-container {
        width: 50%;

        .right-header {
            margin-bottom: 1.5rem;
        }
    }
}
</style>
