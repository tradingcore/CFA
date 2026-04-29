import * as admin from "firebase-admin";
import * as path from "path";

function initFirebase() {
  if (admin.apps.length > 0) return admin.app();

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (serviceAccountJson) {
    const serviceAccount = JSON.parse(serviceAccountJson);
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }

  const serviceAccountPath = path.resolve(__dirname, "../../service-account.json");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const serviceAccount = require(serviceAccountPath);
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

export const app = initFirebase();
export const auth = admin.auth(app);
export const firestore = admin.firestore(app);
