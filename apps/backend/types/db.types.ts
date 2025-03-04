import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type account = {
    id: string;
    userId: string;
    accountId: string;
    providerId: string;
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpiresAt: string | null;
    refreshTokenExpiresAt: string | null;
    scope: string | null;
    idToken: string | null;
    password: string;
    createdAt: Generated<string>;
    updatedAt: string;
};
export type session = {
    id: string;
    userId: string;
    token: string;
    expiresAt: string;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Generated<string>;
    updatedAt: string;
};
export type user = {
    id: string;
    name: string;
    username: string;
    displayUserName: string;
    email: string;
    emailVerified: number;
    image: string | null;
    createdAt: Generated<string>;
    updatedAt: string;
};
export type verification = {
    id: string;
    identifier: string;
    value: string;
    expiresAt: string;
    createdAt: Generated<string>;
    updatedAt: string;
};
export type DB = {
    account: account;
    session: session;
    user: user;
    verification: verification;
};
