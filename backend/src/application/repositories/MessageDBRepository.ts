import { MesasgeRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/messageRepositoryDatabase"

import { MessageDataInterface} from "../../types/messageInterface"

export const messageDBRepository = (
    repository : ReturnType<MesasgeRepositoryMongoDB>
) => {

    const sendMessage = async (userId:  string) => {
        await repository.sendMessage(userId)
    }


    return  {
        sendMessage
    }

}

export type MessageDBInterface = typeof messageDBRepository