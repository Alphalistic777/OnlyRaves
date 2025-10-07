# OnlyRaves

Eine moderne, bunte Ticket-Buchungsplattform für Raves und Events.

## Features

- **Rainbow Design** - Bunte premium Visuals
- **Authentication** - Login/Register mit Supabase Auth
- **Rave Discovery** - Entdecke und filtere Events
- **Warenkorb** - Ticket-Buchungssystem
- **Promoter Dashboard** - Erstelle und verwalte eigene Events
- **User Profile** - Persönliche Daten verwalten
- **Funktionierendes deployment

- **_Einige designs/router müssen noch angepasst werden, aber basis läuft_**

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **Deployment**: IONOS Webhosting Webspace
-
## Installation

1. Repository klonen:

2. Dependencies installieren:

```
npm install
```

1. Development Server starten:
```
npm run dev
```

1. Build erstellen:
```bash
npm run build
```

## Supabase Setup

Die Supabase Konfiguration ist bereits in `src/utils/supabase.ts` eingebettet:

```typescript
const supabaseUrl = 'https://xxxx.supabase.co';
const supabaseAnonKey = 'xxx...';
```

## Projekt Struktur

```
src/
├── components/     # Reusable Components
│   └── Header.tsx
├── pages/         # Page Components
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Raves.tsx
│   ├── RaveDetails.tsx
│   ├── Cart.tsx
│   ├── Promotion.tsx
│   └── Profile.tsx
├── context/       # React Context
│   └── AuthContext.tsx
├── utils/         # Utility Functions
│   └── supabase.ts
├── types/         # TypeScript Types
│   └── index.ts
└── App.tsx        # Main App Component
```

## Pages

- **/** - Startseite mit Begrüßung und Buttons
- **/login** - Anmeldeseite
- **/register** - Registrierungsseite
- **/raves** - Alle Raves mit Filter-Optionen
- **/raves/:id** - Detailansicht eines Raves
- **/cart** - Warenkorb mit Checkout
- **/promotion** - Promoter Dashboard zum Erstellen von eigenen Events
- **/profile** - Benutzerprofil sehen und bearbeiten/ ausloggen

## Design System

### Farben
- **Rainbow Palette**
- **Neon Colors**
- **Dark Theme**

### Komponenten
- **Glass Card**: `className="glass-card"`
- **Rainbow Text**: `className="rainbow-text"`
- **Primary Button**: `className="btn-primary"`
- **Secondary Button**: `className="btn-secondary"`

## Features Details

### Authentikation
- Login/Register mit Email und Passwort
- Protected Routes für eingeloggte User
- User Profile mit persönlichen Daten
- Automatische Vergabe von IDs für user, rave, cart per Supabase uuid


### Rave Management
- Alle Raves anzeigen mit Filter-Optionen
- Rave Details mit allen Informationen
- In den Warenkorb hinzufügen
- User können eigene Raves erstellen/löschen

### Warenkorb
- Raves hinzufügen/entfernen
- Preiskalkulation mit Servicegebühren
- Checkout-Prozess (funktioniert nicht, in planung)

## Deployment
- Funktionierendes deployment auf http://euphorya.net (https sicherheit kommt noch)
- Auch die Seite funktioniert mit der angebundenen Supabase Datenbank.
- /dist Ornder zum anbinden der Website

-Auch mit Vercel herumprobiert: https://only-raves.vercel.app

## Entwicklung

### Code
- TypeScript
- ESLint
- Tailwind CSS für Styling
- React Hooks für State Management

- Komponenten sind modular und wiederverwendbar
- Protected Routes für authentifizierte Inhalte
- Loading States
- Responsive Design für alle Geräte (halbwegs)

