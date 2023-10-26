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
               const session = await this.login({ email, password });
               if(session){
                const sendingVerificationLink = await this.emailVerification()
                if(sendingVerificationLink){
                    return session
                }
            }
            }
            else return false;
        } catch (error) {
            console.log("Appwrite authentication error :: createAccount ",error);
        }
    }
    async login({ email, password })
    {
        try {
            const session = await this.account.createEmailSession(email,password);
            return session;
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
    async emailVerification(){
        const url = "http://localhost:5173/all-posts"
        return await this.account.createVerification(url).then((response) => {
            console.log("Verification link has been sended to your email, please verify your account ",response);
        })
        .catch((error) => {
            console.log("Verification link has not been sended ",error);
        })
    }
    async confirmEmailVerification({ userId, secret }){
        return await this.account.updateVerification( userId, secret ).then((response) => {
            console.log("Account verified successfully");
        })
        .catch((error) => {
            console.log("Error occurred during email verification: ", error)
        })
    }
    // async gitHub(){
    //     return await this.account.createOAuth2Session( 'github', 'http://localhost:5173/profile', 'http://localhost:5173/signup')
    //     .then((response) => {
    //         console.log("Signup using github ",response)
    //     })
    //     .catch((error) => {
    //         console.log("Signup using Github failed ",error);
    //     })
    // }
    async createPasswordRecovery({ email }){
        return await this.account.createRecovery(email, 'http://localhost:5173/recovery')
        .then((response) => {
            console.log("Recovery link has been sended to your mail check it, ",response)
        })
        .catch((error) => {
            console.log("Error in sending link ",error)
        })
    }
    async confirmPasswordRecovery({ userId, secret, new_password, confirm_password }){
        console.log("User id ",userId)
        console.log("secret ",secret)
        console.log("password ",new_password)
        console.log("confirm password ",confirm_password);
        return await this.account.updateRecovery( userId, secret, new_password, confirm_password)
        .then((response) => {
            console.log("Password has been updated successfully. Try login again");
        })
        .catch((error) => {
            console.log("Error in password confirmation ",error);
        })
    }
}
// creating object of AuthService class and exporting it, so that methods of this class can be export easily
// bz we are exporting object not class
const authService = new AuthService();
export default authService;