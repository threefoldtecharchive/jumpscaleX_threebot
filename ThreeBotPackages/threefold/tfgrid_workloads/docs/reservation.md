# Reservation

The reservation model consists of 2 parts: the reservation data, and the
reservation state. The data is is created entirely when the reservation is created,
and is immutable after this. The state is mutable, and after the reservation has been
created, this will be updated continuously by both the customer threebot and the farmer
threebot (and possibly other threebots who will sign to trigger actions).

## Reservation data

The reservation data is composed of the individual workloads to be deployed, information
about who can sign for the actual deployment and deletion of the workloads, and expiry
times for the reservation. All fields in the data object are immutable after the
reservation is created (i.e. the customer signs the data). Modifications afterwards
will cause the customer signature to become invalid.

## Reservation state

The reservation state is updated throughout the lifetime of the reservation. It also
contains the signatures needed to have the farmer threebot take action. In order for
the farmer threebot to start provisioning the workloads, or delete the workloads,
the `signing_request_provision` and `signing_request_delete`, respectively, need to be filled with
valid signatures. A valid signature is a signature for the reservation data, with a
private key owned by one of the threebots listed in the reservation data (in the
`signatures_provision` and `signatures_delete` fields). These fields also define
the minimum amount of signatures required. For example, a signature request for
provisioning might list 3 threebot ids which can sign, but only specify a `quorum_min`
of 2. As such, only 2 out of the 3 listed threebot ids would need to sign before the
farmer threebot is allowed to deploy the reserved workloads.

### signature validity

A signature is created by signing a piece of data using a private key. Afterwards,
the corresponding public key can be used to check if the signature is valid. A
[signature field](#signature.signing) is valid if it meets the following conditions:

- It contains at least the minimum amount of signatures required, as defined in
the `quorum_min` field of the corresponding [signing request field](#signing.request), 1 if there is no such
corresponding signing request.
- All signatures are valid with a public key owned by a referenced threebot (referenced
in the aforementioned accompanying [signing request field](#singing.request) or possibly other field).

## models

The following is an overview of the models available in the [models](./models) subdirectory,
their fields, and what these fields are used for.

### reservation

The [reservation object](./models/reservation.toml) is the high level object for dealing with a reservation
on the threefold grid. It is composed of the [reservation.data](#reservation.data) object, which holds
all data for the workloads covered by this reservation (and is immutable after it is created),
and additional info for the reservation state.

- data: As explained, the data field holds the [reservation.data](#reservation.data) object, which contains all
low level workloads to be provisioned. After the reservation is created, this field is
immutable.
- json: A representation of the `data` object, in json form. It is directly derived from
the `data` field. As such, it is also immutable.

Next to the reservation data, there is also a reservation state. These fields describe
the current state of the reservation, as well as the signatures provided by authorized threebots
to advance the state of the reservation.

- next_action: This field describes what action should be performed next. Given the enum
values, we can roughly describe a reservation life cycle as follows: After a reservation
is initially created, the customer (or rather, his threebot) needs to `sign` the reservation.
After this, the threebot uses funds in its wallet to `pay`, the amount depending on
the workloads specified in the reservation. Once this is done, the farmer's threebot can
`deploy` these workloads. After the reservation expires, the farmer threebot can
`delete` the provisioned workloads. This puts the reservation in its final `deleted` state,
ending its life cycle.
- signatures_provision: A list of [signatures](#signing.signature) needed to start the provisioning (deploy) step,
i.e. after enough valid signatures are provided here, the farmer threebot can start to deploy
the workloads defined. Validity of signatures and amount of valid signatures required
is defined by the `signing_request_provision` field in the `data` object.
- signature_farmer: the [signature](#signing.signature) of the farmer threebot, which declares that the farmer
agrees to provision the workloads as defined by the reservation once there is consensus
about the provisioning (see previous field).
- signatures_delete: Much like `signatures_provision`, however it is used when a currently
deployed workload needs to be deleted (before it expires). It is tied to the `signing_request_delete`
field in the `data` object.
- epoch: The date of the last modification?
- results: A list of [reservation results](#reservation.result). Every workload which is defined in the reservation
will return a result describing the status. This allows fine grained error handling for individual
workloads.

### reservation.data

### signing.request

### signing.signature

### reservation.result
