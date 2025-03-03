const API_URL = "http://localhost:8080";
const AUTH_URL = API_URL + "/auth";
const USER_URL = API_URL + "/user";
const ACTION_URL = API_URL + "/action";
const PROJECT_URL = API_URL + "/project";

export const AppConstants = {
  LOGIN_API_URL: AUTH_URL + "/login",
  REGISTER_API_URL: AUTH_URL + "/register",
  USER_SHOW_API_URL: USER_URL + "/show",
  USER_CHANGE_API_URL: USER_URL + "/change",
  ACTION_PROJECTS_API_URL: ACTION_URL + "/projects",
  ACTION_CREATE_PROJECT_API_URL: ACTION_URL + "/createProject",
  ACTION_JOIN_PROJECT_API_URL: ACTION_URL + "/joinProject",
  PROJECT_SHOW_API_URL: PROJECT_URL + "/show?projectId=",
  PROJECT_MEMBERS_API_URL: PROJECT_URL + "/members?projectId=",
  PROJECT_TASKS_API_URL: PROJECT_URL + "/tasks",
  PROJECT_CHANGE_PASSWORD_API_URL: PROJECT_URL + "/changePassword",
  PROJECT_CHANGE_ROLE_API_URL: PROJECT_URL + "/changeRole",
}
