# WanderLust

A small Airbnb-style listings app where you can browse places to stay, open a listing for details, and add or edit your own. I built it to feel close to the classic “WanderLust” project you see in full-stack courses—clean cards, simple navigation, and a layout that works on phones and desktops.

**Live site (demo):** [https://majorproject-h73z.onrender.com/listings](https://majorproject-h73z.onrender.com/listings)

That link is the deployed version you can click through anytime. Your own copy runs locally after you follow the steps below.

---

## What you can do here

- Browse **all listings** on the home grid (image, title, price per night in ₹).
- Open a single listing for **full details**.
- **Add** a new listing, **edit** it, or **delete** it.
- Footer links for **Privacy** and **Terms**; **Sign Up** / **Login** are placeholders until real auth is added.

---

## Tech I used

- **Node.js** and **Express** for the server  
- **MongoDB** with **Mongoose** for data  
- **EJS** + **ejs-mate** for HTML templates  
- **Bootstrap** for layout and components  
- **Joi** to validate listing forms  

---

## Run it on your machine

### 1. Clone the repo

```bash
git clone https://github.com/Vaishnavich217/WanderLust.git
cd WanderLust
```

### 2. Install dependencies

```bash
npm install
```

### 3. Connect MongoDB (no secrets in Git)

This project reads the database URL from a **`.env`** file in the project root. That file is **not** pushed to GitHub—only **`.env.example`** is, as a template.

1. Copy the example file:

   ```bash
   copy .env.example .env
   ```
   On Mac/Linux: `cp .env.example .env`

2. Open **`.env`** and set your real Atlas connection string:

   ```env
   MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@your-cluster.mongodb.net/wanderlust?retryWrites=true&w=majority
   ```

   Replace the placeholders with your own MongoDB Atlas user, password, and cluster host. Keep this file private.

### 4. (Optional) Load sample listings

This wipes existing listings in that database and inserts the sample set from `init/data.js`:

```bash
npm run initdb
```

### 5. Start the app

```bash
npm start
```

Then open **http://localhost:9090** (or whatever `PORT` you set in `.env`). You’ll be redirected to `/listings`.

---

## Scripts

| Command        | What it does                          |
|----------------|----------------------------------------|
| `npm start`    | Runs the Express server (`App.js`)    |
| `npm run initdb` | Seeds the database from `init/data.js` |

---

## Deploying (e.g. Render)

On hosts like Render, set **`MONGODB_URI`** in the dashboard environment variables—same value you’d put in `.env` locally. They usually set **`PORT`** for you; the app listens on `process.env.PORT` when it’s defined.

---

## GitHub contributors

Every commit is **authored and committed** as **vaishnavi217** with the email `chvaishnavi425@gmail.com`, so GitHub should list a single contributor. Add that address under GitHub → **Settings → Emails** and keep it verified so the commits link to your profile.

```bash
node scripts/rewrite-initial-commit.js
```

Only run that when you understand it rewrites the current `HEAD` commit.

---

## Author

**vaishnavi217**

---

## License

ISC (see `package.json`).
