import { createContext, Dispatch, SetStateAction } from "react";

interface UserContextObject {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

const UserContext = createContext<UserContextObject>({} as UserContextObject);

export default UserContext;