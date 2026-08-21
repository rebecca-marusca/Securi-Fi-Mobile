import firebase_admin
from firebase_admin import credentials, auth as fb_auth, firestore
from fastapi import FastAPI, Header, HTTPException, Depends
from datetime import datetime, timezone

cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

app = FastAPI()


async def get_current_uid(authorization: str = Header(...)) -> str:
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token")
    token = authorization.removeprefix("Bearer ")
    try:
        decoded = fb_auth.verify_id_token(token)
        return decoded["uid"]
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


def user_is_linked_to_home(uid: str, hid: str) -> bool:
    link = db.collection("userHomeLinks").document(f"{uid}_{hid}").get()
    return link.exists


@app.post("/homes/{hid}/arm")
async def arm_home(hid: str, uid: str = Depends(get_current_uid)):
    if not user_is_linked_to_home(uid, hid):
        raise HTTPException(status_code=403, detail="Not linked to this home")

    db.collection("homes").document(hid).update({"requestedArmed": True})
    return {"status": "requested", "requestedArmed": True}


@app.post("/homes/{hid}/disarm")
async def disarm_home(hid: str, uid: str = Depends(get_current_uid)):
    if not user_is_linked_to_home(uid, hid):
        raise HTTPException(status_code=403, detail="Not linked to this home")

    db.collection("homes").document(hid).update({"requestedArmed": False})
    return {"status": "requested", "requestedArmed": False}