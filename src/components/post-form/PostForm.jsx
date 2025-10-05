import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  console.log("this is post", post);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.userData);

  const submit = async data => {
    if (post) {
      console.log(post);
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          console.log("this is dbpost", dbPost);
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback(value => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="post-form">
      <div className="post-form-main">
        <Input
          label="Title :"
          placeholder="Enter post title"
          className="post-form-input"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Post slug will be generated automatically"
          className="post-form-input"
          {...register("slug", { required: true })}
          onInput={e => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="post-form-sidebar">
        <div className="post-form-sidebar-content">
          <Input
            label="Featured Image :"
            type="file"
            className="post-form-input"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="post-form-image-preview">
              <img
                src={appwriteService.getFileView(post.featuredImage)}
                alt={post.title}
                className="post-form-image"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="post-form-input"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            className={`post-form-submit-btn ${
              post ? "post-form-update" : "post-form-create"
            }`}
          >
            {post ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}
