interface MaterialIconProps {
  name: string;
  className?: string;
}

export default function MaterialIcon(props: MaterialIconProps) {
  return (
    <span className={"material-icons-outlined " + props.className}>
      {props.name}
    </span>
  );
}
