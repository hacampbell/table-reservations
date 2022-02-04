<template>
    <div class="resModal">
        <div class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="confirmDeleteLabel">Delete Reservation for {{restName}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete this reservation? This action cannot be undone.</p>
                        <p>Reservation ID is: {{resId}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="CloseModal">Cancel</button>
                        <button type="button" class="btn btn-danger" @click="Delete">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
  .modal {
    display: block;
    background-color: rgba(0, 0, 0, 0.432);
    text-align: left;
  }
</style>

<script>
    import {CancelReservation} from '../../services/reservations';

    export default {
        name: 'DeleteReservationModal',

        methods: {
            // Sends an event to close this modal
            CloseModal() {
                this.$emit('close-delete-reservation-modal-event');
            },

            // Sends a request to the server to delete this reservation
            async Delete() {
                CancelReservation(this.resId, this.$store.getters.GetAccessToken);
                this.CloseModal();
            }
        },

        props: {
            resId: {
                type: String,
                required: true
            },
            restName: {
                type: String,
                required: true
            }
        }
    }
</script>