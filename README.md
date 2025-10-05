# OnlyRaves - Next-gen Ticket-Buchungsseite

Eine moderne, bunte Ticket-Buchungsplattform für Raves und elektronische Musikevents.

## Features

- 🌈 **Rainbow Design** - Bunte premium Visuals
- 🔐 **Authentication** - Login/Register mit Supabase Auth
- 🎵 **Rave Discovery** - Entdecke und filtere Events
- 🛒 **Warenkorb** - Ticket-Buchungssystem
- 📢 **Promoter Dashboard** - Erstelle und verwalte eigene Events
- 👤 **User Profile** - Persönliche Daten verwalten
- 📱 **Responsive Design** - Funktioniert auf allen Geräten
- ⚡ **Schnelle Performance** - Mit Vite und React

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS mit Rainbow-Theme
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

## Installation

1. Repository klonen:
```bash
git clone <repository-url>
cd onlyraves
```

2. Dependencies installieren:
```bash
npm install
```

3. Development Server starten:
```bash
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
- **Rainbow Palette**: `#FF006E`, `#FB5607`, `#FFBE0B`, `#8338EC`, `#3A86FF`
- **Neon Colors**: Pink, Purple, Blue, Green, Yellow
- **Dark Theme**: `#0A0A0A`, `#1A1A1A`, `#2A2A2A`, `#3A3A3A`

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
- Checkout-Prozess (Mock)

### Promoter Features
- Eigene Raves erstellen
- Events bearbeiten/löschen
- Übersicht aller eigenen Events

## Deployment

Die App kann einfach auf Vercel, Netlify oder einem anderen Hosting-Service deployed werden:

```bash
npm run build
```

Der Build-Ordner kann dann deployed werden.

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
- Responsive Design für alle Geräte


