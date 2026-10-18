# Tikondane Backend API

Node.js + Express + **MongoDB Atlas** (Mongoose). One API serves the patient mobile app, the navigator dashboard and the USSD menu. All three share the same Atlas database.

## 1. One-time Atlas setup (one person does this, then shares)

1. Create a free **M0** cluster at https://cloud.mongodb.com
2. **Database Access** > add a database user for each teammate (or one shared user). Note the password.
3. **Network Access** > add each teammate's IP address (for development you can allow `0.0.0.0/0`, but remove it before real patient data goes in).
4. **Connect > Drivers** > copy the connection string.

## 2. Run it

```
cd backend
npm install
copy .env.example .env      (Mac/Linux: cp .env.example .env)
```
Open `.env` and paste your connection string into `MONGODB_URI` (replace `<password>`). **Never commit `.env`.** It is already in `.gitignore`. Share the string with teammates privately, not in the repo or chat groups.

```
npm run seed     # demo data, only runs on an empty database
npm run dev      # http://localhost:3000
npm test         # 15 tests
```

`npm test` runs against a separate database called `tikondane_test` and wipes only that one. It never touches your real `tikondane` data.

Demo logins (password for all: `password123`)
| Role | Phone |
|---|---|
| Patient (Alineti B.) | +265999000001 |
| Navigator (Nurse Grace Phiri) | +265999111111 |

## Who owns what

| Person | Area | File |
|---|---|---|
| 1 | Patient mobile API | `src/routes/patient.js` (done) |
| 2 | Navigator dashboard API | `src/routes/navigator.js` (to build) |
| 3 | USSD menu + reminder engine | `src/routes/ussd.js` (to build) |
| Shared | Data models, login, business rules | `src/models.js`, `src/routes/auth.js`, `src/services/followup.js` |

**Rules of the road**
1. Changing `src/models.js`? Tell the other two first. It is the contract.
2. The "missed appointment" and "severe symptom" rules live ONLY in `src/services/followup.js`. Call those functions (with `await`); do not rewrite the logic.
3. Add a test in `test/` for every endpoint you add.
4. IDs are MongoDB ObjectIds, sent to clients as strings.

## Collections (see `src/models.js`)

`users`, `navigators`, `patients` (has the status flag: `on_track` / `missed_1` / `missed_2_plus`), `treatmentplans`, `appointments`, `medications`, `medicationlogs`, `checkins`, `contactlogs`, `followuptasks`, `supportcontacts`.

A patient can have only one **open** follow-up task per reason; the database enforces it with a unique partial index, so duplicate alerts cannot happen.

## Auth

Send `Authorization: Bearer <token>` on every request except `/auth/*`.

| Method | Path | Body | Notes |
|---|---|---|---|
| POST | `/auth/register` | `{ phone, password, fullName, language? }` | Creates a patient. Returns `{ token, user }` |
| POST | `/auth/login` | `{ phone, password }` | Returns `{ token, user }` |

## Patient API (Person 1, built)

| Method | Path | Feeds screen | Notes |
|---|---|---|---|
| GET | `/patient/home` | Home | Comfort message, next visit, today's medicines, navigator |
| GET | `/patient/care-path` | Care Path | Plan progress + timeline steps (`completed` / `missed` / `next` / `upcoming`) |
| POST | `/patient/appointments/:id/confirm` | Home | "Confirm I Will Come" |
| POST | `/patient/appointments/:id/reschedule-request` | Home / Missed | Body `{ reason? }`. Creates a navigator task |
| POST | `/patient/callback-request` | Missed appointment | Body `{ note? }`. Creates a high-priority task |
| GET | `/patient/medications` | Medicines | Each item `status`: `taken` / `due` / `upcoming` |
| POST | `/patient/medications/:id/taken` | Home, Medicines | Body `{ taken: false }` to undo |
| POST | `/patient/checkin` | Triage, Home mood | Any of `mood`, `nausea` (1-5), `pain` (0-10), `energy` (`good`/`moderate`/`bed`), `fever` (bool) |
| GET | `/patient/support` | Support | Counsellors, peer groups, hotline |

A check-in is **severe** when nausea is 4-5, pain is 8-10, or fever is true. Severe check-ins automatically add a high-priority task for the navigator.

"Today" and medicine due times use **Malawi time** (Africa/Blantyre, UTC+2) no matter where the server runs. See `src/utils/time.js`.

## Shared business rules (`src/services/followup.js`)

- `await markAppointmentMissed(appointmentId)`: 1st miss sets patient to `missed_1`; 2nd+ sets `missed_2_plus` and creates a HIGH priority task.
- `await flagSevereCheckin(patientId, checkinId)`: creates the nurse alert task.
- `await createTask({ patientId, reason, priority, note })`: adds to the navigator queue (skips if an identical task is still open).

## Navigator API (Person 2, to build)

Suggested endpoints: `GET /navigator/patients` (with status flags), `GET /navigator/patients/:id`, `GET /navigator/tasks`, `POST /navigator/patients/:id/contact-log`, `POST /navigator/appointments/:id/missed`.

## USSD + reminders (Person 3, to build)

Gateways such as Africa's Talking POST `sessionId`, `phoneNumber`, `text` to `/ussd`. Reply as plain text starting with `CON ` (continue) or `END ` (finish). Look the patient up by `users.phone`. The reminder job should increase `appointments.reminderCount`, re-remind once, then call `markAppointmentMissed`.

## Connecting the phone (USB debugging)

Forward the API port the same way as Expo's:
```
adb reverse tcp:3000 tcp:3000
```
Then the app can call `http://localhost:3000`.
