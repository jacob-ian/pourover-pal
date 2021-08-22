import "./Header.sass";
import logo from "../../assets/images/logo.svg";
import HeaderLogo from "./HeaderLogo";

export default function Header() {
  return (
    <header className="header">
      <HeaderLogo src={logo} />
    </header>
  );
}
