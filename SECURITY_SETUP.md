# Firebase Auth and Receipt Security Setup

This app now has Firebase Authentication support in the code, but secure mode is intentionally opt-in until the Firebase project has Justin and Brittany accounts and the rules are deployed.

## What to create in Firebase

1. Open Firebase Console for `xander-calendar-a9a5b`.
2. Go to Authentication.
3. Enable Email/Password sign-in.
4. Create one user for Justin and one user for Brittany.
5. Copy each user's Firebase Auth UID.

Configured UIDs:

- Justin: `AVTqawxYzSQh9xgqUL9aSRigTwk2`
- Brittany: `eBi4fVGfY7P8WvxXJXdjk6QkDV43`

## Realtime Database rules

Before deploying `database.rules.json`, add both UIDs under this Realtime Database path:

The current `database.rules.json` already includes Justin and Brittany's UIDs.

The database rules allow only authenticated UIDs listed in `/authorizedUsers` to read or write `xander_cal`.

## Storage rules

The current `storage.rules` already includes Justin and Brittany's UIDs. Receipt uploads are limited to images or PDFs under 5 MB.

## Turn secure mode on in the app

After accounts and rules are ready, open the app once and run this in the browser console:

```js
localStorage.setItem('xander_cal_require_firebase_auth', 'true');
location.reload();
```

Do this on each installed phone after confirming the accounts work.

## Deploying rules

If Firebase CLI is logged in:

```bash
firebase deploy --only database,storage
```

Do not deploy the rules until both UIDs are in place, or the app can be locked out.
