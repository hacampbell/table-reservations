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
    import {CancelReservation, GetReservations} from '../../services/reservations';
    import {CheckAndRefreshToken} from '../../services/auth';

    export default {
        name: 'DeleteReservationModal',

        methods: {
            // Sends an event to close this modal
            CloseModal() {
                this.$emit('close-delete-reservation-modal-event');
            },

            // Sends a request to the server to delete this reservation
            async Delete() {
                // Before we make our request, ensure we have a valid access token
                await CheckAndRefreshToken(this);

                // Send our delete request
                await CancelReservation(this.resId, this.$store.getters.GetAccessToken);

                // Get and Set updated list of reservations
                const updatedResData = await GetReservations(this.$store.getters.GetAccessToken);
                this.$store.dispatch('UpdateResData', updatedResData);

                this.CloseModal();

                // Give the user some feedback
                this.$toast.open({
                    message: `Your reservation for ${this.restName} has been cancelled.`,
                    type: 'success',
                    duration: 5000
                });
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