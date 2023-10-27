import React, { useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
//appwrite service
// import authService from '../../backendAppwrite/auth';
import appwriteService from '../../backendAppwrite/config'
import { useNavigate } from 'react-router-dom'
// importing useDispatch for postSlice
import { useSelector, useDispatch } from 'react-redux'
// importing postSlice
import { createPost, updatePost } from '../../store/postSlice'
import { toast } from 'react-toastify';

export default function PostForm({ post }){
    const curDate = new Date();
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
            uploadYear: post?.uploadYear || curDate,
        },
    });
    // console.log("Post data ",post);
    const navigate = useNavigate()
    // user data
    const userData = useSelector(state => state.auth.userData)
    // console.log("User data ",userData)
    
    // if user have submitted the form, then it must have pass the data
    const submit = async(data) => {
        //if post is present
        if(post){
            //doing update, handling file (data provide directly access to images in react hook form)
            // console.log("Post ",post);
            // console.log("Post found");
            // console.log("data",data);
           const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
        //    console.log("File ",file);
           //deleting old image
           if(file) {
            // post.Image store file id's
            appwriteService.deleteFile(post.Image);
           }
           //updating the post
           // post.$id is slug
        //    if(file.$id)
        //         console.log("file id ", file.$id);
        //     else console.log("File id is not found");
           const dbPost = await appwriteService.updatePost(post.$id, {
            ...data,
            Image: file ? file.$id : undefined,
            
           });
        //    console.log("dbPost ",dbPost);
           if(dbPost){
            navigate(`/post/${dbPost.$id}`);
            dispatch(updatePost(dbPost));
            toast.success("Your post have been updated successfully!",{
                position: toast.POSITION.TOP_RIGHT
            })
            }
        }
        else{
            // user is creating new form
            // console.log("Post not found")
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
            if(file){
                const fileId = file.$id;
                // console.log("FileId ",fileId)
                data.Image =fileId;
                // console.log("Image ",Image)
                // sending other properties
                // spread out id done bz when forms are created we don't have user data but we have userId field in 
                // post, but we brought userData from store
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                })
                if(dbPost)
                {
                    navigate(`/post/${dbPost.$id}`)
                    //dispatch the action with newly created post data
                        dispatch(createPost(dbPost));
                    toast.success("Your new post have been uploaded successfully",{
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
            }
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
            <div className='flex lg:flex-row flex-col gap-3 bg-gray-800 rounded-xl shadow-lg bg-gradient-to-t'>
                <div className='w-2/3 px-2 text-white p-8 ml-8'>
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
                    <div className='w-1/3 px-2 text-white p-3 mr-8 mt-6'>
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
                                src={appwriteService.getFilePreview(post.Image)}
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
            </div>
           
            
        </form>
    );
};