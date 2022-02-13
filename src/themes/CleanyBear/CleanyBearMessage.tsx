import { Message } from "../../types/Messages";

export default function WillMessage(props: { message: Message }) {
  const msg = props.message;

  // function randInteger(min: number, max: number): number {
  //   return Math.floor(Math.random() * (max - min)) + min;
  // }

  return (
    <div
      className={`wrapper ${msg.badges?.vip ? "vip" : ""} ${msg.badges?.broadcaster ? "broadcaster" : ""} ${
        msg.badges?.moderator ? "moderator" : ""
      } ${msg.badges?.vip ? "verif" : ""}`}
    >
      <section className="container">
        <div className="message">
          <div className="message-content" dangerouslySetInnerHTML={{ __html: msg.message }}></div>
          <div className="user" style={{ backgroundColor: `${msg.color}30`, color: `${msg.color}` }}>
            {msg.username}
          </div>
        </div>
      </section>
    </div>
  );
}
