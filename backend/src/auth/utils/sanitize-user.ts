import { UserDocument } from '../../user/schemas/user.schema';

export function sanitizeUser(user: UserDocument) {
    const { password, ...rest } = user.toObject();
    return rest;
}