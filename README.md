# Cancer Treatment Journey Tracker

A digital patient-support system designed to help people living with cancer in Malawi stay on track with their treatment, report side effects, receive practical support, and remain connected with their care team.

## Overview

Cancer treatment can involve complex schedules, repeated hospital visits, medication, side effects, transportation challenges, and long periods of follow-up.

The Cancer Treatment Journey Tracker is being developed to provide a simple digital system that supports patients and caregivers throughout the treatment journey while helping nurses and patient navigators identify patients who may need follow-up.

The system is designed with the realities of Malawi in mind, including limited connectivity, basic mobile phones, low digital literacy, and the need for simple and accessible communication.

## Key Features

### For Patients and Caregivers

- Treatment schedule tracking
- Appointment reminders
- Medication reminders
- Side-effect reporting
- Treatment journey tracking
- Basic nutrition guidance
- Counselling and support resources
- SMS and USSD-based interaction
- Simple and accessible information
- Consent and privacy controls

### For Nurses and Patient Navigators

- Patient overview
- View upcoming and missed appointments
- Identify patients requiring follow-up
- View recently reported concerning symptoms
- Record follow-up actions
- Track treatment progress
- View basic treatment and follow-up statistics

## Technology Stack

### Frontend

- React
- JavaScript
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express.js
- PostgreSQL
- REST API

### Development

- Git
- GitHub
- ESLint

### Planned Communication Services

- SMS
- USSD

## System Architecture

```text
Patient / Caregiver
        |
        | Web / SMS / USSD
        v
React Frontend
        |
        | REST API
        v
Node.js + Express
        |
        v
PostgreSQL Database
        |
        +-------------------+
        |                   |
        v                   v
 Patient Support      Nurse Dashboard

└── ...
