import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
//appwrite service
import authService from '../../backendAppwrite/auth';
import appwriteService from '../../backendAppwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
                    // title,
                    // content,
                    // Image,
                    // userId,
                    // uploadYear,
                    // status,
export default function PostForm({ post }){
    const curDate = new Date();
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
            uploadYear: post?.uploadYear || curDate,
        },
    });

    const navigate = useNavigate()
    // user data
    const userData = useSelector(state => state.auth.userData)
    
    // if user have submitted the form, then it must have pass the data
    const submit = async(data) => {
        //if post is present
        if(post){
            //doing update, handling file (data provide directly access to images in react hook form)
           const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
           //deleting old image
           if(file) {
            // post.featuredImage store file id's
            appwriteService.deleteFile(post.featuredImage);
           }
           //updating the post
           // post.$id is slug
           
           const dbPost = await appwriteService.updatePost(post.$id, {
            ...data,
            Image: file ? file.$id : undefined,
            
           });
           if(dbPost){
            navigate(`/post/${dbPost.$id}`);
            }
        }
        else{
            // user is creating new form
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
            console.log("Before accessing $id:", file);
            if(file){
                console.log("File is not null, $id:", file.$id);
                const fileId = file.$id;
                console.log("FileId ",fileId)
                data.Image =fileId;
                console.log("Image ",Image)
                // sending other properties
                // spread out id done bz when forms are created we don't have user data but we have userId field in 
                // post, but we brought userData from store
                if(userData) console.log("User Data");
                else console.log("User Data not found")
                console.log("userId ", userData.$id);
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                })
                console.log("dbPost ", dbPost);
                if(dbPost)
                {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
            console.log("After accessing $id:", file);
        }
    };
    // important
    // slug transform (replacing space with -, watching title and generating value in slug)
    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string")
            //const slug = value.toLowerCase().replace(/ /g,'-')
            // setValue('slug',slug)
            // return slug (or) (regux to transform)
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
        return "";
    }, []);

    // using slugTransformation method
    // here memory management is done by unsubscribe() so that it wont stop in loop
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);


    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2 text-white'>
                <Input
                    label="Title: "
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug: "
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput = {(e) => {
                        setValue( "slug", slugTransform(e.currentTarget.value), { shouldValidate: true});
                    }}
                />
                <RTE label="Content: " name="content" control={control} defaultValue={getValues("content")}/>
            </div>
            <div className='w-1/3 px-2'>
                <Input
                        label="Featured Image: "
                        type="file"
                        className="mb-4"
                        accept="image/png image/jpg image/jpeg image/gif"
                        {...register("image", { required: !post })}
                />
                { post && (
                    <div className='w-full mb-4'>
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select 
                    options={[ "active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true})}    
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
};
