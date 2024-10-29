export interface User {
  username: string,
  email: string,
  password: string,
  name: string,
  surname: string,
  birthday: Date,
  joinDate: Date,
  profilePicture: string | null
}
