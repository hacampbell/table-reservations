<template>
    <div class="restModal">
        <div class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Make a Reservation for {{restName}}</h5>
                    </div>
                    <div class="modal-body">
                        <form id="reservationForm">
                            <div class="mb-3">
                                <label for="reservation-name" class="col-form-label">Name:</label>
                                <input type="text" class="form-control" id="reservation-name">
                            </div>
                            <div class="mb-3">
                                <label for="reservation-phone" class="col-form-label">Phone:</label>
                                <input type="text" class="form-control" id="reservation-phone">
                            </div>
                            <div class="mb-3">
                                <label for="reservation-guests" class="col-form-label">Number of Guests:</label>
                                <input type="number" class="form-control" id="reservation-guests">
                            </div>
                            <div class="mb-3">
                                <label for="reservation-date" class="col-form-label">Date:</label>
                                <input type="date" class="form-control" id="reservation-date">
                            </div>
                            <div class="mb-3">
                                <label for="reservation-time" class="col-form-label">Time:</label>
                                <input type="time" class="form-control" id="reservation-time">
                            </div>
                            <div class="mb-3">
                                <label for="reservation-request" class="col-form-label">Special Requests:</label>
                                <textarea class="form-control" id="reservation-request"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="CloseModal">Close</button>
                        <button type="button" class="btn btn-primary" @click="SaveChanges">Submit</button>
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
    export default {
        name: 'RestaurantModal',

        methods: {
            CloseModal () {
                this.$emit('close-restaurant-modal-event');
            },

            SaveChanges () {
                this.MakeReservation();
                this.CloseModal();
            },

            async MakeReservation () {
                console.log('MakeReservation');
            }
        },

        props: {
            restName: {
                type: String,
                required: true
            }
        }
    }
</script>