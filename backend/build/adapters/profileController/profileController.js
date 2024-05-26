"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const profileAuthApplication_1 = require("../../application/use-cases/profile/profileAuthApplication");
// import { CloudinaryService} from "../../frameworks/services/cloudinaryService";
// import { CloudinaryServiceInterface } from "../../application/services/cloudinaryServiceInterface";
const profileController = (
// cloudinaryServiceImpl: CloudinaryService,
// cloudinaryServiceInterface: CloudinaryServiceInterface,
userDBRepositoryImplementation, userDBRepositoryInterface, authServiceImplementation, authServiceInterface) => {
    // const cloudinaryService = cloudinaryServiceInterface(cloudinaryServiceImpl());
    const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
    const authService = authServiceInterface(authServiceImplementation());
    //////////////////////////////////////////////////
    const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield (0, profileAuthApplication_1.handleUserInfo)(id, dbUserRepository);
            console.log(user);
            res.json({
                status: "success",
                message: "user info fetched",
                user,
            });
        }
        catch (err) {
            console.error("Error fetching user info:", err);
            res.status(401).json({
                status: "error",
                message: "Failed to fetch user info",
            });
        }
    });
    //////////////////////////////////////////////////
    const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const profileInfo = req.body;
            console.log("req.body; : ", profileInfo);
            const userData = yield (0, profileAuthApplication_1.handleEditProfile)(profileInfo, dbUserRepository);
            console.log(userData);
            res.json({
                status: "success",
                message: "user edited successfully",
                userData,
            });
        }
        catch (err) {
            console.error("Error editing user:", err);
            res.status(401).json({
                status: "error",
                message: "Failed to edit user",
            });
        }
    });
    const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id, currentPassword, newPassword } = req.body;
            // Handle the password change
            const userData = yield (0, profileAuthApplication_1.handlePasswordChange)(_id, currentPassword, newPassword, dbUserRepository, authService);
            console.log(userData);
            res.json({
                status: "success",
                message: "Password changed successfully",
                userData,
            });
        }
        catch (err) {
            console.error("Error changing password:", err);
            res.status(500).json({
                status: "error",
                message: "Failed to change password",
            });
        }
    });
    const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, password } = req.params;
            console.log("req params in deleteAccount acc: ", req.params);
            const result = yield (0, profileAuthApplication_1.handleDeleteAccount)(id, password, dbUserRepository, authService);
            res.json({
                status: "success",
                message: "Account deleted successfully",
                result
            });
        }
        catch (err) {
            console.error("Error deleting account:", err);
            res.status(500).json({
                status: "error",
                message: err.message || "Failed to delete account",
            });
        }
    });
    const suspendAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, password } = req.params;
            console.log("req params in suspend acc: ", req.params);
            const result = yield (0, profileAuthApplication_1.handleSuspendAccount)(id, password, dbUserRepository, authService);
            res.json({
                status: "success",
                message: "Account suspended successfully",
                result
            });
        }
        catch (err) {
            console.error("Error suspending account:", err);
            res.status(500).json({
                status: "error",
                message: err.message || "Failed to suspend your account",
            });
        }
    });
    const privateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, password } = req.params;
            console.log("req params in private acc: ", req.params);
            const result = yield (0, profileAuthApplication_1.handlePrivateAccount)(id, password, dbUserRepository, authService);
            res.json({
                status: "success",
                message: "Account set to private account successfully",
                result
            });
        }
        catch (err) {
            console.error("Error setting to private account:", err);
            res.status(500).json({
                status: "error",
                message: err.message || "Failed to set to private account",
            });
        }
    });
    // const uploadCover = async (req: Request, res: Response) => {
    //   try {
    //     const { userId }: { userId: string } = req.body;
    //     const { path } = req.file as Express.Multer.File;
    //     const { cloudinaryResp, coverPhoto } = await handleUploadCoverPhoto(
    //       userId,
    //       path,
    //       cloudinaryService,
    //       dbUserRepository
    //     );
    //     res.json({
    //       status: 'success',
    //       message: 'Cover photo uploaded',
    //       coverPhoto,
    //       cloudinaryResp,
    //     });
    //   } catch (error: any) {
    //     console.error('Error uploading cover photo:', error);
    //     res.status(500).json({
    //       status: 'error',
    //       message: 'An error occurred while uploading the cover photo',
    //       error: error.message,
    //     });
    //   }
    // };
    // const uploaddp = async (req: Request, res: Response) => {
    //   try {
    //     const { userId }: { userId: string } = req.body;
    //     const { path } = req.file as Express.Multer.File;
    //     const { cloudinaryResp, dp } = await handleUploadDp(
    //       userId,
    //       path,
    //       cloudinaryService,
    //       dbUserRepository
    //     );
    //     res.json({
    //       status: 'success',
    //       message: 'Display picture uploaded',
    //       dp,
    //       cloudinaryResp,
    //     });
    //   } catch (error: any) {
    //     console.error('Error uploading display picture:', error);
    //     res.status(500).json({
    //       status: 'error',
    //       message: 'An error occurred while uploading the display picture',
    //       error: error.message,
    //     });
    //   }
    // };
    //////////////////////////////////////////////////
    return {
        getUserInfo,
        editProfile,
        changePassword,
        deleteAccount,
        suspendAccount,
        privateAccount,
        // uploaddp,
        // uploadCover
    };
};
exports.default = profileController;
