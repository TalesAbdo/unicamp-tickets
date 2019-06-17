<template>
    <div :class="{'is-active': show}" class="modal service-control">
        <div class="modal-background" @click="hide"></div>
        <form class="modal-content" autocomplete="off">
            <Title :titleValue="titleText" class="header-text"/>
            <Input class="margin-rem" inputTitle="Nome" inputPlaceHolder="o nome" @input="setName" :preValue="oldService.name"/>
            <Textarea class="margin-rem" textareaTitle="Descrição" textareaPlaceHolder="a descrição" @input="setDescription" :preValue="oldService.description"/>
            <div class="footer-buttons">
                <button type="button" class="button is-black" @click="createUpdateService">{{buttonText}}</button>
                <button v-if="oldService.id" type="button" class="button is-danger is-inverted"  @click="deleteService">Remover Serviço</button>
            </div>
        </form>
        <button class="modal-close is-large" aria-label="close"/>
    </div>
</template>

<script>
import Title from 'shared/Title.vue';
import Input from 'shared/Input.vue';
import Textarea from 'shared/Textarea.vue';

const axios = require('axios');

export default {
    name: 'serviceControl',
    components: {
        Title, Input, Textarea
    },
    props: {
        show: { type: Boolean, default: false },
        oldService: { type: Object, required: true },
    },
    computed: {
        titleText() {
            if (this.oldService.name) {
                return 'Editar Serviço';
            }
            return 'Novo Serviço';
        },
        buttonText() {
            if (this.oldService.name) {
                return 'Confirmar Alterações';
            }
            return 'Criar Serviço';
        },
    },
    data() {
        return {
            service: {
                name: null,
                description: null,
            }
        };
    },
    watch: {
        oldService() {
            this.service = this.oldService;
        },
    },
    methods: {
        hide() {
            this.$emit('hide');
        },
        setName(value) {
            this.service.name = value;
        },
        setDescription(value) {
            this.service.description = value;
        },
        createUpdateService() {
            if (this.service.name && this.service.description) {
                const params = {
                    name: this.service.name,
                    description: this.service.description
                };
                if (this.oldService.id) {
                    axios.put(`api/service/update/${this.oldService.id}`, params)
                        .then(() => {
                            this.$notify({
                                group: 'foo',
                                title: 'Sucesso!',
                                text: 'Serviço atualizado com êxito.',
                                type: 'success'
                            });
                        });
                } else {
                    axios.post('api/service/new', params)
                        .then(() => {
                            this.$notify({
                                group: 'foo',
                                title: 'Sucesso!',
                                text: 'Serviço criado com êxito.',
                                type: 'success'
                            });
                        });
                }
                this.hide();
            } else {
                this.$notify({
                    group: 'foo',
                    title: 'Atenção!',
                    text: 'Preencha todas as informações necessárias.',
                    type: 'danger'
                });
            }
        },
        deleteService() {
            axios.delete(`api/service/delete/${this.oldService.id}`)
                .then(() => {
                    this.$notify({
                        group: 'foo',
                        title: 'Sucesso!',
                        text: 'Serviço deletado com êxito.',
                        type: 'success'
                    });
                    this.hide();
                });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~src/css/main.scss';

.modal.service-control {
    .modal-background {
        background-color: rgba(76, 76, 76, 0.5);
    }

    .modal-content {
        width: 55%;
        padding: 1.25rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: $white;
        filter: drop-shadow(0 0 5px $black);

        .header-text {
            margin-bottom: 1rem;
            cursor: default;
            width: fit-content;
        }

        .margin-rem {
            margin-bottom: 1.25rem;
        }

        .footer-buttons {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: flex-end;
            align-items: flex-end;

            .is-danger {
                margin-top: .5rem;
            }
        }
    }
}
</style>
