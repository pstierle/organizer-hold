import { IUniversity } from "../IUniversity";

export default interface IUser extends Object {
  name: string;
  studentId: number;
  email: string;
  univerityId: number;
  university?: IUniversity;
}
