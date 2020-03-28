import React from "react";

const profile = {
  name: "daxing.li",
  email: "daxing.li@accenture.com"
};
export default profile;
export const NameContext = React.createContext({
  name: profile.name,
  changeName: () => {}
});
export const EmailContext = React.createContext(profile.email);
