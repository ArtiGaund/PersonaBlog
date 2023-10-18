// we have configured all the id's of appwrite database in conf/conf.js, so import that
import conf from '../conf/conf';
// some services from appwrite
import { Client, Account, ID } from "appwrite";

export class AuthService {
    // creating properties
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account =  new Account(this.client);
    }
    // using async method because we don't want to move forward if method work is not completed
    // all method will have different fuctionality
    // todo: creating account using google, facebook (OAuth 2 login)
    async createAccount({ email, password, name })
    {
        // using try catch if method fails it will show the error
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                return this.login({ email, password });
            }
            else return userAccount;
        } catch (error) {
            console.log("Appwrite authentication error :: createAccount ",error);
        }
    }
    async login({ email, password })
    {
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            console.log("Appwrite authentication error :: login ",error);
        }
    }
    // to check whether we are login or not to add post in Add post page
    async getCurrentUser()
    {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite authentication error :: getCurrentUser ",error);
        }
    }
    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite authentication error :: logout ",error);
        }
    }
    // function of forget password to be done
}
// creating object of AuthService class and exporting it, so that methods of this class can be export easily
// bz we are exporting object not class
const authService = new AuthService();
export default authService;