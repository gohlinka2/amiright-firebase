import {CallableContext} from "firebase-functions/lib/common/providers/https";
import {firestore} from "firebase-admin";
import {Keys} from "../model/Keys";
import FieldValue = firestore.FieldValue;

// STOPSHIP doc
/* eslint-disable  require-jsdoc */
export async function reactToPostImpl(data: any, context: CallableContext,) {
    const uid: string | null = context.auth?.uid ?? null
    if (uid === null) throw new Error("User must be authenticated to react!")

    const postId: string = data[Keys.FunctionParams.ReactToPost.PostId] ?? null
    if (postId === null) throw new Error("Post id was not provided!")

    const agree: boolean = data[Keys.FunctionParams.ReactToPost.Agree] ?? null
    if (agree === null) throw new Error("Agree parameter was not provided!")

    const ref = firestore().collection(Keys.Root.Posts).doc(postId)
    await firestore().runTransaction(async (t) => {
        const postDoc = await t.get(ref)
        const postDocData = postDoc.data() ?? null

        if (!postDoc.exists || postDocData === null) throw new Error("Post with id " + postId + " couldn't be loaded!")

        const author: string = postDocData[Keys.Root.Post.AuthorUid]
        if (author === uid) throw new Error("Cannot react to own post!")

        const agreeUids: string[] = postDocData[Keys.Root.Post.AgreeUids]
        const disagreeUids: string[] = postDocData[Keys.Root.Post.DisagreeUids]
        if (agreeUids.includes(uid) || disagreeUids.includes(uid)) throw new Error("Already reacted!")

        const params: any = {
            [Keys.Root.Post.UpdatedAt]: FieldValue.serverTimestamp()
        }
        const arrayKey = agree ? Keys.Root.Post.AgreeUids : Keys.Root.Post.DisagreeUids
        params[arrayKey] = FieldValue.arrayUnion(uid)

        t.set(ref, params, {merge: true})
    })
}
