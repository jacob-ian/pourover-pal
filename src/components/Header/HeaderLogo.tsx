import './HeaderLogo.sass'

interface HeaderLogoProps {
  src: string;
}

export default function HeaderLogo(props: HeaderLogoProps) {
  const { src } = props;
  return <img className="header-logo" src={src} alt="Pourover Pal" />
}