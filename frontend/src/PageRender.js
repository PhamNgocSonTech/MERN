import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "./components/NotFound";

//f
const generatePage = (pageName) => {
  const component = () => require(`./pages/${pageName}`).default;
  try {
    return React.createElement(component());
  } catch (error) {
    return <NotFound />;
  }
};
//m
export default function PageRender() {
  const { page ,id} = useParams();
  let pageName = "";
  if (id) {
    pageName = `${page}/[id]`;
  } else {
    pageName = `${page}`;
  }
  console.log(pageName); //ex: http://ipv4:3000/login/123 => login/[id]

  return generatePage(pageName);
}
