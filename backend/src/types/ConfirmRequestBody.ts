export interface ConfirmRequestBody {
    "customer_id":string,
    "origin":string,
    "destination":string,
    "distance":number,
    "duration":string,
    "driver":{
        "id":number,
        "name":string
    },
    "value":string
}