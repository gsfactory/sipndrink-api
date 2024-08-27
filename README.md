# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## Models

user
- id
- name
- mobile

theatre
- id
- name
- description
- photo
- pricing per slot
- partial_payment_amount
- extra_seat_cost
- max_extra_seats
- num_seats

time_slots (static table)
- id
- theatre_id
- start_time
- end_time

bookings
- id
- theatre_id
- time_slot_id
- status (booked, cancelled, pending, completed)
- date
- extra_seats
- total_price
- price_paid
- customer_email
- customer_phone
- customer_name

booking_services
- id
- booking_id
- service_detail_id (pending)

Services
- id
- name (decorations, extra-decorations, flowers, food, cake, photogrgaphy)

ServiceDetail
- id
- service-id
- price
- photo
- first text
- second text
- is_eggless (only for cakes)
- num_photos (only for photographer)
- is_enabled (true/false)
- notes

