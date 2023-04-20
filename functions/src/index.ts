import * as functions from "firebase-functions";
import {newPostImpl} from "./post/newPostImpl";
import {reactToPostImpl} from "./post/reactToPostImpl";
import {initializeApp} from "firebase-admin/app";

initializeApp()

export const newPost = functions.https.onCall(newPostImpl)
export const reactToPost = functions.https.onCall(reactToPostImpl)
