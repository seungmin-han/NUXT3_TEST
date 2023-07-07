import { defineStore } from "pinia";

const MAX_LENGTH = 2;

export const useModalStore = defineStore('modalStore', {
    state: () => ({
        modals: [],
    }),
    getters: {
        // getter functions
    },
    actions: {
        openModal(item) {
            let idx = this.modals.findIndex(v => v.fileName === item.fileName);

            if (idx != -1) {
                this.modals.splice(idx,1);
            } 

            if (this.modals.length == MAX_LENGTH) {
                this.modals.shift();  
            }

            this.modals.push({...item, x: window.innerWidth/2, y:window.innerHeight/2});
        }
    },
})