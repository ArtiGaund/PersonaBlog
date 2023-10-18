import conf from '../conf/conf'

import { Client, ID, Databases, Storage, Query} from "appwrite"

export class Service{
    // properties
    client = new Client();
    databases;
    buckets;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases =  new Databases(this.client);
        this.buckets = new Storage(this.client);
    }

    // method to create post
    async createPost({ title, slug, content, Image, userId, uploadYear, status }){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    Image,
                    uploadYear,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error ",error);
        }
    }
    async updatePost(slug, { title, content, Image, uploadYear, status }){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    Image,
                    uploadYear,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error ",error);
        }
    }
    async deletePost( slug ){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error ",error);
            return false;
        }
    }
    async getPost( slug ){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);
            return false;
        }
    }
    async getAllPost( queries = [ Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getAllPost :: error ",error);
            return false;
        }
    }
    async uploadFile(file){
        try {
            return await this.buckets.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error ",error);
            return false
        }
    }
    async deleteFile( fileId ){
        try {
            await this.buckets.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error ",error);
            return false;
        }
    }
    // for preview response if fast that's why async is not need
    getFilePreview( fileId ){
        try {
            return this.buckets.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            )
        } catch (error) {
            console.log("Appwrite service :: getFilePreview :: error ",error);
            return false;
        }
    }
}

// creating object of Service class and exporting it
const service = new Service()
export default service;