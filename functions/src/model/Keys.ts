/* eslint-disable  @typescript-eslint/no-namespace */
export namespace Keys {

    export namespace Common {
        export const Uid = "uid"
        export const CreatedAt = "createdAt"
        export const UpdatedAt = "updatedAt"
        export const PostId = "postId"
    }

    export namespace Root {
        export const Posts = "posts"

        export namespace Post {
            export const Text = "text"
            export const AuthorUid = Common.Uid
            export const CreatedAt = Common.CreatedAt
            export const UpdatedAt = Common.UpdatedAt
            export const AgreeUids = "agreeUids"
            export const DisagreeUids = "disagreeUids"
        }
    }

    export namespace FunctionParams {
        export namespace NewPost {
            export const Text = Root.Post.Text
        }
        export namespace ReactToPost {
            export const PostId = Common.PostId
            export const Agree = "agree"
        }
    }
}
