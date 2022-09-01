import React from "react";
import {useOutletContext} from "react-router-dom";

function AdminLayout(props) {
  const { isSidebarActive, searchActive, searchValue } = useOutletContext()

  const ourProps = {
    children: 'example JSX element',
    isSidebarActive, searchActive, searchValue
  }

  const newProps = Object.assign({}, ourProps);
  delete newProps.children;

  const children = React.cloneElement(props.children, newProps)

  return (
    <>
      { children }
    </>
  )
}

export default AdminLayout
