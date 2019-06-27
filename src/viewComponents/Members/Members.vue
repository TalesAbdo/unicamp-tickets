<template>
    <div class="services-container">
        <div class="left-container">
            <Button icon="fa-user" value="Novo membro" @click="modalControl" />
        </div>

        <div class="right-container">
             <Title titleValue="Membros"/>

             <MemberCard v-for="member in members" :key="member.id" :member="member" @onUpdate="getMemberList"/>
        </div>
        <NewMember :show="showNewMember" @hide="modalControl"  @onUpdate="getMemberList"/>
    </div>
</template>

<script>
import NewMember from 'modal/NewMember/NewMember.vue';
import Button from 'shared/Button.vue';
import Title from 'shared/Title.vue';
import MemberCard from './components/MemberCard.vue';

const axios = require('axios');

export default {
    name: 'members',
    components: {
        NewMember, Button, Title, MemberCard
    },
    data() {
        return {
            showNewMember: false,
            members: [],
        };
    },
    mounted() {
        this.getMemberList();
    },
    methods: {
        getMemberList() {
            axios.get('/api/usersupport/all')
            .then((response) => {
                this.members = response.data;
            })
            .catch(() => {
                this.$notify({
                    group: 'foo',
                    title: 'Erro!',
                    text: 'Não foi possível obter a lista de membros.',
                    type: 'Danger'
                });
            });
        },
        modalControl() {
            this.showNewMember = !this.showNewMember;
            this.getMemberList();
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
