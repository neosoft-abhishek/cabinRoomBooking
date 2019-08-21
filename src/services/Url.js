const base_url = "http://10.0.28.207:3000/api/";

export const urls = {
  demoUrl: "https://jsonplaceholder.typicode.com/todos/1",
  loginUrl: base_url + "auth/login",
  forgotPassword: base_url + 'auth/forgot-password',
  resetPassword: base_url + 'auth/reset-password',
  signUp: base_url + 'auth/sign-up',
  OtpVerification : base_url + 'users/verify/'
};
