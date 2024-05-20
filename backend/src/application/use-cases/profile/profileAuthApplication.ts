import ErrorInApplication from "../../../utils/ErrorInApplication";
import { UserDBInterface } from "../../repositories/userDBRepository";

export const handleUserInfo = async (
    userId: string,
    dbUserRepository: ReturnType<UserDBInterface>,
) => {
    try {
        console.log("handleUserInfo runned profile usecase")
        const userData = await dbUserRepository.getUserById(userId);
        if (!userData) {
            throw new Error("User not found!");
        }
        const user = {
            _id: userData._id.toString(),
            name: userData.name,
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
            dp: userData.dp,
            coverPhoto: userData.coverPhoto,
            bio: userData.bio,
            gender: userData.gender,
            address: userData.address,
            followers: userData.followers,
            following: userData.following,
            isVerifiedAccount: userData.isVerifiedAccount,
            notifications: userData.notifications,
        };
        return user;
    } catch (err) {
        console.log("error : ", err);
        throw new ErrorInApplication("User not found!", 401);
    }
};
