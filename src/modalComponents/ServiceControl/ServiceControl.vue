<template>
    <div :class="{'is-active': show}" class="modal service-control">
        <div class="modal-background" @click="hide"></div>
        <form class="modal-content" autocomplete="off">
            <Title :titleValue="titleText" class="header-text"/>
            <Input v-if="oldService.name" class="margin-rem" inputTitle="Nome" inputPlaceHolder="o nome" @input="setName" :preValue="oldService.name" :maxLength="60"/>
            <Input v-else class="margin-rem" inputTitle="Nome" inputPlaceHolder="o nome" @input="setName" :preValue="service.name" :maxLength="60"/>
            <Textarea v-if="oldService.description" vclass="margin-rem" textareaTitle="Descrição" textareaPlaceHolder="a descrição"
                      @input="setDescription" :preValue="oldService.description" :maxLength="200"/>
            <Textarea v-else class="margin-rem" textareaTitle="Descrição" textareaPlaceHolder="a descrição" @input="setDescription" :preValue="service.description" :maxLength="200"/>
            <div class="footer-buttons">
                <button type="button" class="button is-black" @click="createUpdateService">{{buttonText}}</button>
                <button v-if="oldService.id" type="button" class="button is-danger is-inverted"  @click="deleteService">{{archiveText}}</button>
            </div>
        </form>
        <button class="modal-close is-large" aria-label="close"/>
    </div>
</template>

<script>
import axios from 'src/axios/axios.js';
import Title from 'shared/Title.vue';
import Input from 'shared/Input.vue';
import Textarea from 'shared/Textarea.vue';

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
        archiveText() {
            if (this.oldService.isActive) {
                return 'Arquivar Serviço';
            }
            return 'Desarquivar Serviço';
        }
    },
    data() {
        return {
            service: {
                name: null,
                description: null,
                isActive: true,
            },
            successMessage: {
                group: 'foo',
                title: 'Sucesso!',
                text: 'Operação realizada com êxito.',
                type: 'success'
            },
            errorMessage: {
                group: 'foo',
                title: 'Atenção!',
                text: 'Operação não realizada, contate o adminstrador da aplicação.',
                type: 'error'
            },
            attentionMessage: {
                group: 'foo',
                title: 'Atenção!',
                text: 'Preencha todas as informações necessárias.',
                type: 'error'
            }
        };
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
        async createUpdateService() {
            try {
                const params = {
                    name: this.service.name,
                    description: this.service.description,
                    isActive: this.service.isActive
                };

                if (this.oldService.id) {
                    this.updateService(params);
                } else {
                    this.createService(params);
                }
            } catch (e) {
                console.log(e);
            }
        },
        async createService(params) {
            await axios.post('service/new', params)
                .then((response) => {
                    if (response.data.errors) {
                        this.$notify({
                            group: 'foo',
                            title: 'Cuidado!',
                            text: response.data.errors[0].message,
                            type: 'warn'
                        });
                    } else if (response) {
                        this.$notify({
                            group: 'foo',
                            title: 'Sucesso!',
                            text: 'Serviço criado.',
                            type: 'success'
                        });
                        this.service.name = null;
                        this.service.description = null;
                        this.hide();
                    } else {
                        throw 'Aconteceu algum na hora de criar o serviço, contate o adminstrador.';
                    }
                }).catch((err) => {
                    this.$notify({
                        group: 'foo',
                        title: 'Erro!',
                        text: err,
                        type: 'error'
                    });
                });
        },
        async updateService(params) {
            await axios.put(`service/update/${this.oldService.id}`, params)
                .then((response) => {
                    if (response.data.errors) {
                        this.$notify({
                            group: 'foo',
                            title: 'Cuidado!',
                            text: response.data.errors[0].message,
                            type: 'warn'
                        });
                    } else if (response) {
                        this.$notify({
                            group: 'foo',
                            title: 'Sucesso!',
                            text: 'Serviço atualizado.',
                            type: 'success'
                        });
                        this.service.name = null;
                        this.service.description = null;
                        this.hide();
                    } else {
                        throw 'Aconteceu algum na hora de atualizar o serviço, contate o adminstrador.';
                    }
                }).catch((err) => {
                    this.$notify({
                        group: 'foo',
                        title: 'Erro!',
                        text: err,
                        type: 'error'
                    });
                });
        },
        async deleteService() {
            try {
                await axios.put(`service/archive/${this.oldService.id}`, { isActive: !this.oldService.isActive })
                    .then(() => {
                        this.$notify(this.successMessage);
                        this.service.name = null;
                        this.service.description = null;
                        this.service.isActive = true;
                        this.hide();
                    });
            } catch (error) {
                this.$notify(this.errorMessage);
            }
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

            .is-black {
                margin-top: 2rem;
            }

            .is-danger {
                margin-top: .5rem;
            }
        }
    }
}
</style>
