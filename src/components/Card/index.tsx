import "./Card.sass";

export default function Card(props: any) {
  return <main className="card">{props.children}</main>;
}
