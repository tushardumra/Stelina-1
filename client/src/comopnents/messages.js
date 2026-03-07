import { useEffect, useState } from "react"

export const Messages = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    ShowMessages();
  }, []);

  const ShowMessages = async () => {
    try {
      const useApi = await fetch("https://stelina-backend.onrender.com/api/showing-messages", {
        method: "Get"
      });

      if(useApi.ok) {
        const resp = await useApi.json();
        if(resp.statuscode === 1) {
          // alert("Your Messages from customers");
          setMessage(resp.msgData);
        } else {
          alert("Error in showing Messages");
        }
      }
    } catch (error) {
      console.log(error,"in running show messages API")
    }
  }
  return (
    <>
    <div className="msg-for-admin">
    <h1>Messages from the customers</h1>
    <div className="msg-area">
      {
        message.map((msg,index) => 
        <div className="msg-card" key={index}>
        <div className="top">
          <div className="tp-lft">
            <h5>From: {msg.Name} ({msg.Country})</h5>
            <h6>Mail Id: {msg.Email}</h6>
          </div>
          <div className="tp-rgt">
            <h6>Date</h6>
            <p>15 feb 2026</p>
          </div>
        </div>
        <div className="bottom">
          <p>
            {msg.Msg}
            {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus, quisquam voluptatibus ullam aut vel mollitia officiis eius vero praesentium quaerat voluptatem dolor cum doloremque ratione, sequi voluptas cumque molestiae et. */}
          </p>
        </div>
      </div>
        )
      }
      

      {/* <div className="msg-card">
        <div className="top">
          <div className="tp-lft">
            <h5>From: Justin</h5>
            <h6>Mail Id: justin@mail.com</h6>
          </div>
          <div className="tp-rgt">
            <h6>Date</h6>
            <p>15 feb 2026</p>
          </div>
        </div>
        <div className="bottom">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus, quisquam voluptatibus ullam aut vel mollitia officiis eius vero praesentium quaerat voluptatem dolor cum doloremque ratione, sequi voluptas cumque molestiae et.
          </p>
        </div>
      </div>
      <div className="msg-card">
        <div className="top">
          <div className="tp-lft">
            <h5>From: Justin</h5>
            <h6>Mail Id: justin@mail.com</h6>
          </div>
          <div className="tp-rgt">
            <h6>Date</h6>
            <p>15 feb 2026</p>
          </div>
        </div>
        <div className="bottom">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus, quisquam voluptatibus ullam aut vel mollitia officiis eius vero praesentium quaerat voluptatem dolor cum doloremque ratione, sequi voluptas cumque molestiae et.
          </p>
        </div>
      </div>
      <div className="msg-card">
        <div className="top">
          <div className="tp-lft">
            <h5>From: Justin</h5>
            <h6>Mail Id: justin@mail.com</h6>
          </div>
          <div className="tp-rgt">
            <h6>Date</h6>
            <p>15 feb 2026</p>
          </div>
        </div>
        <div className="bottom">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus, quisquam voluptatibus ullam aut vel mollitia officiis eius vero praesentium quaerat voluptatem dolor cum doloremque ratione, sequi voluptas cumque molestiae et.
          </p>
        </div>
      </div> */}
    </div>
    </div>
    </>
  )
}