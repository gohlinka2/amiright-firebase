import {CallableContext} from "firebase-functions/lib/common/providers/https";
import {firestore} from "firebase-admin";
import {Keys} from "../model/Keys";
import FieldValue = firestore.FieldValue;

// STOPSHIP doc
/* eslint-disable  require-jsdoc */
export async function newPostImpl(data: any, context: CallableContext,) {
    const uid = context.auth?.uid
    if (uid === null) throw new Error("User must be authenticated to post!")

    const text: string = data[Keys.FunctionParams.NewPost.Text] ?? null
    if (text === null || text.length > 100) {
        throw new Error("The post text must be provided and must not be longer than 100 characters!")
    }

    const ref = firestore().collection(Keys.Root.Posts).doc()
    const params = {
        [Keys.Root.Post.Text]: text,
        [Keys.Root.Post.AuthorUid]: uid,
        [Keys.Root.Post.CreatedAt]: FieldValue.serverTimestamp(),
        [Keys.Root.Post.UpdatedAt]: FieldValue.serverTimestamp(),
        [Keys.Root.Post.AgreeUids]: [],
        [Keys.Root.Post.DisagreeUids]: []
    }

    await ref.create(params)
}
