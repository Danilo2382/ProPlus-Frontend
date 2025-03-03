export interface User {
  username: string,
  email: string,
  password: string,
  name: string,
  surname: string,
  birthday: Date,
  createDate: Date,
  profilePicture: string | null
}
