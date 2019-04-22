<template>
    <div :class="{'is-active': show}" class="modal ticket-details">
        <div class="modal-background" @click="hide"/>
        <div class="modal-content">
            <div class="header">
                <span class="has-text-weight-bold is-size-5">{{ticket.title}}</span>
                <div class="sub-header">
                    <TicketNumber class="ticket-number" :id="19438"/>
                    <PersonInformation firstLine="Tales Abdo" secondLine="talesabdo@outlook.com" imageSrc="https://s.ebiografia.com/assets/img/authors/ta/le/tales-de-mileto-l.jpg"/>
                </div>
            </div>

            <div class="ticket-content">
                <div class="left-content">
                    <ServiceDropdown title="Serviço" triggerValue="Matrícula" :itens="itens"/>
                    <StatusDropdown title="Status" :triggerValue="1" :itens="itens"/>
                    <SeverityDropdown title="Severidade" :triggerValue="2" :itens="itens"/>
                    <AssignedDropdown title="Responsável" triggerValue="Tales" :itens="itensAssigned" dropdownType="assigned"/>
                    <AttachmentList />
                </div>
                <div class="line"/>
                <div class="right-content">
                    <span class="has-text-weight-bold">Descrição</span>
                    <span>{{ticket.description}}</span>
                </div>
            </div>

            <div class="line-divider"> </div>

            <div class="comment-area-content">
                <Textarea textareaTitle="Comentário" textareaPlaceHolder="seu comentário"/>
                <div class="option-buttons">
                    <button class="button is-black is-normal">Comentar</button>
                </div>
            </div>

            <History/>
        </div>
    </div>
</template>

<script>
import TicketNumber from 'shared/TicketNumber.vue';
import PersonInformation from 'shared/PersonInformation.vue';
import Textarea from 'shared/Textarea.vue';
import History from './components/History.vue';
import ServiceDropdown from './components/ServiceDropdown.vue';
import StatusDropdown from './components/StatusDropdown.vue';
import SeverityDropdown from './components/SeverityDropdown.vue';
import AssignedDropdown from './components/AssignedDropdown.vue';
import AttachmentList from './components/AttachmentList.vue';

export default {
    name: 'ticketDetails',
    components: {
        TicketNumber, PersonInformation, Textarea, History, ServiceDropdown, StatusDropdown, SeverityDropdown, AssignedDropdown, AttachmentList
    },
    props: {
        show: { type: Boolean, default: false }
    },
    data() {
        return {
            ticket: {
                title: 'Problema nos computadores do laboratório 3',
                description: 'Quisque lobortis eu augue et elementum. Maecenas vel ex venenatis, tempor mi at, cursus purus. Donec nec erat quam. Aliquam sodales nisl nulla, quis porta arcu mattis ut. Donec eget leo pharetra, rutrum sapien in, congue massa. Suspendisse potenti. Suspendisse venenatis semper felis non malesuada. Etiam iaculis, neque sed faucibus gravida, diam lacus viverra neque, id bibendum nisi enim et turpis.' //eslint-disable-line
            },
            itens: [{ id: 1, value: 'ítem1' }, { id: 2, value: 'ítem2' }, { id: 3, value: 'ítem3' }],
            itensAssigned: [
                { id: 1, value: 'Tales de Mileto', imageSource: 'https://s.ebiografia.com/assets/img/authors/ta/le/tales-de-mileto-l.jpg' },
                {
                    id: 2,
                    value: '9s',
                    imageSource: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLNrCG5UnTcct9-mlr2I-H5p2acL1qwhBuPApVCA7LL2_Evdp2gQ'
                },
                { id: 3, value: 'Lorde', imageSource: 'https://pbs.twimg.com/profile_images/418421020727324672/HuJpLShB.jpeg' }
            ]
        };
    },
    methods: {
        hide() {
            this.$emit('hide');
        },
    }
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.modal.ticket-details {
    .modal-background {
        background-color: rgba(76, 76, 76, 0.5);
    }

    .modal-content {
        width: 70%;
        padding: 1.25rem;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        background-color: white;
        filter: drop-shadow(0 0 5px $black);

        .header {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 1rem;

            .sub-header {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: .5rem;
            }

            .ticket-number {
                margin-right: .9rem;
            }
        }

        .ticket-content {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;

            .left-content {
                display: flex;
                flex-direction: column;
                width: 30%;
            }

            .line {
                border-left: 2px solid $gray;
                height: inherit;
            }

            .right-content {
                width: 65%;
                display: flex;
                flex-direction: column;
            }
        }

        .line-divider {
            border-bottom: 4px solid $black;
            width: 100%;
            margin-bottom: 1rem;
        }

        .comment-area-content {
            width: 100%;
            display: flex;
            margin-bottom: 1rem;

            .option-buttons {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                margin-left: 1rem;
            }
        }
    }
}
</style>
