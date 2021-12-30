export default ({ app: { $cookies }, redirect }) => {
  if ($cookies.get("authenticationToken")) return redirect("/employees");
  else return;
};
