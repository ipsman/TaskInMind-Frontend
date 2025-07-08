# TaskInMind - Frontend

Ez a repository a **TaskInMind** alkalmazás frontend részét tartalmazza, amely egy intuitív naptár és teendőkezelő felületet biztosít a felhasználók számára. Az alkalmazás célja, hogy segítse a felhasználókat napi feladataik és eseményeik hatékony szervezésében.

## Tartalomjegyzék

* [Áttekintés](#áttekintés)
* [Főbb Jellemzők](#főbb-jellemzők)
* [Technológiák](#technológiák)
* [Telepítés](#telepítés)
* [Fejlesztési Szerver Indítása](#fejlesztési-szerver-indítása)
* [Projekt Struktúra](#projekt-struktúra)
* [API Kommunikáció](#api-kommunikáció)
* [Fejlesztési Tippek](#fejlesztési-tippek)

## Áttekintés

A **TaskInMind** egy modern, reszponzív felületet biztosít a naptári események és teendők kezelésére. A felhasználói élményre fókuszálva segít a napi feladatok hatékony szervezésében.

## Főbb Jellemzők

* **Naptár nézet:** Havi nézet a feladatok és események áttekintésére.
* **Feladatkezelés:** Feladatok létrehozása, szerkesztése, törlése és megjelölése.
* **Felhasználói profil:** Felhasználói információk megjelenítése és kezelése.
* **Navigáció:** Könnyed navigáció a naptárban (előző/következő hónap, "Today" gomb).
* **Összecsukható oldalsáv:** Dinamikusan összecsukható oldalsáv, amely kompakt nézetet biztosít.

## Technológiák

A frontend a következő fő technológiákra épül:

* **React:** A felhasználói felület építéséhez használt JavaScript könyvtár.
* **Next.js:** React keretrendszer, amely server-side rendering (SSR) és statikus oldal generálási (SSG) képességeket biztosít.
* **Tailwind CSS:** Egy utility-first CSS keretrendszer, amely gyors és reszponzív UI építését teszi lehetővé.
* **JavaScript (ES6+):** A programozási nyelv.
* **NPM/Yarn:** Csomagkezelő.

## Telepítés

A projekt telepítéséhez és futtatásához kövesd az alábbi lépéseket:

1.  **Klónozd a repository-t:**
    ```bash
    git clone [https://github.com/ipsman/TaskInMind-Frontend](https://github.com/ipsman/TaskInMind-Frontend)
    cd taskinmind-frontend
    ```
2.  **Telepítsd a függőségeket:**
    Győződj meg róla, hogy rendelkezel Node.js és npm (vagy Yarn) telepítéssel.
    ```bash
    npm install
    # vagy
    yarn install
    ```

## Fejlesztési Szerver Indítása

A fejlesztési szerver indításához és az alkalmazás böngészőben való megtekintéséhez futtasd a következő parancsot:

" ```bash "
npm run dev

yarn dev

## Projekt Struktúra

taskinmind-frontend/
├── public/                 # Statikus fájlok (képek, ikonok)
├── src/
│   ├── app/                # Next.js App Router gyökér (page.js, layout.js, stb.)
│   │   ├── (auth)/         # Authentikációs útvonalak (pl. login, register)
│   │   ├── (main)/         # Fő alkalmazás útvonalai (pl. calendar, dashboard)
│   │   │   ├── page.js     # Fő naptár/dashboard oldal
│   │   │   └── layout.js   # Fő elrendezés (oldalsáv, fejléc)
│   │   ├── BasePage.js     # Közös UI komponensek, logika (pl. handleGoToToday)
│   │   └── globals.css     # Tailwind CSS importálás és globális stílusok
│   ├── components/         # Újrafelhasználható React komponensek
│   │   ├── CalendarGrid.js
│   │   ├── TaskCard.js
│   │   └── UserProfile.js
│   ├── lib/                # Segédfüggvények, utility-k (pl. API hívások, dátumkezelés)
│   └── styles/             # Egyedi CSS modulok (ha vannak)
├── .env.local              # Környezeti változók (pl. backend API URL)
├── next.config.js          # Next.js konfiguráció
├── tailwind.config.js      # Tailwind CSS konfiguráció
├── postcss.config.js       # PostCSS konfiguráció
├── package.json            # Projekt metaadatai és függőségei
└── README.md


## API Kommunikáció
Ez a frontend alkalmazás egy különálló backend API-val fog kommunikálni az adatok (naptári események, teendők, felhasználói adatok) lekérdezéséhez és módosításához.

Az API végpont URL-je a .env.local fájlban konfigurálható:

NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api


## Fejlesztési Tippek
Tailwind CSS: Használd a Tailwind CSS osztályait közvetlenül a JSX-ben a gyors UI építéshez. Ha egyedi stílusra van szükséged, egészítsd ki a tailwind.config.js fájlt.
Komponensek: Bontsd fel a UI-t kisebb, újrafelhasználható React komponensekre a jobb modularitás érdekében.
Állapotkezelés: Egyszerűbb esetekben használj React useState és useContext hookokat. Komplexebb állapotokhoz fontolóra vehetsz egy globális állapotkezelő könyvtárat (pl. Zustand, React Query, Redux Toolkit).
API Hívások: Használj aszinkron függvényeket (pl. fetch vagy axios) az API hívásokhoz.
Hibaüzenetek (image_8a6526.png): Ha handleGoToToday is not defined típusú hibát látsz, az azt jelenti, hogy a BasePage.js fájlban hiányzik a handleGoToToday függvény definíciója, vagy nem megfelelően van átadva a komponensek között. Ellenőrizd, hogy a függvény a komponens scope-jában létezik-e, és ha szükséges, add hozzá vagy passzold props-ként.