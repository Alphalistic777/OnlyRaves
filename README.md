# OnlyRaves - Next-gen Ticket-Buchungsseite

Eine moderne, bunte Ticket-Buchungsplattform für Raves und Events.

## Features

- **Rainbow Design** - Bunte premium Visuals
- **Authentication** - Login/Register mit Supabase Auth
- **Rave Discovery** - Entdecke und filtere Events
- **Warenkorb** - Ticket-Buchungssystem
- **Promoter Dashboard** - Erstelle und verwalte eigene Events
- **User Profile** - Persönliche Daten verwalten
- **Responsive Design** - Funktioniert auf allen Geräten
- **Schnelle Performance** - Mit Vite und React
- **Funktionierendes deployment auf http://euphorya.net**

- **_Einige designs/router müssen noch angepasst werden, aber basis läuft_**

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS mit Rainbow-Theme
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **Deployment**: IONOS Webhosting Webspace
- 
## Installation

1. Repository klonen:

```
git clone https://github.com/Alphalistic777/OnlyRaves
```

2. Dependencies installieren:

```
npm install
```

3. Development Server starten:
```
npm run dev
```

4. Build erstellen:
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

- **/** - Startseite mit Hero Section und Features
- **/login** - Anmeldeseite
- **/register** - Registrierungsseite
- **/raves** - Alle Raves mit Filter-Optionen
- **/raves/:id** - Detailansicht eines Raves
- **/cart** - Warenkorb mit Checkout
- **/promotion** - Promoter Dashboard zum Erstellen von Events
- **/profile** - Benutzerprofil und Einstellungen

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

### Authentication
- Login/Register mit Email und Passwort
- Protected Routes für eingeloggte User
- User Profile mit persönlichen Daten

### Rave Management
- Alle Raves anzeigen mit Filter-Optionen
- Rave Details mit allen Informationen
- In den Warenkorb hinzufügen
- Nur Promoter können Raves erstellen/löschen

### Warenkorb
- Raves hinzufügen/entfernen
- Preiskalkulation mit Servicegebühren
- Checkout-Prozess (funktioniert nicht, in planung)

### Promoter Features
- Eigene Raves erstellen
- Events bearbeiten/löschen
- Übersicht aller eigenen Events

## Deployment

Funktionierendes deployment auf http://euphorya.net (https sicherheit kommt noch)
Auch die Seite funktioniert mit der angebundenen Supabase Datenbank.

/dist Ornder zum anbinden der Website

## Entwicklung

### Code Style
- TypeScript für Type Safety
- ESLint für Code Quality
- Tailwind CSS für Styling
- React Hooks für State Management

### Best Practices
- Komponenten sind modular und wiederverwendbar
- Protected Routes für authentifizierte Inhalte
- Error Handling und Loading States
- Responsive Design für alle Geräte (halbwegs)


