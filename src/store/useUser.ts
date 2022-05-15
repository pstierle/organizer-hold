import { ref } from "vue";
import IUser from "./interfaces/IUser";

const user = ref<IUser>();

export function useUser() {
  const login = (nameOrEmail: string, password: string) => {
    const data = window.axios.post<IUser>("/register", {
      nameOrEmail,
      password,
    });
    user.value = data;
  };

  const register = (userData: IUser) => {
    const data = window.axios.post<IUser>("/register", {
      ...userData,
    });
    user.value = data;
  };

  return {
    user,
    register,
    login,
  };
}
