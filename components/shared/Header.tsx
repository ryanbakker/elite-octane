import Logo from "./Logo";
import NavDesktop from "./NavDesktop";

function Header() {
  return (
    <header>
      <div className="max-w-7xl lg:mx-auto px-5 py-4 md:px-10 xl:px-0 w-full flex flex-row justify-between items-center">
        <Logo />

        <NavDesktop />
      </div>
    </header>
  );
}

export default Header;
