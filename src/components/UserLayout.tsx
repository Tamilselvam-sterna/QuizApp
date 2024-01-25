import React from "react";

type childprop = {
  children: React.ReactNode;
};
function UserLayout({ children }: childprop) {
  return (
    <main>
      <section>{children}</section>
    </main>
  );
}

export default UserLayout;
