import admin from "firebase-admin";

if (!admin.apps.length) {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (!json) {
    throw new Error("Firebase service account missing");
  }

  const serviceAccount = JSON.parse(json);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export default admin;
